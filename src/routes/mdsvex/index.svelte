<script context="module">
  export async function load({ fetch }) {
    const res = await fetch(`/mdsvex/posts.json`);
    const { posts } = await res.json();
    return {
      props: { posts },
    };
  }
</script>

<script>
  export let posts;
</script>

<svelte:head>
  <title>Posts | ProgrammingTIL</title>
</svelte:head>

<div class="max-w-xl mx-auto py-6">
  <h1>Posts</h1>
  <ul class="flex flex-col space-y-3 mt-8 mb-4 text-lg">
    {#each posts as post}
      <li>
        <a href="/mdsvex/{post.slug}">
          {post.title}
        </a>
      </li>
    {/each}
  </ul>
</div>
