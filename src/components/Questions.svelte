<script lang="ts">
  import { appStore } from "../store"
  import SingleQuestion from "./SingleQuestion.svelte"

  // TODO lod the data from window.__MCQ__
  import { __MCQ__ } from "../data"
  import Button from "./ui/Button.svelte"

  let currentMcqIndex = 0
  let timeLeft = 45

  $: isLastMcq = currentMcqIndex === __MCQ__.length - 1
  $: currentMcq = __MCQ__[currentMcqIndex]

  // Timer
  const timer = setInterval(() => {
    timeLeft--
    if (timeLeft <= 0) {
      clearInterval(timer)
    }
  }, 1000)

  const handleClick = () => {
    if (isLastMcq) {
      appStore.set("RESULT")
      return
    }

    currentMcqIndex++
    currentMcq = __MCQ__[currentMcqIndex]
  }
</script>

<div>
  <div class="mcq-flex mcq-justify-between mcq-items-center">
    <p class="mcq-font-bold">Q{currentMcqIndex + 1}</p>
    <p
      class="mcq-w-8 mcq-h-8 mcq-border-2 mcq-border-red-500 mcq-font-bold mcq-flex mcq-justify-center mcq-items-center mcq-rounded-full mcq-text-red-500 mcq-text-sm"
    >
      {timeLeft}
    </p>
  </div>

  <SingleQuestion mcq={currentMcq} />

  <div class="mcq-mt-4">
    <Button {handleClick}>
      {isLastMcq ? "See result" : "Next Question"}
    </Button>
  </div>
</div>
