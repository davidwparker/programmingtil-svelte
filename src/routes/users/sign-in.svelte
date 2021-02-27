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

<div>
  {#if success}
    {success}
  {/if}
  {#if errors.length > 0}
    {errors[0]}
  {/if}
</div>
