<script>
  //based on https://codesandbox.io/s/framer-motion-drag-with-constraints-pjn6t

  import Motion from 'svelte-motion/src/motion/MotionSSR.svelte';
  let area;
</script>

<div class="background">
  <div class="drag-area" bind:this={area} />
  <Motion drag dragConstraints={{ current: area }} let:motion>
    <div class="box center unselectable" use:motion>Drag me</div>
  </Motion>
</div>

<style>
  .background {
    background: linear-gradient(250deg, rgb(50, 50, 255), rgb(150, 150, 250));
    display: flex;
    flex-direction: column;
    height: 25rem;
    justify-content: center;
    align-items: center;
    touch-action: none;
    position: relative;
  }

  .box {
    background: white;
    border-radius: 30px;
    width: 150px;
    height: 150px;
    position: absolute;
    top: calc(50% - 150px / 2);
    left: calc(50% - 150px / 2);
  }
  .drag-area {
    opacity: 0.2;
    background: white;
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 30px;
    top: calc(50% - 150px);
    left: calc(50% - 150px);
  }
  .unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .center {
    justify-content: center;
    align-items: center;
    display: flex;
  }
</style>
