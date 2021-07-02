<!-- <script context="module"> -->
<script>
  import BasicAnimation1 from '$lib/components/motion/BasicAnimation1.svelte';
  import BasicAnimation2 from '$lib/components/motion/BasicAnimation2.svelte';
  import UseAnimationExample from '$lib/components/motion/UseAnimationExample.svelte';
  import AnimateSharedLayout from '$lib/components/motion/AnimateSharedLayout.svelte';
  import DragExample from '$lib/components/motion/DragExample.svelte';
  import UseMotionValueExample from '$lib/components/motion/UseMotionValueExample.svelte';
  import MotionConfig from '$lib/components/motion/MotionConfig.svelte';
</script>

<div class="max-w-sm mx-auto py-6">
  <h1>
    <a href="https://svelte-motion.gradientdescent.de/">Svelte Motion Website</a>
  </h1>
  <h2>Animation 1</h2>
  <BasicAnimation1 />

  <h2>Animation 2</h2>
  <BasicAnimation2 />

  <h2>useAnimation</h2>
  Isn't working...
  <UseAnimationExample />

  <h2>Animate Shared Layout</h2>
  <AnimateSharedLayout />

  <h2>Drag</h2>
  <DragExample />

  <h2>Motion</h2>
  <UseMotionValueExample />

  <h2>Motion Config</h2>
  <MotionConfig />
</div>
