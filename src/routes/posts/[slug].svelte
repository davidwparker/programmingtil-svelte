<script context="module">
  import * as api from "$lib/shared/apis";

  export async function load({ page, session }) {
    const url = `api/v1/posts/${page.params.slug}`;
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
  import { session } from "$app/stores";
  import { onMount } from "svelte";

  export let post;

  let comments = [];

  onMount(async () => {
    const url = `api/v1/comments?commentable_type=Post&commentable_id=${post.id}`;
    const { response, json } = await api.get($session.API_ENDPOINT, url);
    if (response.status === 200) {
      comments = json.data;
    }
  });
</script>

<svelte:head>
  <title>ProgrammingTIL Svelte and SvelteKit</title>
</svelte:head>

<div class="max-w-sm mx-auto py-6">
  <div>
    Post ID: {post.id}
  </div>
  <div>
    Title: {post.attributes.title}
  </div>
  <div>
    Posted by: <a href="/users/{post.attributes.user.slug}"
      >{post.attributes.user.displayName}</a
    >
  </div>
  {#each comments as comment}
    <div>
      {comment.attributes.body}
    </div>
    <div>
      commented by
      <a href="/users/{comment.attributes.user.slug}">
        {comment.attributes.user.displayName}
      </a>
    </div>
    <div>
      {comment.attributes.updatedAt}
    </div>
  {/each}
</div>
