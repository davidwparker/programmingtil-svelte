<script>
  import { onMount } from 'svelte';
  import { audBuilder, browserDetector } from '$lib/shared/helpers';
  import "../tailwind.css";

  import { aud, browser, os } from '$lib/shared/stores';
  import Nav from '$lib/components/navbar/Nav.svelte';

  onMount(() => {
    if (navigator && window) {
      const bd = browserDetector(navigator, window).init();
      aud.set(audBuilder(bd));
      browser.set(`${bd.browser.name}||${bd.browser.version}`);
      os.set(`${bd.os.name}||${bd.os.version}`);
    }
  });
</script>

<main class="bg-primary-100 min-h-screen">
  <Nav />
  <slot></slot>
</main>
