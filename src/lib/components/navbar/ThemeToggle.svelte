<script>
  import { theme } from '$lib/shared/stores';
  import { toggleTheme } from '$lib/shared/theme';
  import { UiMoonSolid, UiSunOutline } from '$lib/components/icons';

  const klass =
    'px-3 py-2 rounded-md leading-5 font-medium \
    focus:outline-none focus:text-white focus:bg-primary-300 \
    text-neutral-800 hover:text-white hover:bg-primary-300 \
    dark:text-white dark:hover:bg-primary-700 dark:focus:bg-primary-700 \
    dark:bg-black';
</script>

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
