"use client"

import { useState } from "react"
import { useTest } from "@/contexts/TestContext"
import QuestionMultipleChoice from "@/components/questions/QuestionMultipleChoice"
import QuestionEssay from "@/components/questions/QuestionEssay"
import QuestionSlider from "@/components/questions/QuestionSlider"
import mbtiData from "@/data/mbti.json"

export default function MbtiPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const { saveAnswer, getAnswer } = useTest()

  const handleAnswerChange = (answer: string | number) => {
    saveAnswer("mbti", mbtiData.questions[currentQuestion].id, answer)
  }

  const handleNext = () => {
    if (currentQuestion < mbtiData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const renderQuestion = () => {
    const question = mbtiData.questions[currentQuestion]
    const currentAnswer = getAnswer("mbti", question.id)

    switch (question.type) {
      case "multiple_choice":
        return (
          <QuestionMultipleChoice
            question={question.question}
            options={question.options || []}
            onAnswerChange={handleAnswerChange}
            currentAnswer={currentAnswer as string}
          />
        )
      case "essay":
        return (
          <QuestionEssay
            question={question.question}
            onAnswerChange={handleAnswerChange}
            currentAnswer={currentAnswer as string}
          />
        )
      case "slider":
        return (
          <QuestionSlider
            question={question.question}
            min={question.min}
            max={question.max}
            onAnswerChange={handleAnswerChange}
            currentAnswer={currentAnswer as number}
          />
        )
      default:
        return null
    }
  }

  if (isCompleted) {
    return (
      <div className="flex-1 overflow-auto bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="max-w-2xl mx-auto p-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl -z-10"></div>
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-white/20">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Tes Selesai! 🎉
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Terima kasih telah menyelesaikan tes MBTI. Hasil tes Anda sedang diproses dan akan segera tersedia.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setCurrentQuestion(0)
                    setIsCompleted(false)
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                >
                  🔄 Ulangi Tes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-3xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            {mbtiData.title}
          </h1>
          <p className="text-xl text-gray-600">{mbtiData.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-3">
            <span>
              Pertanyaan {currentQuestion + 1} dari {mbtiData.questions.length}
            </span>
            <span className="text-purple-600">
              {Math.round(((currentQuestion + 1) / mbtiData.questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${((currentQuestion + 1) / mbtiData.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-2xl -z-10"></div>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            {renderQuestion()}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:hover:shadow-lg"
          >
            ← Sebelumnya
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
          >
            {currentQuestion === mbtiData.questions.length - 1 ? "🏁 Selesai" : "Selanjutnya →"}
          </button>
        </div>
      </div>
    </div>
  )
}
