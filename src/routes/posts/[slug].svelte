<script context="module">
  import * as api from '$lib/shared/apis';

  export async function load({ page, session }) {
    const all = page.query.get('comments') === 'true';
    const url = `api/v1/posts/${page.params.slug}${all ? '?all=true' : ''}`;
    const { response, json } = await api.get(session.API_ENDPOINT, url);
    if (response.status === 200) {
      return {
        props: {
          post: json.data,
        },
      };
    }
  }
</script>

<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import AlertErrors from '$lib/components/alerts/Errors.svelte';
  import AlertSuccess from '$lib/components/alerts/Success.svelte';
  import CommentCard from '$lib/app/comments/CommentCard.svelte';
  import CommentForm from '$lib/app/comments/CommentForm.svelte';
  import PostCard from '$lib/app/posts/PostCard.svelte';
  import PostForm from '$lib/app/posts/PostForm.svelte';

  export let post;

  let commentable = { id: post.id, type: 'Post' };
  let errors = [],
    success,
    showForm = false;

  function handleDestroyPost() {
    setTimeout(() => {
      goto('/');
    }, 1000);
  }

  // TODO: This to come later
  function handleDestroy(event) {
    const comment = event.detail;
    post.attributes.comments.data = post.attributes.comments.data.reduce((accum, c) => {
      if (c.id !== comment.id) {
        accum.push(c);
      }
      return accum;
    }, []);
  }

  function handleSave(event) {
    const data = event.detail;
    post.attributes.comments.data = [data, ...post.attributes.comments.data];
    post.attributes.commentsCount += 1;
    showForm = !showForm;
  }
</script>

<svelte:head>
  <title>ProgrammingTIL Svelte and SvelteKit</title>
</svelte:head>

<div class="max-w-sm mx-auto py-6">
  {#if success || errors.length > 0}
    <div class="mb-3">
      <AlertSuccess {success} />
      <AlertErrors {errors} />
    </div>
  {/if}
  <div
    class="bg-white py-5 px-4 shadow sm:rounded-md sm:overflow-hidden
    dark:bg-gray-800 dark:border dark:border-gray-200"
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
      <PostCard bind:post bind:errors bind:success on:destroy={handleDestroyPost} />
    {/if}
  </div>
  <div class="mt-6">
    <input
      type="button"
      class="px-3 py-2 rounded-md leading-5 font-medium mb-6 cursor-pointer
        focus:outline-none focus:text-white focus:bg-primary-300
      text-neutral-800 hover:text-white hover:bg-primary-300
      dark:bg-black dark:text-white dark:hover:bg-primary-700 dark:focus:bg-primary-700"
      value="New Comment"
      on:click={() => {
        showForm = !showForm;
      }}
    />
    {#if showForm}
      <CommentForm
        type="new"
        bind:commentable
        bind:errors
        bind:success
        on:saved={handleSave}
        on:cancel={() => (showForm = !showForm)}
      />
    {/if}
  </div>
  <ul
    class="divide-y divide-gray-200 shadow sm:rounded-md sm:overflow-hidden mb-3
      {post.attributes.comments.data.length > 0 ? 'dark:border dark:border-gray-200' : ''}"
  >
    {#each post.attributes.comments.data as comment}
      <li
        class="relative py-5 px-4
        bg-white
          focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600
          dark:bg-gray-800
        "
      >
        {#if comment.edit}
          <CommentForm
            type="update"
            bind:comment
            bind:errors
            bind:success
            on:saved={() => (comment.edit = !comment.edit)}
            on:cancel={() => (comment.edit = !comment.edit)}
          />
        {:else}
          <CommentCard bind:comment />
        {/if}
      </li>
    {/each}
  </ul>
  {#if post.attributes.comments.data.length >= 5 && $page.query.get('comments') !== 'true'}
    <div>
      <!-- TODO: once backend API has pagination, then use that with on:click|preventDefault -->
      <a href="{$page.path}?comments=true" class="hover:underline dark:text-white"> View More </a>
    </div>
  {/if}
</div>
