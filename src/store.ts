import { writable } from "svelte/store"

export type AppStore = "HOME" | "TIMER" | "QUESTIONS" | "RESULT"

export type UserStore = {
  username: string
  marksObtained: number
  totalMarks: number
  // answers: [{ questionId: number; answerId: number; isCorrect: boolean }]
}

export const appStore = writable<AppStore>("HOME")
export const userStore = writable<UserStore>({
  username: "",
  marksObtained: 0,
  totalMarks: 0,
  // answers: null,
})
