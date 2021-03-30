<script>
  import { onMount } from 'svelte';
  import { goto } from "$app/navigation";
  import { page, session } from "$app/stores";
  import { aud, user } from "$lib/shared/stores";
  import * as api from '$lib/shared/apis';
  import AlertErrors from '$lib/components/alerts/Errors.svelte';
  import AlertSuccess from '$lib/components/alerts/Success.svelte';
  import SubmitButton from '$lib/components/buttons/Submit.svelte';
  import { UiLockSolid } from '$lib/components/icons';

  let displayName;
  let email;
  let username;
  onMount(() => {
    displayName = $user.user.displayName;
    email = $user.user.email;
    username = $user.user.username;
  });
  let errors = [], submitting, submittingPw, success;

  const inputKlass = 'appearance-none rounded-md relative block w-full px-3 py-2 mt-1 \
    focus:ring-primary-300 focus:border-primary-300 focus:outline-none focus:z-10 \
    sm:text-sm sm:leading-5';

  if ($page.query.password) {
    if ($page.query.password === 'true') {
      success = 'Password change link sent.';
    }
    else if ($page.query.password === 'false') {
      errors = ['Error sending password reset email!'];
    }
  }

  if ($page.query.updated) {
    if ($page.query.updated === 'true') {
      success = 'Settings updated.';
    }
    else if ($page.query.updated === 'false') {
      errors = ['Error updating settings!'];
    }
  }

  async function handleSubmit() {
    submitting = true;
    errors = [];
    const { response, json } = await api.put(
      $session.API_ENDPOINT,
      `api/v1/users/${$user.user.id}`,
      {
        user: {
          username,
          display_name: displayName,
        }
      },
      { jwt: $user.jwt, aud: $aud }
    );
    if (response.status === 200) {
      success = json.message;
      $user.user = json.user;
      user.set($user);
    }
    else if (response.status === 401 || response.status === 406) {
      goto('/');
    }
    else if (response.status === 500) {
      errors = ['Oops, something went wrong! How embarrassing, try again soon.'];
    }
    submitting = false;
  }

  async function handleSubmitPassword() {
    submittingPw = true;
    errors = [];
    const { response, json } = await api.post(
      $session.API_ENDPOINT,
      'users/password',
      { user: { email } }
    );
    if (response.status === 200) {
      success = json.message;
    }
    else if (response.status === 401 || response.status === 406) {
      errors = [json.error];
    }
    else if (response.status === 500) {
      errors = ['Oops, something went wrong! How embarrassing, try again soon.'];
    }
    submittingPw = false;
  }
</script>

<div class="flex flex-col py-2 px-4 sm:px-6 lg:px-8">
  <div class="flex flex-col items-center justify-center">
    <div class="max-w-md w-full">
      <h2 class="mt-6 text-center">
        Edit Settings
      </h2>
      <AlertSuccess {success} />
      <AlertErrors {errors} />
      <form on:submit|preventDefault={handleSubmit}>
        <h3 class="mt-8">
          Personal Information
        </h3>
        <div class="mt-4">
          <div class="">
            <label for="display_name">
              Display Name:
            </label>
          </div>
          <input
            aria-label="Display Name"
            name="user[display_name]"
            id="display_name"
            type="text"
            required
            class="{inputKlass}"
            placeholder="Display Name"
            bind:value={displayName}
          />
        </div>
        <div class="mt-4">
          <div class="">
            <label for="username">
              Username:
            </label>
          </div>
          <input
            aria-label="Username"
            name="user[username]"
            id="username"
            type="text"
            required
            class="{inputKlass}"
            placeholder="Username"
            bind:value={username}
          />
        </div>
        <div class="mt-6">
          <SubmitButton {submitting} full icon={UiLockSolid}>
            Update
          </SubmitButton>
        </div>
      </form>
    </div>
    <div class="max-w-md w-full mt-6">
      <form on:submit|preventDefault={handleSubmitPassword}>
        <input type="hidden" name="user[email]" value="{email}" />
        <SubmitButton {submittingPw} full>
          Get Password Change Link
        </SubmitButton>
      </form>
    </div>
  </div>
</div>
