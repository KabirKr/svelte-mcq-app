<script lang="ts">
  import { twMerge } from "tailwind-merge"

  export let handleClick = () => {}
</script>

<button
  type="button"
  on:click={handleClick}
  class={twMerge(
    "mcq-block mcq-bg-gray-950 mcq-text-white mcq-uppercase mcq-tracking-wide mcq-font-medium mcq-py-3.5 mcq-px-5 mcq-shadow-lg hover:mcq-bg-gray-800 mcq-text-sm mcq-w-full focus:mcq-outline-none focus:mcq-ring focus:mcq-ring-gray-400/50" +
      ($$props.class ? " " + $$props.class : ""),
  )}
>
  <slot />
</button>
