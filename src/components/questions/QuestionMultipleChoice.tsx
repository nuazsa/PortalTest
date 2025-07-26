"use client"

import { useState } from "react"

interface QuestionMultipleChoiceProps {
  question: string
  options: string[]
  onAnswerChange: (answer: string) => void
  currentAnswer?: string
}

export default function QuestionMultipleChoice({
  question,
  options,
  onAnswerChange,
  currentAnswer,
}: QuestionMultipleChoiceProps) {
  const [selectedOption, setSelectedOption] = useState<string>(currentAnswer || "")

  const handleOptionChange = (option: string) => {
    setSelectedOption(option)
    onAnswerChange(option)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 leading-relaxed">{question}</h3>
      <div className="space-y-4">
        {options.map((option, index) => (
          <label
            key={index}
            className={`
              flex items-center space-x-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 group hover:scale-105
              ${
                selectedOption === option
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300 shadow-lg"
                  : "border-gray-200 hover:border-blue-200 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:shadow-md"
              }
            `}
          >
            <div className="relative">
              <input
                type="radio"
                name={`question-${question}`}
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
                className="sr-only"
              />
              <div
                className={`
                  w-6 h-6 rounded-full border-2 transition-all duration-200
                  ${
                    selectedOption === option
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 border-blue-500"
                      : "border-gray-300 group-hover:border-blue-400"
                  }
                `}
              >
                {selectedOption === option && (
                  <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
              </div>
            </div>
            <span className="text-gray-700 font-medium flex-1 leading-relaxed">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
