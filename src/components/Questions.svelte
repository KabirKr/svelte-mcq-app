<script lang="ts">
  import { appStore, userStore } from "../store"
  import { startTimer, restartTimer } from "../utils/timer"
  import Button from "./ui/Button.svelte"

  // Load MCQs from window
  const __MCQ__ = (window as any).__MCQ__

  let currentMcqIndex = 0
  let selectedOption: string | null = null
  let timeLeft: number

  $: isLastMcq = currentMcqIndex === __MCQ__.length - 1
  $: currentMcq = __MCQ__[currentMcqIndex]
  $: correctAns = currentMcq.options.find(
    (option) => option.id === currentMcq.answer,
  )?.value
  $: isCorrect = selectedOption === correctAns

  // Update total marks
  userStore.update((val) => ({ ...val, totalMarks: __MCQ__.length }))

  // Start timer
  startTimer(45, (time) => {
    timeLeft = time
  })

  // Handle next button click
  const handleNext = () => {
    // If last question then show results on next page
    if (isLastMcq) {
      appStore.set("RESULT")
      return
    }

    // Load next mcq
    currentMcqIndex++
    currentMcq = __MCQ__[currentMcqIndex]

    // Reset timer
    restartTimer(45)

    // Reset selected answer
    selectedOption = null
  }

  // Check user's answer
  const checkAnswer = (event: Event) => {
    const { value } = event.target as HTMLInputElement
    selectedOption = value
    isCorrect = selectedOption === correctAns

    // if the answer is correct add 1 mark to `userStore`
    if (isCorrect) {
      userStore.update((val) => ({
        ...val,
        marksObtained: val.marksObtained + 1,
      }))
    }
  }
</script>

<div>
  <div class="mcq-flex mcq-justify-between mcq-items-center">
    <p class="mcq-font-bold">Total Marks: {$userStore.totalMarks}</p>
    <p
      class="mcq-w-8 mcq-h-8 mcq-border-2 mcq-border-red-500 mcq-font-bold mcq-flex mcq-justify-center mcq-items-center mcq-rounded-full mcq-text-red-500 mcq-text-sm"
    >
      {timeLeft}
    </p>
  </div>

  <div>
    <h3 class="mcq-text-base mcq-font-medium mcq-mt-4">
      <span class="mcq-font-bold">(Q{currentMcqIndex + 1})</span>
      <span>{@html currentMcq.question}</span>
    </h3>

    <ul
      class="mcq-grid mcq-w-full mcq-gap-5 md:mcq-grid-cols-2 mcq-mt-8 mcq-p-0 mcq-m-0"
    >
      {#each currentMcq.options as option}
        <li class="mcq-list-none before:mcq-content-none">
          <input
            type="radio"
            id={option.id.toString()}
            name={currentMcq.id.toString()}
            value={option.value}
            bind:group={selectedOption}
            on:change={checkAnswer}
            disabled={!!selectedOption}
            class="mcq-sr-only"
          />
          <label
            for={option.id.toString()}
            class={[
              "mcq-inline-flex",
              "mcq-items-center",
              "mcq-justify-between",
              "mcq-w-full",
              "mcq-px-3",
              "mcq-py-5",
              "mcq-cursor-pointer",
              "mcq-h-full",
              "mcq-border-solid",
              selectedOption === option.value
                ? isCorrect
                  ? "mcq-bg-green-50 mcq-border-green-600 mcq-border-2 hover:mcq-bg-green-50"
                  : "mcq-bg-red-50 mcq-border-red-600 mcq-border-2 hover:mcq-bg-red-50"
                : "mcq-bg-white mcq-border mcq-border-gray-300 hover:mcq-text-gray-600 hover:mcq-bg-gray-100",
              !!selectedOption &&
                option.value === correctAns &&
                "mcq-bg-green-50 mcq-border-green-600 mcq-border-2 hover:mcq-bg-green-50",
              !!selectedOption &&
                selectedOption !== option.value &&
                "mcq-cursor-not-allowed mcq-bg-gray-100",
            ].join(" ")}
          >
            <div class="mcq-flex mcq-w-full mcq-justify-between">
              <div class="mcq-w-full mcq-flex mcq-space-x-2">
                <span
                  class="mcq-w-6 mcq-h-6 mcq-rounded-full mcq-flex mcq-items-center mcq-justify-center mcq-bg-gray-300 mcq-text-xs mcq-font-semibold"
                >
                  {option.id}
                </span>
                <span class="mcq-text-gray-800"> {@html option.value}</span>
              </div>
              <div>
                {#if selectedOption === option.value}
                  {#if isCorrect}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="mcq-w-6 mcq-h-6 mcq-text-green-700"
                    >
                      <path
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  {:else}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="mcq-w-6 mcq-h-6 mcq-text-red-600"
                    >
                      <path
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  {/if}
                {/if}
              </div>
            </div>
          </label>
        </li>
      {/each}
    </ul>
  </div>

  <div class="mcq-mt-4">
    <Button handleClick={handleNext}>
      {isLastMcq ? "See result" : "Next Question"}
    </Button>
  </div>
</div>
