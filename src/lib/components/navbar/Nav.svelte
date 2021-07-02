<script>
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';
  import { onMount } from 'svelte';
  import AnimatePresence from 'svelte-motion/src/components/AnimatePresence/AnimatePresence.svelte';
  import AnimateSharedLayout from 'svelte-motion/src/components/AnimateSharedLayout/AnimateSharedLayout.svelte';
  import MotionConfig from 'svelte-motion/src/components/MotionConfig/MotionConfig.svelte';

  import * as api from '$lib/shared/apis';
  import { jwt, tour, user } from '$lib/shared/stores';
  import ThemeToggle from './ThemeToggle.svelte';
  import TourStep from './TourStep.svelte';

  const klass =
    'px-3 py-2 rounded-md leading-5 font-medium \
    focus:outline-none focus:text-white focus:bg-primary-300 \
    text-neutral-800 hover:text-white hover:bg-primary-300 \
    dark:text-white dark:hover:bg-primary-700 dark:focus:bg-primary-700 \
    dark:bg-black';

  onMount(() => {
    user.useLocalStorage();
    tour.useLocalStorage();
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

  function handleTour(step) {
    tour.set({ ...$tour, step });
  }

  function handleDismissTour() {
    tour.set({ display: false, step: 1 });
  }
</script>

<nav>
  <div class="max-w-7xl mx-auto px-2 sm:px-8 h-16 flex items-center">
    <MotionConfig>
      <AnimateSharedLayout>
        <AnimatePresence show={true} let:item>
          <div class="flex-1">
            <div class="inline relative">
              <a href="/" class={klass}> Home </a>
              <TourStep step={1} left="-left-2">
                Tour! This is the home button.<br />
                <a
                  href="/"
                  on:click|preventDefault={() => {
                    handleTour(2);
                  }}>Next&rarr;</a
                >
              </TourStep>
            </div>
            <a href="/about" class="{klass} ml-1">About</a>
            <a href="/users/sign-in/" class="{klass} ml-1" class:hidden={$session.loggedIn}>
              Sign In
            </a>
            <a href="/users/sign-up/" class="{klass} ml-1" class:hidden={$session.loggedIn}>
              Register
            </a>
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
          <div class="flex-0 relative">
            <ThemeToggle />
            <TourStep step={2} left="-left-28">
              Tour bit number 2.<br />
              Dark mode button.<br />
              <a
                href="/"
                on:click|preventDefault={() => {
                  handleTour(1);
                }}>&larr;Back</a
              >
              |
              <a href="/" on:click|preventDefault={handleDismissTour}>End Tour</a>
            </TourStep>
          </div>
        </AnimatePresence>
      </AnimateSharedLayout>
    </MotionConfig>
  </div>
</nav>
