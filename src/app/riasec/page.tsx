"use client"

import { useEffect, useState } from "react"
import { useTest } from "@/contexts/TestContext"
import QuestionSlider from "@/components/questions/QuestionSlider"
import QuestionNavigation from "@/components/QuestionNavigation"
import { getRiasecQuestions } from "@/services/api"
import type { RiasecQuestion } from "@/types/riasec"
import { FiAlertCircle } from "react-icons/fi" // Impor ikon baru

export default function RiasecPage() {
  const [questions, setQuestions] = useState<RiasecQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const { saveAnswer, getAnswer, toggleDoubtful, clearAnswers } = useTest()

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        clearAnswers("riasec")
        const fetchedQuestions = await getRiasecQuestions()
        setQuestions(fetchedQuestions)
        setError(null)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAnswerChange = (answer: number) => {
    if (questions.length > 0) {
      const questionId = questions[currentQuestion].id
      saveAnswer("riasec", questionId, answer)
    }
  }

  const handleToggleDoubtful = () => {
    if (questions.length > 0) {
        const questionId = questions[currentQuestion].id
        toggleDoubtful("riasec", questionId)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
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

  // Cek status ragu-ragu untuk soal saat ini
  const currentAnswerData = questions.length > 0 ? getAnswer("riasec", questions[currentQuestion].id) : undefined
  const isCurrentDoubtful = currentAnswerData?.isDoubtful || false


  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Memuat soal...</h2>
          <p className="text-gray-500">Mohon tunggu sebentar.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center text-center text-red-600">
        <div>
          <h2 className="text-2xl font-semibold">Gagal Memuat Soal</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (isCompleted) {
    return (
        <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            <div className="max-w-2xl mx-auto p-8">
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-3xl -z-10"></div>
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-white/20">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                    Tes Selesai! 🎉
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                    Terima kasih telah menyelesaikan tes RIASEC. Hasil tes Anda sedang diproses dan akan segera tersedia.
                </p>
                <div className="space-y-4">
                    <button
                    onClick={() => {
                        setCurrentQuestion(0)
                        setIsCompleted(false)
                        // Bersihkan jawaban saat mengulang tes
                        clearAnswers("riasec")
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
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
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        {/* <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
            RIASEC Test
          </h1>
          <p className="text-lg md:text-xl text-gray-600">Tes untuk mengetahui minat karir berdasarkan teori Holland</p>
        </div> */}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-3">
            <span>
              Pertanyaan {currentQuestion + 1} dari {questions.length}
            </span>
            <span className="text-blue-600">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-2">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 blur-2xl -z-10"></div>
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20 min-h-[300px]">
                {questions.length > 0 && (
                  <QuestionSlider
                    question={questions[currentQuestion].question}
                    onAnswerChange={handleAnswerChange}
                    currentAnswer={currentAnswerData?.answer as number}
                  />
                )}
              </div>
            </div>
            
            {/* Tombol Navigasi Bawah */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-between gap-3">
              {/* Tombol Sebelumnya */}
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 font-semibold flex-1 sm:flex-none"
              >
                <span className="hidden sm:inline">← </span>Sebelumnya
              </button>

              {/* Tombol Ragu-ragu (hanya di layar besar) */}
              <button
                onClick={handleToggleDoubtful}
                className={`
                  hidden sm:flex px-6 py-3 border-2 rounded-xl font-semibold items-center gap-2 transition-colors
                  ${isCurrentDoubtful 
                    ? 'bg-yellow-400 text-white border-yellow-500 hover:bg-yellow-500' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
                `}
              >
                <FiAlertCircle />
                Ragu-ragu
              </button>

              {/* Tombol Selanjutnya */}
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 font-semibold flex-1 sm:flex-none"
              >
                {currentQuestion === questions.length - 1 ? "🏁 Selesai" : <>Selanjutnya<span className="hidden sm:inline"> →</span></>}
              </button>

              {/* Tombol Ragu-ragu (hanya di mobile, di baris terpisah) */}
              <button
                onClick={handleToggleDoubtful}
                className={`
                  sm:hidden col-span-2 w-full px-6 py-3 border-2 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors
                  ${isCurrentDoubtful 
                    ? 'bg-yellow-400 text-white border-yellow-500 hover:bg-yellow-500' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
                `}
              >
                <FiAlertCircle />
                Ragu-ragu
              </button>
            </div>

          </div>

          <div className="w-full lg:w-64 flex-1">
            {questions.length > 0 && (
                <QuestionNavigation
                testType="riasec"
                questions={questions}
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}