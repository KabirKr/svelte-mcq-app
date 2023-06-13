<script lang="ts">
  import { appStore, userStore } from "../store"
  import Button from "./ui/Button.svelte"

  let username = ""
  let inputError = null

  const startMcq = () => {
    if (!username.trim().length) {
      inputError = "Enter a valid name"
      return
    }

    // Save username
    userStore.update((value) => ({ ...value, username }))

    // Go to wait time screen
    appStore.set("TIMER")
  }
</script>

<div>
  <!-- TODO Accept Title as Prop -->
  <h2 class="mcq-text-gray-950 mcq-text-2xl mcq-font-bold mcq-text-center">
    Computer Science
  </h2>
  <div>
    <label for="mcq-username" class="mcq-block mcq-mt-10">
      <span class="mcq-sr-only">Username</span>
      <input
        type="text"
        bind:value={username}
        id="mcq-username"
        name="mcq-username"
        placeholder="Enter your name"
        class="mcq-border-2 mcq-block mcq-w-full mcq-p-3 mcq-text-base focus:mcq-outline-none focus:mcq-ring
          {inputError
          ? 'mcq-border-red-500 focus:mcq-ring-red-300/50'
          : 'mcq-border-gray-950 focus:mcq-ring-gray-400/50'}"
      />
    </label>
    {#if inputError}
      <small class="mcq-text-red-500 mcq-text-xs">
        {inputError}
      </small>
    {/if}
  </div>
  <Button handleClick={startMcq} class="mcq-mt-2">
    <span>Start Quiz</span>
  </Button>
</div>
