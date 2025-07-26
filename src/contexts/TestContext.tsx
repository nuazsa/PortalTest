"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Answer {
  questionId: number
  answer: string | number
}

interface TestContextType {
  answers: Record<string, Answer[]>
  saveAnswer: (testType: string, questionId: number, answer: string | number) => void
  getAnswer: (testType: string, questionId: number) => string | number | undefined
  clearAnswers: (testType: string) => void
}

const TestContext = createContext<TestContextType | undefined>(undefined)

export function TestProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Record<string, Answer[]>>({})

  const saveAnswer = (testType: string, questionId: number, answer: string | number) => {
    setAnswers((prev) => {
      const testAnswers = prev[testType] || []
      const existingIndex = testAnswers.findIndex((a) => a.questionId === questionId)

      if (existingIndex >= 0) {
        testAnswers[existingIndex] = { questionId, answer }
      } else {
        testAnswers.push({ questionId, answer })
      }

      return {
        ...prev,
        [testType]: testAnswers,
      }
    })
  }

  const getAnswer = (testType: string, questionId: number) => {
    const testAnswers = answers[testType] || []
    const answer = testAnswers.find((a) => a.questionId === questionId)
    return answer?.answer
  }

  const clearAnswers = (testType: string) => {
    setAnswers((prev) => ({
      ...prev,
      [testType]: [],
    }))
  }

  return (
    <TestContext.Provider value={{ answers, saveAnswer, getAnswer, clearAnswers }}>{children}</TestContext.Provider>
  )
}

export function useTest() {
  const context = useContext(TestContext)
  if (context === undefined) {
    throw new Error("useTest must be used within a TestProvider")
  }
  return context
}
