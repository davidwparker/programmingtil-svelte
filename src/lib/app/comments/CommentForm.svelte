<script>
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  import { session } from '$app/stores';
  import * as api from '$lib/shared/apis.js';
  import { aud, user } from '$lib/shared/stores.js';
  import SubmitButton from '$lib/components/buttons/Submit.svelte';

  export let comment = undefined,
    commentable,
    type,
    errors = [],
    success = '';
  let submitting = false;
  let body;

  const dispatch = createEventDispatcher();

  if (comment) {
    body = comment.attributes.body;
  }

  async function handleSubmit() {
    submitting = true;
    errors = [];
    let response, json;
    let sess = { jwt: $user.jwt, aud: $aud };
    let data = {
      comment: {
        body,
        commentable_id: commentable.id,
        commentable_type: commentable.type,
      },
    };
    if (type === 'new') {
      const ret = await api.post($session.API_ENDPOINT, `api/v1/comments/`, data, sess);
      response = ret.response;
      json = ret.json;
    } else {
      const ret = await api.put($session.API_ENDPOINT, `api/v1/comments/${comment.id}`, data, sess);
      response = ret.response;
      json = ret.json;
    }
    if (response.status === 200) {
      body = undefined;
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
  action="#"
  method="POST"
  class="mb-6"
  transition:slide
  on:submit|preventDefault={handleSubmit}
>
  <!-- These classes only if new -->
  <div class={type === 'new' ? 'shadow sm:rounded-md sm:overflow-hidden' : ''}>
    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700"> Comment Body </label>
        <div class="mt-1">
          <textarea
            id="content"
            name="content"
            rows="3"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Write something magnificent"
            bind:value={body}
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
