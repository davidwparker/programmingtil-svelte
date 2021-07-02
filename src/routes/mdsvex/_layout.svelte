<script>
  export let title;
</script>

<svelte:head>
  <title>{title} | ProgrammingTIL</title>
</svelte:head>

<div class="max-w-xl mx-auto py-6">
  <div>
    <a href="/mdsvex">Back to Posts</a>
  </div>
  <h1>
    MDSVEX layout
  </h1>
  <slot />
</div>
