<script>
  import Motion from 'svelte-motion/src/motion/MotionSSR.svelte';
  let i = 0;
  const klass =
    'px-3 py-2 rounded-md leading-5 font-medium \
    focus:outline-none focus:text-white focus:bg-primary-300 \
    text-neutral-800 hover:text-white hover:bg-primary-300 \
    dark:text-white dark:hover:bg-primary-700 dark:focus:bg-primary-700 \
    dark:bg-black';
</script>

<Motion animate={{ rotate: i }} transition={{ duration: 0.5 }} let:motion>
  <div class="box" use:motion />
</Motion>
<button class={klass} on:click={() => (i += 45)}>turn</button>

<style>
  .box {
    height: 100px;
    width: 100px;
    margin: 2rem;
    background-color: white;
  }
</style>
