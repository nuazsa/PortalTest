"use client"

import { useEffect, useState } from "react"
import { useTest } from "@/contexts/TestContext"
import { getRiasecQuestions } from "@/services/api"
import { RiasecQuestion } from "@/types/riasec"

interface QuestionNavigationProps {
  testType: string
  totalQuestions: number
  currentQuestion: number
  setCurrentQuestion: (index: number) => void
}

export default function QuestionNavigation({
  testType,
  totalQuestions,
  currentQuestion,
  setCurrentQuestion,
}: QuestionNavigationProps) {
  const { getAnswer } = useTest()
  const [questions, setQuestions] = useState<RiasecQuestion[]>([])

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getRiasecQuestions()
        setQuestions(data)
      } catch (error) {
        console.error("Failed to fetch questions", error)
      }
    }

    fetchQuestions()
  }, [])

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/20">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Daftar Soal:</h3>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => {
          const questionId = question.id
          const answer = getAnswer(testType, questionId)
          const isAnswered = answer !== undefined && answer !== "" && answer !== 0
          const isActive = currentQuestion === index

          return (
            <button
              key={questionId}
              onClick={() => setCurrentQuestion(index)}
              className={`
                w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-all duration-200
                border-2
                ${
                  isActive
                    ? "bg-blue-500 text-white border-blue-600 scale-110 shadow-lg"
                    : isAnswered
                    ? "bg-green-100 text-green-800 border-green-300 hover:bg-green-200"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {index + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}
