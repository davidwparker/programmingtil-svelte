<script context="module">
  import * as api from "shared/apis";

  export async function preload(page, session) {
    if (page.query.confirmation_token) {
      const url = `users/confirmation?confirmation_token=${page.query.confirmation_token}`;
      const { response, json } = await api.get(session.API_ENDPOINT, url);
      return { confirmed: response.status === 200, message: json };
    }
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import { user } from "shared/stores";
  import SubmitButton from "cmp/buttons/Submit";
  import { UiLockSolid } from "cmp/icons";

  export let confirmed = false,
    message = "";
  const { page, session } = stores();
  let login, password;
  let submitting,
    success,
    errors = [];

  if ($session.NODE_ENV === "development") {
    login = "test@test.com";
    password = "testtest";
  }

  if ($page.query.confirmation_token) {
    if (confirmed) {
      success = "Your email address has been confirmed!";
    } else {
      if (message !== "" && message.email && message.email.length >= 0) {
        errors = [`Email ${message.email[0]}`];
      } else {
        errors = ["Token is invalid."];
      }
    }
  }

  async function handleSubmit() {
    submitting = true;
    errors = [];
    const { response, json } = await api.post(
      $session.API_ENDPOINT,
      "users/sign_in",
      { user: { login, password } },
      { aud: "UNKNOWN" }
    );
    if (response.status === 200) {
      success = "Signed in!";
      login = undefined;
      password = undefined;
      user.set(json);
    } else if (response.status === 401) {
      success = undefined;
      if (json.error) {
        errors = [...errors, json.error];
      } else {
        errors = [...errors, "You can't do that, Dave."];
      }
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
      <div class="-mt-px">
        <input
          aria-label="Username or Email address"
          name="user[login]"
          type="text"
          class="block w-full rounded-t-md
            focus:ring-primary-300 focus:border-primary-300 focus:outline-none focus:z-10
          "
          required
          placeholder="Username or Email address"
          bind:value={login}
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
      <SubmitButton {submitting} full icon={UiLockSolid}>Sign In</SubmitButton>
    </div>
  </form>
</div>
