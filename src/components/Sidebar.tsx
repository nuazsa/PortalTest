"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
  FiMenu,
  FiX,
} from "react-icons/fi"

interface SidebarProps {
  children: React.ReactNode
}

const tests = [
    // ... (data tes tetap sama)
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
    available: false,
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

interface SidebarContentProps {
  isCollapsed: boolean;
  onClose?: () => void;
}

export default function Sidebar({ children }: SidebarProps) {
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const SidebarContent = ({ isCollapsed, onClose }: SidebarContentProps) => (
    <div
      className={`
      ${isCollapsed ? "w-20" : "w-72"}
      bg-white/90 backdrop-blur-xl shadow-2xl transition-all duration-300 ease-in-out flex flex-col border-r border-gray-200/80 h-full
    `}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Portal Test
              </h1>
            </Link>
          )}
          {/* Tombol Close untuk Mobile */}
          {onClose && (
             <button
              onClick={onClose}
              className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-100 active:scale-95 transition-all lg:hidden"
            >
              <FiX className="w-5 h-5 text-gray-600" />
            </button>
          )}
          {/* Tombol Collapse untuk Desktop */}
          <button
            onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
            className="p-2 rounded-xl shadow-md border border-gray-200 hover:bg-gray-100 transition-colors duration-200 hidden lg:block"
          >
            {isDesktopCollapsed ? <FiChevronRight className="w-5 h-5 text-gray-700" /> : <FiChevronLeft className="w-5 h-5 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
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
                    flex items-center p-3 rounded-xl transition-all duration-200 group
                    ${
                      isActive
                        ? `${test.bgColor} ${test.textColor} shadow-md ${test.borderColor} border`
                        : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-200/80 shadow-sm hover:shadow-md"
                    }
                    ${isCollapsed ? "justify-center" : "space-x-4"}
                  `}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${test.color} shadow-sm`}>
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
                  flex items-center p-3 rounded-xl text-gray-400 cursor-not-allowed opacity-70 bg-gray-50
                  ${isCollapsed ? "justify-center" : "space-x-4"}
                `}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${test.color} opacity-50`}>
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
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed && (
          <div className="text-center">
            <div className="text-xs text-gray-500">© 2025 Portal Test</div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar untuk Desktop */}
      <div className="hidden lg:block">
        <SidebarContent isCollapsed={isDesktopCollapsed} />
      </div>

      {/* Sidebar untuk Mobile (Overlay) */}
      <div
        className={`fixed inset-0 z-40 transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent isCollapsed={false} onClose={() => setIsMobileOpen(false)} />
      </div>

      {/* Overlay Gelap untuk Mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Mobile dengan Tombol Hamburger */}
        <div className="lg:hidden p-4 bg-white/80 backdrop-blur-sm border-b flex items-center">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 bg-white rounded-xl shadow-md border border-gray-200 hover:bg-gray-100 active:scale-95 transition-all"
          >
            <FiMenu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}