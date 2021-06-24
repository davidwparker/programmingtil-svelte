<script>
  //based on https://twitter.com/lihautan/status/1274876595170238465?s=20
  // usually this import strategy should work:
  //import {Motion, AnimatePresence,AnimateSharedLayout} from "svelte-motion";
  import Motion from 'svelte-motion/src/motion/MotionSSR.svelte';
  import AnimatePresence from 'svelte-motion/src/components/AnimatePresence/AnimatePresence.svelte';
  import AnimateSharedLayout from 'svelte-motion/src/components/AnimateSharedLayout/AnimateSharedLayout.svelte';
  import MotionConfig from 'svelte-motion/src/components/MotionConfig/MotionConfig.svelte';
  let layout = 'layout-a';
</script>

<div class="layout">
  <label><input type="radio" value="layout-a" bind:group={layout} />Layout A (display: flex)</label>
  <label><input type="radio" value="layout-b" bind:group={layout} />Layout B (float)</label>
  <label><input type="radio" value="layout-c" bind:group={layout} />Layout C (diplay: grid)</label>
</div>
<br />

<div class="q">
  <MotionConfig transition={{ duration: 0.4 }}>
    <AnimateSharedLayout type="crossfade">
      <AnimatePresence list={[{ key: layout, layout }]} let:item>
        {#if item.layout === 'layout-a'}
          <main class="container layout-a">
            <Motion let:motion layoutId="a">
              <div class="a" use:motion>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco
              </div>
            </Motion>
            <Motion let:motion layoutId="b">
              <div class="b" use:motion>B</div>
            </Motion>
            <Motion let:motion layoutId="c">
              <div class="c" use:motion>C</div>
            </Motion>
          </main>
        {:else if item.layout === 'layout-b'}
          <main class="container layout-b">
            <Motion let:motion layoutId="b">
              <div class="b" use:motion>B</div>
            </Motion>
            <Motion let:motion layoutId="a">
              <div class="a" use:motion>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </div>
            </Motion>
            <Motion let:motion layoutId="c">
              <div class="c" use:motion>C</div>
            </Motion>
          </main>
        {:else if item.layout === 'layout-c'}
          <main class="container layout-c">
            <Motion let:motion layoutId="c">
              <div class="c" use:motion>C</div>
            </Motion>
            <Motion let:motion layoutId="b">
              <div class="b" use:motion>B</div>
            </Motion>
            <Motion let:motion layoutId="a">
              <div class="a" use:motion>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco
              </div>
            </Motion>
            <Motion
              let:motion
              layoutId="d"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <div class="d" use:motion>D</div>
            </Motion>
          </main>
        {/if}
      </AnimatePresence>
    </AnimateSharedLayout>
  </MotionConfig>
</div>

<style>
  .layout {
    padding: 8px;
  }
  .q {
    position: relative;
    height: 25rem;
  }
  .container {
    position: absolute;
    width: 100%;
  }
  .layout-a {
    display: flex;
  }
  .layout-a .a,
  .layout-a .b,
  .layout-a .c {
    height: 100px;
    flex: 1;
    font-size: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .layout-a .a {
    color: black;
    font-size: 12px;
    display: block;
    padding: 4px;
  }
  .b {
    background: green;
  }
  .c {
    background: blue;
  }
  .d {
    background: red;
  }
  .layout-b .b {
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin: 4px;
  }
  .layout-b .c {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin: 4px;
  }

  .layout-c {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .layout-c .b,
  .layout-c .c,
  .layout-c .d {
    color: white;
  }
</style>
