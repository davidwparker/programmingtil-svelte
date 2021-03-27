<script>
  import { onMount } from 'svelte';
  import { audBuilder, browserDetector } from 'shared/helpers';
  import { aud, browser, os } from 'shared/stores';
  import Nav from 'cmp/navbar/Nav';

  onMount(() => {
    if (navigator && window) {
      const bd = browserDetector(navigator, window).init();
      aud.set(audBuilder(bd));
      browser.set(`${bd.browser.name}||${bd.browser.version}`);
      os.set(`${bd.os.name}||${bd.os.version}`);
    }
  });
</script>

<main class="bg-primary-100 h-screen">
  <Nav />
  <slot></slot>
</main>
