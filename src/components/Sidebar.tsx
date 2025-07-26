"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FiUser,
  FiActivity,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiTarget,
  FiHeart,
  FiZap,
  FiTrendingUp,
  FiAward,
} from "react-icons/fi"

interface SidebarProps {
  children: React.ReactNode
}

const tests = [
  {
    id: "riasec",
    name: "RIASEC Test",
    description: "Tes Minat Karir",
    icon: FiUser,
    available: true,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-r from-blue-50 to-cyan-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
  {
    id: "mbti",
    name: "MBTI Test",
    description: "Tes Kepribadian",
    icon: FiActivity,
    available: true,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-r from-purple-50 to-pink-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
  },
  {
    id: "test-3",
    name: "Big Five Test",
    description: "Coming Soon",
    icon: FiStar,
    available: false,
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "test-4",
    name: "Holland Code",
    description: "Coming Soon",
    icon: FiTarget,
    available: false,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "test-5",
    name: "EQ Test",
    description: "Coming Soon",
    icon: FiHeart,
    available: false,
    color: "from-rose-500 to-pink-500",
  },
  {
    id: "test-6",
    name: "IQ Test",
    description: "Coming Soon",
    icon: FiZap,
    available: false,
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "test-7",
    name: "Career Test",
    description: "Coming Soon",
    icon: FiTrendingUp,
    available: false,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "test-8",
    name: "Skill Test",
    description: "Coming Soon",
    icon: FiAward,
    available: false,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "test-9",
    name: "Leadership Test",
    description: "Coming Soon",
    icon: FiUser,
    available: false,
    color: "from-slate-500 to-gray-500",
  },
  {
    id: "test-10",
    name: "Creativity Test",
    description: "Coming Soon",
    icon: FiStar,
    available: false,
    color: "from-violet-500 to-purple-500",
  },
]

export default function Sidebar({ children }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar */}
      <div
        className={`
        ${isCollapsed ? "w-20" : "w-72"} 
        bg-white/80 backdrop-blur-xl shadow-2xl transition-all duration-300 ease-in-out flex flex-col border-r border-white/20
      `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gradient-to-r from-blue-100 to-purple-100">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Portal Test
                </h1>
                <p className="text-sm text-gray-500 mt-1">Temukan potensi diri Anda</p>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
            >
              {isCollapsed ? (
                <FiChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              ) : (
                <FiChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          {tests.map((test) => {
            const Icon = test.icon
            const isActive = pathname === `/${test.id}`
            const isAvailable = test.available

            return (
              <div key={test.id}>
                {isAvailable ? (
                  <Link
                    href={`/${test.id}`}
                    className={`
                      flex items-center p-4 rounded-2xl transition-all duration-200 group hover:scale-105
                      ${
                        isActive
                          ? `${test.bgColor} ${test.textColor} shadow-lg ${test.borderColor} border-2`
                          : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 text-gray-700 hover:shadow-md"
                      }
                      ${isCollapsed ? "justify-center" : "space-x-4"}
                    `}
                  >
                    <div className={`p-2 rounded-xl bg-gradient-to-r ${test.color} shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{test.name}</div>
                        <div className="text-sm opacity-75 truncate">{test.description}</div>
                      </div>
                    )}
                  </Link>
                ) : (
                  <div
                    className={`
                    flex items-center p-4 rounded-2xl text-gray-400 cursor-not-allowed opacity-60
                    ${isCollapsed ? "justify-center" : "space-x-4"}
                  `}
                  >
                    <div className={`p-2 rounded-xl bg-gradient-to-r ${test.color} opacity-50`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{test.name}</div>
                        <div className="text-sm truncate">{test.description}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gradient-to-r from-blue-100 to-purple-100">
          {!isCollapsed && (
            <div className="text-center">
              <div className="text-xs text-gray-500">© 2025 Portal Test</div>
              <div className="text-xs text-gray-400 mt-1">Powered by Mirach Community</div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
    </div>
  )
}
