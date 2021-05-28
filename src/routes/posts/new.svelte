<script>
  import AlertErrors from '$lib/components/alerts/Errors.svelte';
  import AlertSuccess from '$lib/components/alerts/Success.svelte';
  import PostForm from '$lib/app/posts/PostForm.svelte';

  let errors = [],
    success;
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
  <div class="bg-white py-5 px-4 shadow sm:rounded-md sm:overflow-hidden">
    <PostForm
      type="new"
      bind:errors
      bind:success
    />
  </div>
</div>
