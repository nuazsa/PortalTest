import axios from "axios"
import type { RiasecApiResponse, RiasecQuestion } from "@/types/riasec"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const getRiasecQuestions = async (): Promise<RiasecQuestion[]> => {
  try {
    const response = await axios.get<RiasecApiResponse>(`${API_BASE_URL}/riasec`)

    if (response.data && response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || "Gagal mengambil data soal.")
    }
  } catch (error) {
    console.error("Error fetching RIASEC questions:", error)
    throw new Error("Terjadi masalah saat menghubungi server.")
  }
}