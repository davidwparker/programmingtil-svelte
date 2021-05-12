<script>
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';
  import { onMount } from 'svelte';
  import * as api from '$lib/shared/apis.js';
  import { jwt, loggedIn, user } from '$lib/shared/stores.js';

  const klasses =
    'px-3 py-2 rounded-md leading-5 font-medium \
    focus:outline-none focus:text-white focus:bg-primary-300 \
    text-neutral-800 hover:text-white hover:bg-primary-300';

  onMount(() => {
    user.useLocalStorage();
  });

  async function handleSignOut() {
    const { response, json } = await api.del(
      $session.BASE_ENDPOINT,
      'users/sign_out',
      { creds: true },
      { jwt: $jwt }
    );
    if (response.status === 200) {
      await goto('/');
      jwt.set('UNKNOWN');
      loggedIn.set(false);
      user.set({});
      userId.set(0);
    } else if (response.status === 500) {
      errors = ['Oops, something went wrong! How embarrassing, try again soon.'];
    } else {
      errors = ['Oops, something went wrong! How embarrassing, try again soon.'];
    }
  }
</script>

<nav>
  <div class="max-w-7xl mx-auto px-2 sm:px-8 h-16 flex items-center">
    <div class="">
      <a href="/" class={klasses}>Home</a>
      <a href="/about" class="{klasses} ml-1">About</a>
      <a href="/users/sign-in/" class="{klasses} {$loggedIn ? 'hidden' : ''} ml-1"> Sign In </a>
      <form action="/users/sign_out?_method=delete" method="post" class="inline">
        <input
          type="submit"
          value="Sign Out"
          class="{klasses} {$loggedIn ? '' : 'hidden'} ml-1 cursor-pointer"
          on:click|preventDefault={handleSignOut}
        />
      </form>
      <a href="/users/settings/" class="{klasses} {$loggedIn ? '' : 'hidden'} ml-1"> Settings </a>
      <a href="/users/sign-up/" class="{klasses} {$loggedIn ? 'hidden' : ''} ml-1"> Register </a>
    </div>
  </div>
</nav>
