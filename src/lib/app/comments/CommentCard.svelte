<script>
  // import DOMPurify from 'isomorphic-dompurify';
  import snarkdown from 'snarkdown';

  export let comment;
</script>

<div class="dark:text-white">
  {@html snarkdown(comment.attributes.body)}
</div>
<div class="dark:text-gray-300">
  commented by
  <a href="/users/{comment.attributes.user.slug}">
    {comment.attributes.user.displayName}
  </a>
</div>
<div class="dark:text-gray-400">
  {comment.attributes.updatedAt}
</div>
