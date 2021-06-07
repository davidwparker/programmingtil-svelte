<script context="module">
  import * as api from '$lib/shared/apis';

  export async function load({ page, session }) {
    const url = `api/v1/users/${page.params.slug}`;
    const { response, json } = await api.get(session.API_ENDPOINT, url);
    if (response.status === 200) {
      return {
        props: {
          localUser: json.data,
        },
      };
    }
  }
</script>

<script>
  export let localUser;
</script>

<svelte:head>
  <title>ProgrammingTIL Svelte and SvelteKit</title>
</svelte:head>

<div class="max-w-sm mx-auto py-6">
  <div>
    User ID: {localUser.id}
  </div>
  <div>
    Slug: {localUser.attributes.slug}
  </div>
  <div>
    Display Name: {localUser.attributes.displayName}
  </div>
</div>
