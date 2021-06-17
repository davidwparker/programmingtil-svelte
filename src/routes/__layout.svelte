<script context="module">
  import { user } from '$lib/shared/stores';

  export async function load({ session }) {
    user.set({ user: session.user });
    return {};
  }
</script>

<script>
  import { session } from '$app/stores';
  import { onMount } from 'svelte';
  import { audBuilder, browserDetector } from '$lib/shared/helpers';
  import { aud, browser, js, os } from '$lib/shared/stores';
  import Nav from '$lib/components/navbar/Nav.svelte';
  import '../tailwind.css';

  let dark = true;

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

<div class:dark>
  <main
    class="bg-primary-100 dark:bg-black dark:text-white min-h-screen {$js ? 'js' : 'no-js'}"
    class:logged-in={$session.loggedIn}
  >
    <Nav bind:dark />
    <slot />
  </main>
</div>
