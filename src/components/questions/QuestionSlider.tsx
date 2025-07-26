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
  const [value, setValue] = useState<number>(currentAnswer || min)

  const handleValueChange = (newValue: number) => {
    setValue(newValue)
    onAnswerChange(newValue)
  }

  const getLabel = (val: number) => {
    const labels = ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"]
    return labels[val - 1] || ""
  }

  const getEmoji = (val: number) => {
    const emojis = ["😞", "😐", "😊", "😄", "🤩"]
    return emojis[val - 1] || ""
  }

  const getColor = (val: number) => {
    const colors = [
      "from-red-500 to-red-600",
      "from-orange-500 to-orange-600",
      "from-yellow-500 to-yellow-600",
      "from-green-500 to-green-600",
      "from-blue-500 to-blue-600",
    ]
    return colors[val - 1] || colors[0]
  }

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-800 leading-relaxed">{question}</h3>
      <div className="space-y-6">
        <div className="relative px-4">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => handleValueChange(Number.parseInt(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full appearance-none cursor-pointer slider shadow-inner"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-3 px-1">
            {Array.from({ length: max - min + 1 }, (_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-2 h-2 rounded-full ${i + min === value ? "bg-blue-500" : "bg-gray-300"} transition-colors`}
                ></div>
                <span className="mt-1 font-medium">{min + i}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div
            className={`inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r ${getColor(value)} text-white rounded-2xl shadow-lg font-semibold text-lg`}
          >
            <span className="text-2xl">{getEmoji(value)}</span>
            <span>
              {value} - {getLabel(value)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center text-sm">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl transition-all cursor-pointer ${
                i + 1 === value
                  ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleValueChange(i + 1)}
            >
              <div className="text-lg mb-1">{getEmoji(i + 1)}</div>
              <div className="font-medium">{getLabel(i + 1)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
