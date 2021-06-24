<script>
  import Motion from 'svelte-motion/src/motion/MotionSSR.svelte';
  import { useAnimation } from 'svelte-motion/src/animation/use-animation.js';

  const controls = useAnimation();

  // grid array 20x20:
  const boxes = Array(20 * 20)
    .fill()
    .map((_, i) => ({ key: i, i: Math.floor(i / 20), j: i % 20 }));

  const click = (origin) => async () => {
    const delay = (box) =>
      Math.sqrt(
        Math.pow(box.i - origin.i, 2) + Math.pow(box.j - origin.j, 2) + 30 * Math.random()
      ) * 0.03;
    // fade out in distorted circular fashion
    await controls.start((box) => ({
      opacity: 0,
      transition: {
        delay: delay(box),
      },
    }));
    // distort position
    await controls.start((_) => ({
      x: (Math.random() - 0.5) * 1000,
      y: (Math.random() - 0.5) * 1000,
      transition: {
        duration: 0.01,
      },
    }));
    // return to start
    controls.start((box) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 1,
        delay: delay(box),
      },
    }));
  };
</script>

<div class="background">
  <div class="smallgrid">
    {#each boxes as box (box.key)}
      <Motion let:motion custom={box} animate={controls}>
        <div class="smallbox" use:motion on:click={click(box)} />
      </Motion>
    {/each}
  </div>
</div>

<style>
  .background {
    background: linear-gradient(250deg, rgb(50, 50, 255), rgb(150, 150, 250));
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .smallgrid {
    display: grid;
    grid-template-columns: repeat(20, auto);
  }
  .smallbox {
    width: 6px;
    height: 6px;
    background-color: white;
  }
</style>
