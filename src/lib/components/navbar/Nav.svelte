<script>
  import { goto } from "$app/navigation";
  import { session } from "$app/stores";
  import { onMount } from "svelte";
  import * as api from "$lib/shared/apis";
  import { user } from "$lib/shared/stores";

  const klasses =
    "px-3 py-2 rounded-md leading-5 font-medium \
    focus:outline-none focus:text-white focus:bg-primary-300 \
    text-neutral-800 hover:text-white hover:bg-primary-300";

  let loading = true;
  onMount(() => {
    user.useLocalStorage();
    loading = false;
  });

  async function handleSignOut() {
    let sess = { jwt: $user.jwt };
    const { response, json } = await api.del(
      $session.API_ENDPOINT,
      "users/sign_out",
      {},
      sess
    );
    if (response.status === 200) {
      await goto("/");
      user.set({});
    } else if (response.status === 500) {
      errors = [
        "Oops, something went wrong! How embarrassing, try again soon.",
      ];
    } else {
      errors = [
        "Oops, something went wrong! How embarrassing, try again soon.",
      ];
    }
  }
</script>

<nav>
  <div class="max-w-7xl mx-auto px-2 sm:px-8 h-16 flex items-center">
    <div class="">
      <a href="/" class={klasses}>Home</a>
      <a href="/about" class="{klasses} ml-1">About</a>
      {#if $user.jwt && !loading}
        <a href="/users/settings/" class="{klasses} ml-1"> Settings </a>
        <a
          href="/users/sign-out/"
          class="{klasses} ml-1"
          on:click|preventDefault={handleSignOut}
        >
          Sign Out
        </a>
      {:else if !loading}
        <a href="/users/sign-in/" class="{klasses} ml-1"> Sign In </a>
        <a href="/users/sign-up/" class="{klasses} ml-1"> Register </a>
      {/if}
    </div>
  </div>
</nav>
