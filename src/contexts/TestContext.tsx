"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Answer {
  questionId: string | number
  answer: string | number
  isDoubtful?: boolean
}

interface TestContextType {
  answers: Record<string, Answer[]>
  saveAnswer: (testType: string, questionId: string | number, answer: string | number) => void
  toggleDoubtful: (testType: string, questionId: string | number) => void
  getAnswer: (testType: string, questionId: string | number) => Answer | undefined
  clearAnswers: (testType: string) => void
}

const TestContext = createContext<TestContextType | undefined>(undefined)

export function TestProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Record<string, Answer[]>>({})

  const saveAnswer = (testType: string, questionId: string | number, answer: string | number) => {
    setAnswers((prev) => {
      const testAnswers = prev[testType] || []
      const existingIndex = testAnswers.findIndex((a) => a.questionId === questionId)

      if (existingIndex >= 0) {
        const updatedAnswers = [...testAnswers]
        updatedAnswers[existingIndex] = { ...updatedAnswers[existingIndex], answer }
        return { ...prev, [testType]: updatedAnswers }
      } else {
        return {
          ...prev,
          [testType]: [...testAnswers, { questionId, answer, isDoubtful: false }],
        }
      }
    })
  }

  const toggleDoubtful = (testType: string, questionId: string | number) => {
    setAnswers((prev) => {
      const testAnswers = prev[testType] || []
      const existingIndex = testAnswers.findIndex((a) => a.questionId === questionId)

      if (existingIndex >= 0) {
        const updatedAnswers = [...testAnswers]
        const currentAnswer = updatedAnswers[existingIndex]
        updatedAnswers[existingIndex] = { ...currentAnswer, isDoubtful: !currentAnswer.isDoubtful }
        return { ...prev, [testType]: updatedAnswers }
      }
      
      return {
          ...prev,
          [testType]: [...testAnswers, { questionId, answer: 0, isDoubtful: true }],
      }
    })
  }

  const getAnswer = (testType: string, questionId: string | number) => {
    const testAnswers = answers[testType] || []
    return testAnswers.find((a) => a.questionId === questionId)
  }

  const clearAnswers = (testType: string) => {
    setAnswers((prev) => ({
      ...prev,
      [testType]: [],
    }))
  }

  return (
    <TestContext.Provider value={{ answers, saveAnswer, getAnswer, toggleDoubtful, clearAnswers }}>{children}</TestContext.Provider>
  )
}

export function useTest() {
  const context = useContext(TestContext)
  if (context === undefined) {
    throw new Error("useTest must be used within a TestProvider")
  }
  return context
}