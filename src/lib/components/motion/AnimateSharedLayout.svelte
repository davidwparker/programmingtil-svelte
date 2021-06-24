<script>
  // based on: https://codesandbox.io/s/framer-motion-2-animatesharedlayout-animate-between-different-components-dy0bv?from-embed

  // usually this import strategy should work:
  import Motion from 'svelte-motion/src/motion/MotionSSR.svelte';
  import AnimateSharedLayout from 'svelte-motion/src/components/AnimateSharedLayout/AnimateSharedLayout.svelte';

  const colors = ['#ff0055', '#0099ff', '#22cc88', '#ffaa00'];
  let selected = colors[0];
  const spring = {
    type: 'spring',
    stiffness: 500,
    damping: 30,
  };
</script>

<AnimateSharedLayout>
  <ul>
    {#each colors as color}
      <li class="item" on:click={() => (selected = color)} style={'background-color: ' + color}>
        {#if selected === color}
          <Motion
            let:motion
            layoutId="outline"
            initial={false}
            animate={{ borderColor: color }}
            transition={spring}
          >
            <div class="outline" use:motion />
          </Motion>
        {/if}
      </li>
    {/each}
  </ul>
</AnimateSharedLayout>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 280px;
    height: 280px;
  }

  .item {
    -webkit-tap-highlight-color: transparent;
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 20px;
    position: relative;
    cursor: pointer;
    flex-shrink: 0;
  }

  .outline {
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    border: 10px solid white;
    border-radius: 50%;
  }
</style>
