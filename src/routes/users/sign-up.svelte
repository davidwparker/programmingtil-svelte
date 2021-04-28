<script>
  import { session } from "$app/stores";
  import * as api from "$lib/shared/apis";
  import SubmitButton from "$lib/components/buttons/Submit.svelte";
  import {
    UiExclamationCircleSolid,
    UiGreenCheck,
    UiLockSolid
  } from '$lib/components/icons';

  let email, password, username;
  let errors = [],
    submitting,
    success;
  let okEmail, okUsername, blurEmail, blurUsername;

  async function handleBlur(which) {
    let queryString;
    if (which === 'username') {
      blurUsername = true;
      queryString = `?username=${username}`;
    }
    else if (which === 'email') {
      blurEmail = true;
      queryString = `?email=${email}`;
    }

    const { response, json } = await api.get(
      $session.API_ENDPOINT,
      `api/v1/users/available${queryString}`
    );

    if (which === 'username') {
      okUsername = (response.status === 200 && json.data);
    }
    else if (which === 'email') {
      okEmail = (response.status === 200 && json.data);
    }
  }

  async function handleSubmit() {
    submitting = true;
    errors = [];
    const { response, json } = await api.post($session.API_ENDPOINT, "users", {
      user: { email, password, username },
    });
    if (response.status === 200) {
      success = json.message;
      email = undefined;
      password = undefined;
      username = undefined;
    } else if (response.status === 401) {
      success = undefined;
      if (json.email) {
        errors = [...errors, `Email ${json.email[0]}`];
      }
      if (json.password) {
        errors = [...errors, `Password ${json.password[0]}`];
      }
      if (json.username) {
        errors = [...errors, `Username ${json.username[0]}`];
      }
    } else if (response.status === 404) {
      errors = ["Registration cannot be found, try again soon."];
    } else if (response.status === 500) {
      errors = [
        "Oops, something went wrong! How embarrassing, try again soon.",
      ];
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
      <div class="relative">
        <input
          aria-label="Username"
          name="user[username]"
          type="text"
          required
          class="block w-full rounded-t-md relative
            focus:ring-primary-300 focus:border-primary-300 focus:outline-none focus:z-10"
          placeholder="Username"
          bind:value={username}
          on:blur={() => { handleBlur('username') }}
        />
        {#if username && blurUsername}
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {#if okUsername}
              <UiGreenCheck />
            {:else}
              <UiExclamationCircleSolid />
            {/if}
          </div>
        {/if}
      </div>
      {#if username && blurUsername && !okUsername}
        <div class="m-2">
          Username is taken
        </div>
      {/if}
      <div class="-mt-px relative">
        <input
          aria-label="Email address"
          name="user[email]"
          type="email"
          class="block w-full relative
            focus:ring-primary-300 focus:border-primary-300 focus:outline-none focus:z-10
          "
          required
          placeholder="Email address"
          bind:value={email}
          on:blur={() => { handleBlur('email') }}
        />
        {#if email && blurEmail}
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {#if okEmail}
              <UiGreenCheck />
            {:else}
              <UiExclamationCircleSolid />
            {/if}
          </div>
        {/if}
      </div>
      {#if email && blurEmail && !okEmail}
        <div class="m-2">
          Email is taken
        </div>
      {/if}
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
      <SubmitButton {submitting} full icon={UiLockSolid}>
        Register
      </SubmitButton>
    </div>
  </form>
</div>
