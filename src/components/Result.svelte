<script>
  import { appStore } from "../store"
  import { __MCQ__ } from "../data"
  import Button from "./ui/Button.svelte"

  const startAgain = () => {
    appStore.set("HOME")
  }
</script>

<div>
  <h2 class="mcq-mb-5 mcq-font-bold mcq-text-2xl mcq-text-center">Result</h2>
  <hr />

  <div class="mcq-mt-8">
    <ol class="mcq-space-y-6 mcq-list-decimal mcq-ml-3">
      {#each __MCQ__ as mcq}
        <li>
          <div>
            <h3 class="mcq-font-semibold mcq-text-lg">{mcq.question}</h3>
            <ul class="mcq-list-decimal mcq-list-inside mcq-mt-3">
              {#each mcq.options as option}
                <li
                  class={option.id === mcq.answer &&
                    "mcq-text-green-600 mcq-font-medium"}
                >
                  {option.value}
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
