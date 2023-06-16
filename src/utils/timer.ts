let timeLeft: number
let timer: number
let updateCallback: (time: number) => void

export function startTimer(
  duration: number,
  callback: (time: number) => void,
): void {
  clearInterval(timer) // Clear any existing timers
  timeLeft = duration
  updateCallback = callback
  updateCallback(timeLeft) // Invoke the callback immediately with the initial time
  timer = window.setInterval(() => {
    timeLeft--
    if (timeLeft <= 0) {
      clearInterval(timer)
      console.log("Timer finished!")
    }
    updateCallback(timeLeft) // Invoke the callback with the updated time
  }, 1000)
}

export function restartTimer(newDuration?: number): void {
  clearInterval(timer) // Clear the existing timer
  const duration = newDuration !== undefined ? newDuration : timeLeft
  startTimer(duration, updateCallback) // Start a new timer with the specified duration or the remaining time and callback
}
