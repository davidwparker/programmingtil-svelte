<script>
  // based on https://codesandbox.io/s/framer-motion-path-drawing-drag-and-usetransform-jnqk2

  import Motion from 'svelte-motion/src/motion/MotionSSR.svelte';
  import { useTransform } from 'svelte-motion/src/value/use-transform.js';
  import { useMotionValue } from 'svelte-motion/src/value/use-motion-value.js';
  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    'linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)',
    'linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)',
    'linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)',
  ]);
  const color = useTransform(x, xInput, ['rgb(211, 9, 225)', 'rgb(68, 0, 255)', 'rgb(3, 209, 0)']);
  const tickPath = useTransform(x, [10, 60], [0, 1]);
  const crossPathA = useTransform(x, [-10, -40], [0, 1]);
  const crossPathB = useTransform(x, [-35, -60], [0, 1]);
</script>

<div class="q">
  <Motion let:motion={bg} style={{ background }}>
    <div class="background" use:bg>
      <Motion drag="x" dragConstraints={{ left: 0, right: 0 }} style={{ x }} let:motion>
        <div class="box center unselectable" use:motion>
          <svg class="progress-icon" viewBox="0 0 50 50">
            <Motion
              isSVG={true}
              let:motion={m}
              style={{ translateX: 5, translateY: 5 }}
              stroke={color}
            >
              <path
                use:m
                d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                stroke-width="2"
                fill="none"
              />
            </Motion>
            <Motion isSVG={true} let:motion={m} style={{ pathLength: tickPath }} stroke={color}>
              <path
                use:m
                fill="none"
                stroke-width="2"
                d="M14,26 L 22,33 L 35,16"
                strokeDasharray="0 1"
              />
            </Motion>
            <Motion isSVG={true} let:motion={m} stroke={color} style={{ pathLength: crossPathA }}>
              <path use:m fill="none" stroke-width="2" d="M17,17 L33,33" strokeDasharray="0 1" />
            </Motion>
            <Motion isSVG={true} let:motion={m} style={{ pathLength: crossPathB }} stroke={color}>
              <path use:m fill="none" stroke-width="2" d="M33,17 L17,33" strokeDasharray="0 1" />
            </Motion>
          </svg>
        </div>
      </Motion>
    </div>
  </Motion>
</div>

<style>
  .q {
    position: relative;
    height: 25rem;
  }
  .background {
    background: linear-gradient(250deg, rgb(50, 50, 255), rgb(150, 150, 250));
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    touch-action: none;
  }
  .box {
    background: white;
    border-radius: 30px;
    width: 150px;
    height: 150px;
    position: absolute;
    top: calc(50% - 150px / 2);
    left: calc(50% - 150px / 2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .progress-icon {
    width: 80%;
    height: 80%;
  }
</style>
