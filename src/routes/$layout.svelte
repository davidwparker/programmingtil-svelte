<script>
  import { onMount } from 'svelte';
  import { audBuilder, browserDetector, getCookieValue } from '$lib/shared/helpers.js';
  import { aud, browser, jwt, os } from '$lib/shared/stores.js';
  import Nav from '$lib/components/navbar/Nav.svelte';
  import '../tailwind.css';

  onMount(() => {
    if (navigator && window) {
      const bd = browserDetector(navigator, window).init();
      aud.set(audBuilder(bd));
      browser.set(`${bd.browser.name}||${bd.browser.version}`);
      os.set(`${bd.os.name}||${bd.os.version}`);
      jwt.set(getCookieValue('jwt')); // Doesn't do anything...
    }
  });
</script>

<main class="bg-primary-100 min-h-screen">
  <Nav />
  <slot />
</main>
