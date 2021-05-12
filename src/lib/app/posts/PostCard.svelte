<script>
  // import DOMPurify from 'isomorphic-dompurify';
  import snarkdown from 'snarkdown';
  import { createEventDispatcher } from 'svelte';
  import { session } from '$app/stores';
  import * as api from '$lib/shared/apis.js';
  import { pluralize } from '$lib/shared/helpers.js';
  import { aud, userId } from '$lib/shared/stores.js';

  export let post,
    errors = [],
    success = '';

  const dispatch = createEventDispatcher();

  async function handleDestroy(post) {
    errors = [];
    const { response, json } = await api.del(
      $session.BASE_ENDPOINT,
      `posts/${post.id}`,
      {},
      { aud: $aud }
    );
    if (response.status === 200) {
      dispatch('destroy', post);
      success = json.meta.message;
    } else if (response.status === 401 || response.status === 404 || response.status === 406) {
      errors = [json.meta.message];
    } else if (response.status === 500) {
      errors = ['Oops, something went wrong! How embarrassing, try again soon.'];
    }
  }
</script>

<div class="flex justify-between space-x-3">
  <div class="min-w-0 flex-1">
    <a href="/posts/{post.attributes.slug}" class="block focus:outline-none" sveltekit:prefetch>
      <p class="text-sm font-medium text-gray-900 truncate">
        {post.attributes.title}
      </p>
    </a>
    <div class="text-sm text-gray-500 truncate">
      <a href="/users/{post.attributes.user.slug}" sveltekit:prefetch>
        Posted by {post.attributes.user.displayName}
      </a>
      <a
        href="/posts/{post.attributes.slug}/edit"
        class={$userId == post.attributes.user.id ? '' : 'hidden'}
        on:click|preventDefault={() => {
          post.edit = !post.edit;
        }}>edit</a
      >
      <form
        class="{$userId == post.attributes.user.id ? '' : 'hidden'} inline"
        action="/posts/{post.id}?_method=delete"
        method="post"
      >
        <input
          type="submit"
          value="delete"
          class="cursor-pointer"
          on:click|preventDefault={handleDestroy(post)}
        />
      </form>
    </div>
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
      : 'line-clamp-2'} text-sm text-gray-600 overflow-x-hidden cursor-pointer markdown"
    on:click|preventDefault={() => {
      post.expand = !post.expand;
    }}
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
<div class="mt-1 text-sm text-gray-500">
  {pluralize('comment', post.attributes.commentsCount)}
</div>
