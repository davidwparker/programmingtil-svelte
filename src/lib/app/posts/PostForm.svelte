<script>
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  import { session } from '$app/stores';
  import * as api from '$lib/shared/apis';
  import { aud } from '$lib/shared/stores';
  import SubmitButton from '$lib/components/buttons/Submit.svelte';

  export let post = undefined,
    shadow = false,
    type,
    errors,
    success;
  let action = post ? `/posts/${post.id}` : '/posts';
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
    let url;
    let sess = { aud: $aud };
    let data = {
      title,
      content,
      published_at,
    };
    if (type === 'new') {
      url = `posts`;
    } else {
      url = `posts/${post.id}`;
    }
    const { response, json } = await api.post($session.BASE_ENDPOINT, url, data, sess);
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

<form {action} method="POST" transition:slide on:submit|preventDefault={handleSubmit}>
  <div
    class={shadow ? 'shadow sm:rounded-md sm:overflow-hidden dark:border dark:border-gray-200' : ''}
  >
    <div class="px-4 py-5 space-y-6 sm:p-6 bg-white dark:bg-gray-800">
      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3 sm:col-span-2">
          <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Title
          </label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              name="title"
              id="title"
              class="flex-1 block w-full border-gray-300 rounded-md sm:text-sm
                focus:ring-primary-500 focus:border-primary-500
                dark:bg-gray-700 dark:placeholder-gray-200 dark:text-white"
              placeholder="Title for your Post"
              bind:value={title}
            />
          </div>
        </div>
      </div>

      <div>
        <label for="content" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Post Body
        </label>
        <div class="mt-1">
          <textarea
            id="content"
            name="content"
            rows="3"
            class="shadow-sm mt-1 block w-full border-gray-300 rounded-md sm:text-sm
              focus:ring-primary-500 focus:border-primary-500
              dark:bg-gray-700 dark:placeholder-gray-200 dark:text-white"
            placeholder="Write something magnificent"
            bind:value={content}
          />
        </div>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-300">Markdown supported</p>
      </div>
      <div class="px-4 py-3 text-right sm:px-6 bg-gray-50 dark:bg-gray-800 dark:text-black">
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
