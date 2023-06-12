export type Mcq = {
  id: number | string
  question: string
  options: Array<{
    id: number
    value: string
  }>
  answer: number // currect option number
}
