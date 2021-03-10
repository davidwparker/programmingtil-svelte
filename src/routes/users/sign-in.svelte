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
  import { user } from 'shared/stores';

  export let confirmed = false, message = '';
  const { page, session } = stores();
  let email, password;
  let submitting, success, errors = [];

  if ($session.NODE_ENV === 'development') {
    email = 'test@test.com';
    password = 'testtest';
  }

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

  async function handleSubmit() {
    submitting = true;
    errors = [];
    const { response, json } = await api.post(
      'http://localhost:3000',
      'users/sign_in',
      { user: { email, password } }
    );
    if (response.status === 200) {
      success = 'Signed in!';
      email = undefined;
      password = undefined;
      console.log(json);
      user.set(json);
    }
    else if (response.status === 401) {
      success = undefined;
      if (json.error) {
        errors = [...errors, json.error];
      }
      else {
        errors = [...errors, "You can't do that, Dave."];
      }
    }
    else if (response.status === 500) {
      errors = ['Oops, something went wrong! How embarrassing, try again soon.'];
    }
    submitting = false;
  }
</script>

<svelte:head>
  <title>ProgrammingTIL Svelte and Sapper</title>
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
    class="max-w-md w-full"
    method="POST"
    on:submit|preventDefault={handleSubmit}
  >
    <div>
      <div class="-mt-px">
        <input
          aria-label="Email address"
          name="user[email]"
          type="email"
          class="block w-full rounded-t-md
            focus:ring-primary-300 focus:border-primary-300 focus:outline-none focus:z-10
          "
          required
          placeholder="Email address"
          bind:value={email}
        />
      </div>
      <div class="-mt-px">
        <input
          aria-label="Password"
          name="user[password]"
          type="password"
          class="block w-full rounded-b-md
            focus:ring-primary-300 focus:border-primary-300 focus:outline-none focus:z-10"
          required
          placeholder="Password (6 characters minimum)"
          bind:value={password}
        />
      </div>
    </div>

    <div class="mt-4">
      <button
        type="submit"
        class="px-4 py-2 border border-transparent
          focus:ring-primary focus:outline-none leading-5 font-medium rounded-md disabled:opacity-75
          text-white bg-primary-400 active:bg-primary-700 hover:bg-primary-500 focus:bg-primary-500 "
        disabled={submitting}
      >
        {#if submitting}
          Submitting
        {:else}
          Submit
        {/if}
      </button>
    </div>
  </form>
</div>
