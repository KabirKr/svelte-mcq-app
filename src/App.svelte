<script lang="ts">
  // Store
  import { appStore } from "./store"
  import type { AppStore } from "./store"

  // Components
  import Home from "./components/Home.svelte"
  import Questions from "./components/Questions.svelte"
  import Result from "./components/Result.svelte"

  let currentStep: AppStore

  appStore.subscribe((value) => {
    currentStep = value
  })
</script>

<div class="mcq-container mcq-py-10">
  <div class="mcq-border mcq-px-2 md:mcq-px-5 mcq-py-5">
    {#if currentStep === "HOME"}
      <Home />
    {:else if currentStep === "QUESTIONS"}
      <Questions />
    {:else if currentStep === "RESULT"}
      <Result />
    {:else}
      {null}
    {/if}
  </div>
</div>
