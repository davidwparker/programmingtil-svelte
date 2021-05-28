<script>
  // import DOMPurify from 'isomorphic-dompurify';
  import snarkdown from 'snarkdown';

  export let comment;
</script>

<div>
  {@html snarkdown(comment.attributes.body)}
</div>
<div>
  commented by
  <a href="/users/{comment.attributes.user.slug}">
    {comment.attributes.user.displayName}
  </a>
</div>
<div>
  {comment.attributes.updatedAt}
</div>
