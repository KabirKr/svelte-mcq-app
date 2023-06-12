<script lang="ts">
  import type { Mcq } from "../types"

  export let mcq: Mcq

  let selectedOption: string = ""

  $: correctAns = mcq.options.find((option) => option.id === mcq.answer)?.value
  $: isCorrect = selectedOption === correctAns

  const checkAnswer = (event: Event) => {
    const { value } = event.target as HTMLInputElement
    selectedOption = value
    isCorrect = selectedOption === correctAns
  }
</script>

<div>
  <h3 class="mcq-text-base mcq-font-medium mcq-mt-4">
    {mcq.question}
  </h3>

  <ul class="mcq-grid mcq-w-full mcq-gap-5 md:mcq-grid-cols-2 mcq-mt-8">
    {#each mcq.options as option}
      <li>
        <label
          for={option.id.toString()}
          class="mcq-inline-flex mcq-items-center mcq-justify-between mcq-w-full mcq-px-3 mcq-py-5 mcq-bg-white mcq-border mcq-border-gray-300 mcq-cursor-pointer hover:mcq-text-gray-600 hover:mcq-bg-gray-100 mcq-h-full"
          class:correct={isCorrect && selectedOption === option.value}
          class:incorrect={!isCorrect && selectedOption === option.value}
        >
          <input
            type="radio"
            id={option.id.toString()}
            name={mcq.id.toString()}
            value={option.value}
            bind:group={selectedOption}
            on:change={checkAnswer}
            class="mcq-hidden"
          />
          <div class="mcq-flex mcq-w-full mcq-justify-between">
            <div class="mcq-w-full mcq-flex mcq-space-x-2">
              <span
                class="mcq-w-6 mcq-h-6 mcq-rounded-full mcq-flex mcq-items-center mcq-justify-center mcq-bg-gray-300 mcq-text-xs mcq-font-semibold"
              >
                {option.id}
              </span>
              <span class="mcq-text-gray-800"> {option.value}</span>
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

<style>
  .correct {
    border-width: 2px;
    border-color: #15803d;
    background-color: #f0fdf4;
  }

  .incorrect {
    border-width: 2px;
    border-color: #e11d48;
    background-color: #fff1f2;
  }
</style>
