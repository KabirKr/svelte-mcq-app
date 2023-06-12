<script lang="ts">
  import { appStore } from "../store"

  let timeLeft = 3

  const handleTimeout = () => {
    // Go to questions screen
    appStore.set("QUESTIONS")
  }

  const timer = setInterval(() => {
    timeLeft--
    if (timeLeft <= 0) {
      clearInterval(timer)
      handleTimeout()
    }
  }, 1000)
</script>

<div
  class="mcq-py-20 mcq-flex mcq-flex-col mcq-justify-center mcq-items-center"
>
  <span class="mcq-block mcq-text-3xl mcq-font-bold mcq-text-red-500"
    >STARTS IN</span
  >
  <span class="mcq-block mcq-text-8xl mcq-font-bold mcq-text-red-500 mcq-mt-5">
    {timeLeft}
  </span>
</div>
