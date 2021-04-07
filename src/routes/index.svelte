<script context="module">
  import * as api from "$lib/shared/apis";

  export async function load({ session }) {
    const url = `api/v1/posts`;
    const { response, json } = await api.get(session.API_ENDPOINT, url);
    if (response.status === 200) {
      return {
        props: {
          posts: json.data
        }
      };
    }
    else {
      return { props: { posts: [] }};
    }
  }
</script>

<script>
  import snarkdown from 'snarkdown';

  export let posts;
</script>

<svelte:head>
  <title>ProgrammingTIL Svelte and SvelteKit</title>
</svelte:head>

<div class="max-w-sm mx-auto py-6">
  <ul class="divide-y divide-gray-200">
    {#each posts as post}
      <li class="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
        <div class="flex justify-between space-x-3">
          <div class="min-w-0 flex-1">
            <a href="/" class="block focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true" on:click={() => { post.expand = !post.expand }}></span>
              <p class="text-sm font-medium text-gray-900 truncate">User {post.user_id}</p>
              <p class="text-sm text-gray-500 truncate">
                {post.title}
              </p>
            </a>
          </div>
          <time datetime="{post.published_at}" class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
            {post.published_at}
          </time>
        </div>
        <div class="mt-1">
          <p class="{post.expand ? '' : 'line-clamp-2'} text-sm text-gray-600 overflow-x-hidden markdown">
            {#if post.expand}
              {@html snarkdown(post.content)}
            {:else}
              {@html snarkdown(post.content.substring(0,80))}
            {/if}
          </p>
        </div>
      </li>
    {/each}
  </ul>
</div>
