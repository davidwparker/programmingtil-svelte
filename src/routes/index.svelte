<script context="module">
  import * as api from "$lib/shared/apis";

  export async function load({ session }) {
    const url = `api/v1/posts`;
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
  // import DOMPurify from 'isomorphic-dompurify';
  import snarkdown from "snarkdown";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { session } from "$app/stores";
  import { aud, user } from "$lib/shared/stores";
  import AlertErrors from "$lib/components/alerts/Errors.svelte";
  import AlertSuccess from "$lib/components/alerts/Success.svelte";
  import SubmitButton from "$lib/components/buttons/Submit.svelte";

  export let posts;
  const klasses =
    "px-3 py-2 rounded-md leading-5 font-medium \
    focus:outline-none focus:text-white focus:bg-primary-300 \
    text-neutral-800 hover:text-white hover:bg-primary-300";
  let showForm = false;
  let loading = true;
  let errors = [],
    submitting,
    success;
  let title, content, published_at;

  onMount(() => {
    if ($user.user) {
      loading = false;
    }
  });

  async function handleUpdate(post) {
    submitting = true;
    errors = [];
    const { response, json } = await api.put(
      $session.API_ENDPOINT,
      `api/v1/posts/${post.id}`,
      {
        post: {
          title: post.attributes.title,
          content: post.attributes.content,
          published_at,
        },
      },
      { jwt: $user.jwt, aud: $aud }
    );
    if (response.status === 200) {
      title = undefined;
      content = undefined;
      post.edit = false;
      success = json.meta.message;
    } else if (
      response.status === 401 ||
      response.status === 404 ||
      response.status === 406
    ) {
      errors = json.meta.message;
    } else if (response.status === 500) {
      errors = [
        "Oops, something went wrong! How embarrassing, try again soon.",
      ];
    }
    submitting = false;
  }

  async function handleDestroy(post) {
    submitting = true;
    errors = [];
    const { response, json } = await api.del(
      $session.API_ENDPOINT,
      `api/v1/posts/${post.id}`,
      {},
      { jwt: $user.jwt, aud: $aud }
    );
    if (response.status === 200) {
      posts = posts.reduce((accum, p) => {
        if (p.id !== post.id) {
          accum.push(p);
        }
        return accum;
      }, []);
      success = json.meta.message;
    } else if (
      response.status === 401 ||
      response.status === 404 ||
      response.status === 406
    ) {
      errors = json.meta.message;
    } else if (response.status === 500) {
      errors = [
        "Oops, something went wrong! How embarrassing, try again soon.",
      ];
    }
    submitting = false;
  }

  async function handleSubmit() {
    submitting = true;
    errors = [];
    const { response, json } = await api.post(
      $session.API_ENDPOINT,
      `api/v1/posts/`,
      {
        post: {
          title,
          content,
          published_at,
        },
      },
      { jwt: $user.jwt, aud: $aud }
    );
    if (response.status === 200) {
      title = undefined;
      content = undefined;
      showForm = false;
      posts = [json.data, ...posts];
      success = json.meta.message;
    } else if (
      response.status === 401 ||
      response.status === 404 ||
      response.status === 406
    ) {
      errors = json.meta.message;
    } else if (response.status === 500) {
      errors = [
        "Oops, something went wrong! How embarrassing, try again soon.",
      ];
    }
    submitting = false;
  }
</script>

<svelte:head>
  <title>ProgrammingTIL Svelte and Sapper</title>
</svelte:head>

<div class="max-w-sm mx-auto py-6">
  {#if $user && !loading}
    {#if success || errors.length > 0}
      <div class="mb-3">
        <AlertSuccess {success} />
        <AlertErrors {errors} />
      </div>
    {/if}
    <input
      type="button"
      class="{klasses} mb-6 cursor-pointer"
      value="New Post"
      on:click={() => {
        showForm = !showForm;
      }}
    />
    {#if showForm}
      <form
        action="#"
        method="POST"
        class="mb-6"
        transition:slide
        on:submit|preventDefault={handleSubmit}
      >
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <label
                  for="title"
                  class="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
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
              <label
                for="content"
                class="block text-sm font-medium text-gray-700"
              >
                Post Body
              </label>
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
              <SubmitButton {submitting}>Save</SubmitButton>
            </div>
          </div>
        </div>
      </form>
    {/if}
  {/if}
  <ul class="divide-y divide-gray-200 shadow sm:rounded-md sm:overflow-hidden">
    {#each posts as post}
      <li
        class="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
      >
        {#if post.edit}
          <form
            action="#"
            method="POST"
            class="mb-6"
            transition:slide
            on:submit|preventDefault={() => {
              handleUpdate(post);
            }}
          >
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3 sm:col-span-2">
                  <label
                    for="title"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                      placeholder="Title for your Post"
                      bind:value={post.attributes.title}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  for="content"
                  class="block text-sm font-medium text-gray-700"
                >
                  Post Body
                </label>
                <div class="mt-1">
                  <textarea
                    id="content"
                    name="content"
                    rows="3"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write something magnificent"
                    bind:value={post.attributes.content}
                  />
                </div>
                <p class="mt-2 text-sm text-gray-500">Markdown supported</p>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <SubmitButton {submitting}>Update</SubmitButton>
                <input
                  type="button"
                  value="cancel"
                  on:click={() => {
                    post.edit = false;
                  }}
                />
              </div>
            </div>
          </form>
        {:else}
          <div class="flex justify-between space-x-3">
            <div class="min-w-0 flex-1">
              <a
                href="/"
                class="block focus:outline-none"
                on:click|preventDefault={() => {
                  post.expand = !post.expand;
                }}
              >
                <p class="text-sm font-medium text-gray-900 truncate">
                  {post.attributes.title}
                </p>
              </a>
              <p class="text-sm text-gray-500 truncate">
                <a href="/users/{post.attributes.user.slug}" sveltekit:prefetch>
                  Posted by {post.attributes.user.displayName}
                </a>
                {#if $user?.user?.id === post.attributes.user.id}
                  <input
                    type="button"
                    value="edit"
                    on:click={() => {
                      post.edit = !post.edit;
                    }}
                  />
                  <input
                    type="button"
                    value="delete"
                    on:click={handleDestroy(post)}
                  />
                {/if}
              </p>
            </div>
            <time
              datetime={post.attributes.publishedAt}
              class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
            >
              {post.attributes.publishedAt}
            </time>
          </div>
          <div class="mt-1">
            <p
              class="{post.expand
                ? ''
                : 'line-clamp-2'} text-sm text-gray-600 overflow-x-hidden markdown"
            >
              {#if post.expand}
                <!-- {@html DOMPurify.sanitize(snarkdown(post.attributes.content))} -->
                {@html snarkdown(post.attributes.content)}
              {:else}
                <!-- {@html DOMPurify.sanitize(snarkdown(post.attributes.content.substring(0, 80)))} -->
                {@html snarkdown(post.attributes.content.substring(0, 80))}
              {/if}
            </p>
          </div>
        {/if}
      </li>
    {/each}
  </ul>
</div>
