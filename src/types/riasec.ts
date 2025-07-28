export interface RiasecQuestion {
  id: string
  question: string
  code: "R" | "I" | "A" | "S" | "E" | "C"
  category: string
}

export interface RiasecApiResponse {
  success: boolean
  message: string
  data: RiasecQuestion[]
}