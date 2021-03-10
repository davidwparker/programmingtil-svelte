<script>
  import { user } from 'shared/stores';
</script>

<nav>
  <div class="max-w-7xl mx-auto px-2 sm:px-8 h-16 flex items-center">
    <div class="">
      {#if ($user && $user.jwt)}
        <a
        href="/TODO"
        class="px-3 py-2 rounded-md leading-5 font-medium
          focus:outline-none focus:text-white focus:bg-primary-300
          text-neutral-800 hover:text-white hover:bg-primary-300
          ml-3"
      >
        Sign Out
      </a>
      {:else}
        <a
          href="/users/sign-in/"
          class="px-3 py-2 rounded-md leading-5 font-medium
            focus:outline-none focus:text-white focus:bg-primary-300
            text-neutral-800 hover:text-white hover:bg-primary-300"
        >
          Sign In
        </a>
        <a
          href="/users/sign-up/"
          class="px-3 py-2 rounded-md leading-5 font-medium
            focus:outline-none focus:text-white focus:bg-primary-300
            text-neutral-800 hover:text-white hover:bg-primary-300
            ml-3"
        >
          Register
        </a>
      {/if}
    </div>
  </div>
</nav>
