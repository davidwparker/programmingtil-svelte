<script>
  import Motion from 'svelte-motion/src/motion/MotionSSR.svelte';

  // Example 2
  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -1000 },
  };
</script>

<Motion animate={{ rotate: 360 }} transition={{ duration: 2 }} let:motion
  ><div class="box" use:motion /></Motion
>
<!--Transition prop-->
<Motion animate={{ rotate: 360 }} transition={{ ease: 'easeOut', duration: 2 }} let:motion
  ><div use:motion class="box" /></Motion
>
<!--Keyframes-->
<Motion
  animate={{ rotate: [0, 360, 45] }}
  transition={{ duration: 3, times: [0, 0.2, 1] }}
  let:motion><div class="box" use:motion /></Motion
>
<!--Variants-->
<Motion initial="hidden" animate="visible" {variants} let:motion
  ><div class="box" use:motion /></Motion
>

<style>
  /* Example 1/2 */
  .box {
    height: 100px;
    width: 100px;
    margin: 2rem;
    background-color: white;
  }
</style>
