<script context="module">
  import { user } from '$lib/shared/stores';

  export async function load({ session }) {
    user.set({ user: session.user });
    const localTheme = session.theme;
    return { props: { localTheme }};
  }
</script>

<script>
  import { session } from '$app/stores';
  import { onMount } from 'svelte';
  import { audBuilder, browserDetector } from '$lib/shared/helpers';
  import { aud, browser, js, os, theme } from '$lib/shared/stores';
  import Nav from '$lib/components/navbar/Nav.svelte';
  import '../tailwind.css';

  export let localTheme;

  onMount(() => {
    // We load the in the <script> tag in load, but then also here onMount to setup stores
    if (!('theme' in localStorage)) {
      theme.useLocalStorage();
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localTheme = 'dark';
        theme.set({ ...$theme, mode: 'dark' });
      } else {
        localTheme = 'light';
        theme.set({ ...$theme, mode: 'light' });
      }
    } else {
      theme.useLocalStorage();
    }
    if (navigator && window) {
      const bd = browserDetector(navigator, window).init();
      aud.set(audBuilder(bd));
      browser.set(`${bd.browser.name}||${bd.browser.version}`);
      os.set(`${bd.os.name}||${bd.os.version}`);
    }
    js.set(true);
  });
</script>

<svelte:head>
  <script>
    if (!('theme' in localStorage)) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        document.cookie = 'theme=dark;path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT;';
      } else {
        document.documentElement.classList.remove('dark');
        document.cookie = 'theme=light;path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT;';
      }
    } else {
      let data = localStorage.getItem('theme');
      if (data) {
        data = JSON.parse(data);
        document.documentElement.classList.add(data.mode);
      }
    }
  </script>
</svelte:head>

<div id="core" class="{localTheme} {$js ? 'js' : 'no-js'}">
  <main
    class="bg-primary-100 dark:bg-black dark:text-white min-h-screen {$js ? 'js' : 'no-js'}"
    class:logged-in={$session.loggedIn}
  >
    <Nav />
    <slot />
  </main>
</div>
