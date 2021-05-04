<script>
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  import { session } from '$app/stores';
  import * as api from '$lib/shared/apis.js';
  import { aud } from '$lib/shared/stores.js';
  import SubmitButton from '$lib/components/buttons/Submit.svelte';

  export let post = undefined,
    type,
    errors,
    success;
  let submitting = false;
  let published_at;
  let title, content;

  const dispatch = createEventDispatcher();

  if (post) {
    title = post.attributes.title;
    content = post.attributes.content;
    published_at = post.attributes.publishedAt;
  }

  async function handleSubmit() {
    submitting = true;
    errors = [];
    let response, json;
    let sess = { aud: $aud };
    let data = {
      post: {
        title,
        content,
        published_at,
      },
    };
    if (type === 'new') {
      const ret = await api.post($session.BASE_ENDPOINT, `posts`, data, sess);
      response = ret.response;
      json = ret.json;
    } else {
      const ret = await api.put($session.BASE_ENDPOINT, `posts/${post.id}`, data, sess);
      response = ret.response;
      json = ret.json;
    }
    if (response.status === 200) {
      title = undefined;
      content = undefined;
      if (post) {
        post.attributes = json.data.attributes;
      }
      dispatch('saved', json.data);
      success = json.meta.message;
    } else if (response.status === 401 || response.status === 404 || response.status === 406) {
      errors = [json.meta.message];
    } else if (response.status === 500) {
      errors = ['Oops, something went wrong! How embarrassing, try again soon.'];
    }
    submitting = false;
  }
</script>

<form
  action="/posts"
  method="POST"
  class="mb-6"
  transition:slide
  on:submit|preventDefault={handleSubmit}
>
  <!-- These classes only if new -->
  <div class={type === 'new' ? 'shadow sm:rounded-md sm:overflow-hidden' : ''}>
    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3 sm:col-span-2">
          <label for="title" class="block text-sm font-medium text-gray-700"> Title </label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              name="title"
              id="title"
              class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
              placeholder="Title for your Post"
              bind:value={title}
            />
          </div>
        </div>
      </div>

      <div>
        <label for="content" class="block text-sm font-medium text-gray-700"> Post Body </label>
        <div class="mt-1">
          <textarea
            id="content"
            name="content"
            rows="3"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Write something magnificent"
            bind:value={content}
          />
        </div>
        <p class="mt-2 text-sm text-gray-500">Markdown supported</p>
      </div>
      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <SubmitButton {submitting}>{type === 'new' ? 'Save' : 'Update'}</SubmitButton>
        <input
          type="button"
          value="cancel"
          on:click={() => {
            dispatch('cancel');
          }}
        />
      </div>
    </div>
  </div>
</form>
