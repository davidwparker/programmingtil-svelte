<script>
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';
  import { onMount } from 'svelte';
  import * as api from '$lib/shared/apis';
  import { jwt, theme, user } from '$lib/shared/stores';
  import { toggleTheme } from '$lib/shared/theme';
  import { UiMoonSolid, UiSunOutline } from '$lib/components/icons';

  const klass =
    'px-3 py-2 rounded-md leading-5 font-medium \
    focus:outline-none focus:text-white focus:bg-primary-300 \
    text-neutral-800 hover:text-white hover:bg-primary-300 \
    dark:text-white dark:hover:bg-primary-700 dark:focus:bg-primary-700 \
    dark:bg-black';

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
      user.set({});
      session.set({ ...$session, userId: 0, loggedIn: false });
    } else if (response.status === 500) {
      // errors = ['Oops, something went wrong! How embarrassing, try again soon.'];
    } else {
      // errors = ['Oops, something went wrong! How embarrassing, try again soon.'];
    }
  }
</script>

<nav>
  <div class="max-w-7xl mx-auto px-2 sm:px-8 h-16 flex items-center">
    <div class="flex-1">
      <a href="/" class={klass}>Home</a>
      <a href="/about" class="{klass} ml-1">About</a>
      <a href="/users/sign-in/" class="{klass} ml-1" class:hidden={$session.loggedIn}> Sign In </a>
      <a href="/users/sign-up/" class="{klass} ml-1" class:hidden={$session.loggedIn}> Register </a>
      <a href="/users/settings/" class="{klass} ml-1" class:hidden={!$session.loggedIn}>
        Settings
      </a>
      <form action="/users/sign_out?_method=delete" method="post" class="inline">
        <input
          type="submit"
          value="Sign Out"
          class="{klass} ml-1 cursor-pointer"
          class:hidden={!$session.loggedIn}
          on:click|preventDefault={handleSignOut}
        />
      </form>
    </div>
    <div class="flex-0">
      <a
        href="/app/theme"
        class="block {klass}"
        aria-label="Toggle Light and Dark mode"
        on:click|preventDefault={() => {
          toggleTheme(theme, $theme);
        }}
      >
        <div class="hidden dark:block">
          <UiSunOutline />
        </div>
        <div class="dark:hidden">
          <UiMoonSolid />
        </div>
      </a>
    </div>
  </div>
</nav>
