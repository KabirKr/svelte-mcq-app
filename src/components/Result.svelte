<script lang="ts">
  import { appStore, userStore } from "../store"
  import Button from "./ui/Button.svelte"

  // Load MCQs from window
  const __MCQ__ = (window as any).__MCQ__

  const startAgain = () => {
    appStore.set("HOME")
  }
</script>

<div>
  <div class="mcq-pb-5 mcq-space-y-3 mcq-border-b mcq-border-b-gray-400">
    <h2 class="mcq-font-bold mcq-text-xl mcq-text-center">
      Hello {$userStore.username}, Here are the results
    </h2>
    <p
      class="mcq-flex mcq-items-center mcq-justify-between mcq-font-semibold mcq-text-base"
    >
      <span class="mcq-block">Total Marks: {$userStore.totalMarks}</span>
      <span class="mcq-block">Your Score: {$userStore.marksObtained}</span>
    </p>
  </div>

  <div class="mcq-mt-8">
    <h3 class="mcq-font-bold mcq-text-xl">Answer Key:</h3>
    <ol class="mcq-space-y-6 mcq-ml-3 mcq-mt-8 mcq-p-0 mcq-m-0">
      {#each __MCQ__ as mcq}
        <li class="mcq-list-decimal before:mcq-content-none">
          <div>
            <h3 class="mcq-font-semibold mcq-text-lg mcq-font-brand">
              {@html mcq.question}
            </h3>
            <ul class=" mcq-list-inside mcq-mt-3 mcq-p-0 mcq-m-0">
              {#each mcq.options as option}
                <li
                  class={[
                    "mcq-font-brand",
                    "mcq-list-decimal",
                    "before:mcq-content-none",
                    option.id === mcq.answer &&
                      "mcq-text-green-600 mcq-font-medium",
                  ].join(" ")}
                >
                  {@html option.value}
                </li>
              {/each}
            </ul>
          </div>
        </li>
      {/each}
    </ol>
    <Button class="mcq-mt-5" handleClick={startAgain}>Start Again</Button>
  </div>
</div>
