<script context="module">
  export const prerender = true;

  // NOTES:
  // First attempt required an empty {} return otherwise this:
  // Docs:
  // If load returns nothing, SvelteKit will  to other routes until something responds,
  // or will respond with a generic 404.
  //
  // Second attempt made duplicate/multiple requests due to this:
  // Docs:
  // This function runs both during server-side rendering and in the client,...
  //
  // so I went with just waiting until mounted to make the API request, as it's not idempotent.
  // import * as api from "$lib/shared/apis";
  // export async function load({ page, session }) {
  //   if (page.query.get('confirmation_token')) {
  //     const url = `users/confirmation?confirmation_token=${page.query.get('confirmation_token')}`;
  //     const { response, json } = await api.get(session.API_ENDPOINT, url);
  //     return { confirmed: response.status === 200, message: json };
  //   }
  //   else {
  //     return {};
  //   }
  // }
</script>

<script>
  import { onMount } from 'svelte';
  import { dev } from '$app/env';
  import { goto } from '$app/navigation';
  import { page, session } from '$app/stores';
  import * as api from '$lib/shared/apis';
  import { aud, browser, ip, os, user } from '$lib/shared/stores';
  import SubmitButton from '$lib/components/buttons/Submit.svelte';
  import { UiLockSolid } from '$lib/components/icons';

  let confirmed = false,
    message = '';
  let login, password;
  let submitting,
    success,
    errors = [];

  if (dev) {
    login = 'test@test.com';
    password = 'testtest';
  }

  async function checkConfirmation() {
    if ($page.query.get('confirmation_token')) {
      const url = `users/confirmation?confirmation_token=${$page.query.get('confirmation_token')}`;
      const { response, json } = await api.get($session.API_ENDPOINT, url);
      confirmed = response.status === 200;
      message = json;

      if (confirmed) {
        success = 'Your email address has been confirmed!';
      } else {
        if (message !== '' && message.email && message.email.length >= 0) {
          errors = [`Email ${message.email[0]}`];
        } else {
          errors = ['Token is invalid.'];
        }
      }
    }
  }
  onMount(() => {
    checkConfirmation();
  });

  async function handleSubmit() {
    submitting = true;
    errors = [];
    try {
      const jsResponse = await fetch('https://jsonip.com/');
      const jsip = await jsResponse.json();
      ip.set(jsip.ip);
    } catch (error) {
      // Ignore if this service fails
    }
    const { response, json } = await api.post(
      $session.BASE_ENDPOINT,
      'users/sign_in',
      { login, password, browser: $browser, ip: $ip, os: $os },
      { aud: $aud }
    );
    if (response.status === 200) {
      success = 'Signed in!';
      login = undefined;
      password = undefined;
      user.set(json);
      session.set({ ...$session, userId: json.user.id, loggedIn: true });
      goto('/');
    } else if (response.status === 401) {
      success = undefined;
      if (json.error) {
        errors = [...errors, json.error];
      } else {
        errors = [...errors, "You can't do that, Dave."];
      }
    } else if (response.status === 500) {
      errors = ['Oops, something went wrong! How embarrassing, try again soon.'];
    }
    submitting = false;
  }
</script>

<svelte:head>
  <title>ProgrammingTIL Svelte and SvelteKit</title>
</svelte:head>

<div class="flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
  {#if success}
    {success}
  {/if}
  {#if errors.length > 0}
    {errors[0]}
  {/if}
</div>

<div class="flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
  <form
    action="/users/sign_in"
    class="max-w-md w-full"
    method="POST"
    on:submit|preventDefault={handleSubmit}
  >
    <div>
      <div class="-mt-px">
        <input
          aria-label="Username or Email address"
          name="login"
          type="text"
          class="block w-full rounded-t-md
            focus:ring-primary-300 focus:border-primary-300 focus:outline-none focus:z-10
            dark:bg-gray-700 dark:placeholder-gray-200 dark:text-white"
          required
          placeholder="Username or Email address"
          bind:value={login}
        />
      </div>
      <div class="-mt-px">
        <input
          aria-label="Password"
          name="password"
          type="password"
          class="block w-full rounded-b-md
            focus:ring-primary-300 focus:border-primary-300 focus:outline-none focus:z-10
            dark:bg-gray-700 dark:placeholder-gray-200 dark:text-white"
          required
          placeholder="Password (6 characters minimum)"
          bind:value={password}
        />
      </div>
    </div>

    <div class="mt-4">
      <SubmitButton {submitting} full icon={UiLockSolid}>Sign In</SubmitButton>
    </div>
  </form>
</div>
