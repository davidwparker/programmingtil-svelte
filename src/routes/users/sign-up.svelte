<script>
  import * as api from 'shared/apis';

  let email, password;
  let errors = [], submitting, success;

  async function handleSubmit() {
    submitting = true;
    errors = [];
    const { response, json } = await api.post(
      'http://localhost:3000',
      'users',
      { user: { email, password } }
    );
    if (response.status === 200) {
      success = json.message;
      email = undefined;
      password = undefined;
    }
    else if (response.status === 401) {
      success = undefined;
      if (json.email) {
        errors = [...errors, `Email ${json.email[0]}`];
      }
      if (json.password) {
        errors = [...errors, `Password ${json.password[0]}`];
      }
    }
    else if (response.status === 404) {
      errors = ['Registration cannot be found, try again soon.'];
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

<div
  class="flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8"
>
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

<div>
  {#if success}
    {success}
  {/if}
  {#if errors.length > 0}
    {errors[0]}
  {/if}
</div>
