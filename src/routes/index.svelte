<script context="module">
  import * as api from '$lib/shared/apis.js';

  export async function load({ session }) {
    const url = "api/v1/posts";
    const { response, json } = await api.get(session.API_ENDPOINT, url);
    if (response.status === 200) {
      return {
        props: {
          posts: json.data,
        },
      };
    } else {
      return { props: { posts: [] } };
    }
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { user } from '$lib/shared/stores.js';
  import AlertErrors from '$lib/components/alerts/Errors.svelte';
  import AlertSuccess from '$lib/components/alerts/Success.svelte';
  import PostCard from '$lib/app/posts/PostCard.svelte';
  import PostForm from '$lib/app/posts/PostForm.svelte';

  export let posts;
  let showForm = false;
  let loading = true;
  let errors = [],
    success;

  onMount(() => {
    if ($user.user) {
      loading = false;
    }
  });

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
  <!-- {#if $user.user && !loading} -->
    {#if success || errors.length > 0}
      <div class="mb-3">
        <AlertSuccess {success} />
        <AlertErrors {errors} />
      </div>
    {/if}
    <input
      type="button"
      class="px-3 py-2 rounded-md leading-5 font-medium mb-6 cursor-pointer
        focus:outline-none focus:text-white focus:bg-primary-300
      text-neutral-800 hover:text-white hover:bg-primary-300"
      value="New Post"
      on:click={() => {
        showForm = !showForm;
      }}
    />
    <!-- {#if showForm} -->
      <PostForm
        type="new"
        bind:errors
        bind:success
        on:saved={handleSave}
        on:cancel={() => (showForm = !showForm)}
      />
    <!-- {/if} -->
  <!-- {/if} -->
  <ul class="divide-y divide-gray-200 shadow sm:rounded-md sm:overflow-hidden">
    {#each posts as post}
      <li
        class="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
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
