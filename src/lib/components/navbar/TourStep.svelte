<script>
  import Motion from 'svelte-motion/src/motion/MotionSSR.svelte';
  import { js, tour } from '$lib/shared/stores';

  export let step, left;
</script>

{#if $js && $tour.display && $tour.step === step}
  <Motion let:motion layoutId="tour">
    <div class="absolute inset-0 mt-2" use:motion>
      <div class="w-48">
        <!-- Separator -->
        <div
          class="absolute left-4 top-4 w-4 transform -rotate-90 text-primary-400"
          style="height: 60px;"
          aria-hidden="true"
        >
          <svg
            class="h-full w-full"
            viewBox="0 0 12 82"
            fill="currentcolor"
            preserveAspectRatio="none"
          >
            <path
              d="M0.5 0V31L10.5 41L0.5 51V82"
              stroke="currentcolor"
              vector-effect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div
          class="px-3 py-2 absolute top-12 {left} w-44
            border rounded-lg border-primary-400
            bg-white dark:bg-black
            dark:hover:border-primary-400 dark:hover:bg-primary-900
            dark:focus:border-primary-400 dark:focus:bg-primary-900"
        >
          <slot />
        </div>
      </div>
    </div>
  </Motion>
{/if}
