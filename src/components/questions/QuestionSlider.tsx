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
  const [value, setValue] = useState<number>(currentAnswer || Math.round((min + max) / 2))

  const handleValueChange = (newValue: number) => {
    setValue(newValue)
    onAnswerChange(newValue)
  }

  const getLabel = (val: number) => {
    const labels = ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"]
    return labels[val - 1] || ""
  }

  const progressPercentage = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-8">
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed text-center">{question}</h3>
      <div className="space-y-6">
        {/* Indikator Teks yang Dipilih */}
        <div className="text-center transition-all duration-200 h-10 flex items-center justify-center">
          <div className="inline-block px-6 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold text-lg shadow-inner">
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
            onChange={(e) => handleValueChange(Number.parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #60a5fa ${progressPercentage}%, #d1d5db ${progressPercentage}%)`,
            }}
          />
          
          {/* Angka di bawah slider */}
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            {Array.from({ length: max - min + 1 }, (_, i) => (
              <span key={i} className="font-medium">
                {min + i}
              </span>
            ))}
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