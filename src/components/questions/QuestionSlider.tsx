"use client"

import { useState } from "react"

interface QuestionSliderProps {
  question: string
  min?: number
  max?: number
  onAnswerChange: (answer: number) => void
  currentAnswer?: number
}

export default function QuestionSlider({
  question,
  min = 1,
  max = 5,
  onAnswerChange,
  currentAnswer,
}: QuestionSliderProps) {
  // Gunakan 0 sebagai status "belum dijawab"
  const [value, setValue] = useState<number>(currentAnswer || 0)

  const handleValueChange = (newValue: number) => {
    setValue(newValue)
    onAnswerChange(newValue)
  }

  const getLabel = (val: number) => {
    if (val === 0) return "Pilih jawaban Anda" // Teks untuk status belum dijawab
    const labels = ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"]
    return labels[val - 1] || ""
  }

  // Atur progress ke -1 jika belum dijawab agar tidak ada progress bar yang terlihat
  const progressPercentage = value === 0 ? -1 : ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 leading-relaxed">{question}</h3>
      <div className="space-y-6">
        {/* Indikator Teks yang Dipilih */}
        <div className="text-center transition-all duration-200 h-10 flex items-center justify-center">
          <div
            className={`
              inline-block px-6 py-2 rounded-full font-semibold text-lg shadow-inner transition-colors duration-300
              ${
                value === 0
                  ? "bg-gray-200 text-gray-600"
                  : "bg-blue-100 text-blue-800"
              }
            `}
          >
            <span>{getLabel(value)}</span>
          </div>
        </div>

        {/* Slider Input */}
        <div className="relative px-2">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            // Tambahkan step agar slider "melompat" ke angka integer
            step="1"
            onChange={(e) => handleValueChange(Number.parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #60a5fa ${progressPercentage}%, #d1d5db ${progressPercentage}%)`,
            }}
          />
          
          {/* Angka dengan lingkaran yang bisa diklik di bawah slider */}
          <div className="flex justify-between text-sm text-gray-500 mt-4">
            {Array.from({ length: max - min + 1 }, (_, i) => {
              const numValue = min + i
              return (
                <button
                  key={i}
                  onClick={() => handleValueChange(numValue)}
                  className="flex flex-col items-center w-8 group focus:outline-none"
                >
                  <div
                    className={`
                      w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-200
                      group-hover:scale-110 group-focus:ring-2 ring-offset-1 ring-blue-400
                      ${
                        value >= numValue && value !== 0
                          ? "bg-blue-500 border-blue-600 text-white"
                          : "bg-gray-200 border-gray-300 text-gray-500"
                      }
                    `}
                  >
                    <span className="font-bold text-xs">{numValue}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
        
        {/* Keterangan Ujung Kiri dan Kanan */}
        <div className="flex justify-between text-xs text-gray-500 -mt-2">
          <span>Sangat Tidak Setuju</span>
          <span>Sangat Setuju</span>
        </div>
      </div>
    </div>
  )
}