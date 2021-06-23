<script>
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  import { session } from '$app/stores';
  import * as api from '$lib/shared/apis';
  import { aud, user } from '$lib/shared/stores';
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
  <div
    class={type === 'new'
      ? 'shadow sm:rounded-md sm:overflow-hidden dark:border dark:border-gray-200'
      : ''}
  >
    <div class="px-4 py-5 space-y-6 sm:p-6 bg-white dark:bg-gray-800">
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Comment Body
        </label>
        <div class="mt-1">
          <textarea
            id="content"
            name="content"
            rows="3"
            class="shadow-sm mt-1 block w-full sm:text-sm border-gray-300 rounded-md
              focus:ring-primary-500 focus:border-primary-500
              dark:bg-gray-700 dark:placeholder-gray-200 dark:text-white"
            placeholder="Write something magnificent"
            bind:value={body}
          />
        </div>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-300">Markdown supported</p>
      </div>
      <div class="px-4 py-3 text-right sm:px-6 bg-gray-50 dark:bg-gray-800">
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
