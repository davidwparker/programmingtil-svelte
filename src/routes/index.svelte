<script context="module">
  import * as api from '$lib/shared/apis';

  export async function load({ page, session }) {
    const { response, json } = await api.get(session.BASE_ENDPOINT, 'posts');
    const success = page.query.get('success') ? 'Success!' : undefined;
    const error = page.query.get('error') ? 'Error!' : undefined;
    if (response.status === 200) {
      return {
        props: {
          posts: json.data,
          success,
          error,
        },
      };
    } else {
      return { props: { posts: [], success, error } };
    }
  }
</script>

<script>
  import { session } from '$app/stores';
  import AlertErrors from '$lib/components/alerts/Errors.svelte';
  import AlertSuccess from '$lib/components/alerts/Success.svelte';
  import PostCard from '$lib/app/posts/PostCard.svelte';
  import PostForm from '$lib/app/posts/PostForm.svelte';

  export let posts,
    error = '',
    success = '';
  let showForm = false;
  let errors = [];
  if (error !== '') {
    errors.push(error);
  }

  function handleDestroy(event) {
    const post = event.detail;
    posts = posts.reduce((accum, p) => {
      if (p.id !== post.id) {
        accum.push(p);
      }
      return accum;
    }, []);
  }

  function handleSave(event) {
    const data = event.detail;
    posts = [data, ...posts];
    showForm = !showForm;
  }
</script>

<svelte:head>
  <title>ProgrammingTIL Svelte and SvelteKit</title>
</svelte:head>

<div class="max-w-sm mx-auto py-6">
  <div class={success || errors.length > 0 ? 'mb-3' : ''}>
    <AlertSuccess {success} />
    <AlertErrors {errors} />
  </div>
  <a
    href="/posts/new"
    type="button"
    class:hidden={!$session.loggedIn}
    class="px-3 py-2 rounded-md leading-5 font-medium mb-6 cursor-pointer
      focus:outline-none focus:text-white focus:bg-primary-300
    text-neutral-800 hover:text-white hover:bg-primary-300"
    on:click|preventDefault={() => {
      showForm = !showForm;
    }}>New Post</a
  >
  {#if showForm}
    <PostForm
      shadow={true}
      type="new"
      bind:errors
      bind:success
      on:saved={handleSave}
      on:cancel={() => (showForm = !showForm)}
    />
  {/if}
  <ul class="divide-y divide-gray-200 shadow sm:rounded-md sm:overflow-hidden">
    {#each posts as post}
      <li
        class="relative bg-white py-5 px-4 hover:bg-gray-50
          focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
      >
        {#if post.edit}
          <PostForm
            type="update"
            bind:post
            bind:errors
            bind:success
            on:saved={() => (post.edit = !post.edit)}
            on:cancel={() => (post.edit = !post.edit)}
          />
        {:else}
          <PostCard bind:post bind:errors bind:success on:destroy={handleDestroy} />
        {/if}
      </li>
    {/each}
  </ul>
</div>
