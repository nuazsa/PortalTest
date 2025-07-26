"use client"

import { useState } from "react"

interface QuestionEssayProps {
  question: string
  onAnswerChange: (answer: string) => void
  currentAnswer?: string
}

export default function QuestionEssay({ question, onAnswerChange, currentAnswer }: QuestionEssayProps) {
  const [answer, setAnswer] = useState<string>(currentAnswer || "")

  const handleAnswerChange = (value: string) => {
    setAnswer(value)
    onAnswerChange(value)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 leading-relaxed">{question}</h3>
      <div className="relative">
        <textarea
          value={answer}
          onChange={(e) => handleAnswerChange(e.target.value)}
          placeholder="Tuliskan jawaban Anda di sini dengan detail..."
          className="w-full h-40 p-6 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 resize-none transition-all duration-200 text-gray-700 placeholder-gray-400 shadow-inner bg-gradient-to-br from-white to-gray-50"
        />
        <div className="absolute bottom-4 right-4 text-sm text-gray-500 bg-white/80 px-3 py-1 rounded-full shadow-sm">
          {answer.length} karakter
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          💡 Tips: Berikan contoh konkret
        </div>
        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          ✨ Jelaskan dengan detail
        </div>
      </div>
    </div>
  )
}
