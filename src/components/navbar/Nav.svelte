<script>
  import { stores } from "@sapper/app";
  import { onMount } from "svelte";
  import * as api from "shared/apis";
  import { user } from "shared/stores";

  const { session } = stores();

  onMount(() => {
    user.useLocalStorage();
  });

  async function handleSignOut() {
    let sess = { jwt: $user.jwt, aud: $user.aud };
    const { response, json } = await api.del(
      $session.API_ENDPOINT,
      "users/sign_out",
      {},
      sess
    );
    if (response.status === 200) {
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
      {#if $user && $user.jwt}
        <a
          href="/users/settings/"
          class="px-3 py-2 rounded-md leading-5 font-medium
            focus:outline-none focus:text-white focus:bg-primary-300
            text-neutral-800 hover:text-white hover:bg-primary-300"
        >
          Settings
        </a>
        <a
          href="/users/sign-out/"
          class="px-3 py-2 rounded-md leading-5 font-medium
            focus:outline-none focus:text-white focus:bg-primary-300
            text-neutral-800 hover:text-white hover:bg-primary-300
            ml-3"
          on:click|preventDefault={handleSignOut}
        >
          Sign Out
        </a>
      {:else}
        <a
          href="/users/sign-in/"
          class="px-3 py-2 rounded-md leading-5 font-medium
            focus:outline-none focus:text-white focus:bg-primary-300
            text-neutral-800 hover:text-white hover:bg-primary-300"
        >
          Sign In
        </a>
        <a
          href="/users/sign-up/"
          class="px-3 py-2 rounded-md leading-5 font-medium
            focus:outline-none focus:text-white focus:bg-primary-300
            text-neutral-800 hover:text-white hover:bg-primary-300
            ml-3"
        >
          Register
        </a>
      {/if}
    </div>
  </div>
</nav>
