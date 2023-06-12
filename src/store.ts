import { writable } from "svelte/store"

export type AppStore = "HOME" | "TIMER" | "QUESTIONS" | "RESULT"
export type McqStore = {
  id: number | string
  question: string
  options: Array<{
    id: number
    value: string
  }>
  answer: number // currect option number
}

export const appStore = writable<AppStore>("HOME")
