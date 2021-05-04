<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { user } from "$lib/shared/stores.js";

  onMount(() => {
    if (!$user.user) {
      goto("/users/sign-in");
    }
  });
</script>

{#if $user.user}
  <slot />
{:else}
  <div class="max-w-xl mx-auto">Loading...</div>
{/if}
