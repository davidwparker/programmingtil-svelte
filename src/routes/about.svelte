<script context="module">
  import { protectedRedirect } from '$lib/shared/helpers';

  export async function load({ session }) {
    return protectedRedirect(session, {});
  }
</script>

Hello about!!!
