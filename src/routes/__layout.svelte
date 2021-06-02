<script context="module">
  import { user } from '$lib/shared/stores.js';

  export async function load({ session }) {
    user.set({ user: session.user });
    return {};
  }
</script>

<script>
  import { session } from '$app/stores';
  import { onMount } from 'svelte';
  import { audBuilder, browserDetector } from '$lib/shared/helpers.js';
  import { aud, browser, js, os } from '$lib/shared/stores.js';
  import Nav from '$lib/components/navbar/Nav.svelte';
  import '../tailwind.css';

  onMount(() => {
    if (navigator && window) {
      const bd = browserDetector(navigator, window).init();
      aud.set(audBuilder(bd));
      browser.set(`${bd.browser.name}||${bd.browser.version}`);
      os.set(`${bd.os.name}||${bd.os.version}`);
    }
    js.set(true);
  });
</script>

<main
  class="bg-primary-100 min-h-screen {$js ? 'js' : 'no-js'}"
  class:logged-in={$session.loggedIn}
>
  <Nav />
  <slot />
</main>
