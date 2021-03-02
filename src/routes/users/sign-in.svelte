<script context='module'>
  import * as api from 'shared/apis';

  export async function preload(page, _session) {
    if (page.query.confirmation_token) {
      const url = `users/confirmation?confirmation_token=${page.query.confirmation_token}`;
      const { response, json } = await api.get('http://localhost:3000', url);
      return { confirmed: (response.status === 200), message: json };
    }
  }
</script>

<script>
  import { stores } from '@sapper/app';

  export let confirmed = false, message = '';
  const { page } = stores();
  let success, errors = [];

  if ($page.query.confirmation_token) {
    if (confirmed) {
      success = 'Your email address has been confirmed!';
    }
    else {
      if (message !== '' && message.email && message.email.length >= 0) {
        errors = [`Email ${message.email[0]}`]
      }
      else {
        errors = ['Token is invalid.'];
      }
    }
  }
</script>

<svelte:head>
  <title>ProgrammingTIL Svelte and Sapper</title>
</svelte:head>

<nav>
  <div class="max-w-7xl mx-auto px-2 sm:px-8 h-16 flex items-center">
    <div class="">
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
    </div>
  </div>
</nav>

<div>
  {#if success}
    {success}
  {/if}
  {#if errors.length > 0}
    {errors[0]}
  {/if}
</div>
