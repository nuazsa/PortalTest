import Link from "next/link"
import { FiArrowRight, FiUser, FiActivity, FiStar, FiTrendingUp, FiZap, FiHeart } from "react-icons/fi"

export default function HomePage() {
  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto p-8">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl -z-10"></div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Temukan Minat dan Bakat Anda
          </h1>
          <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Platform tes psikologi modern untuk membantu Anda mengenal diri lebih baik dan menemukan jalur karir yang
            tepat
          </p>
          <div className="flex justify-center space-x-4">
            <div className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-lg">
              ✨ Gratis & Akurat
            </div>
            <div className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-medium shadow-lg">
              🎯 Hasil Instan
            </div>
            <div className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-medium shadow-lg">
              🔬 Berbasis Sains
            </div>
          </div>
        </div>

        {/* Available Tests */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg mr-4">
                  <FiUser className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">RIASEC Test</h2>
                  <p className="text-blue-600 font-medium">Tes Minat Karir</p>
                </div>
              </div>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Tes minat karir berdasarkan teori Holland untuk mengetahui bidang pekerjaan yang sesuai dengan
                kepribadian dan minat Anda.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">15 menit</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Mudah</span>
                </div>
                <Link
                  href="/riasec"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                >
                  Mulai Tes
                  <FiArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg mr-4">
                  <FiActivity className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">MBTI Test</h2>
                  <p className="text-purple-600 font-medium">Tes Kepribadian</p>
                </div>
              </div>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Tes kepribadian Myers-Briggs untuk memahami cara Anda memproses informasi dan membuat keputusan dalam
                hidup.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    20 menit
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                    Sedang
                  </span>
                </div>
                <Link
                  href="/mbti"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                >
                  Mulai Tes
                  <FiArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 blur-3xl -z-10"></div>
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 text-center shadow-2xl border border-white/20">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg">
                <FiStar className="w-12 h-12 text-white" />
              </div>
            </div>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Tes Lainnya Segera Hadir
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Kami sedang mengembangkan lebih banyak tes untuk membantu Anda mengenal diri lebih baik
            </p>

            {/* Preview of upcoming tests */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { name: "Big Five", icon: FiStar, color: "from-emerald-500 to-teal-500" },
                { name: "EQ Test", icon: FiHeart, color: "from-rose-500 to-pink-500" },
                { name: "IQ Test", icon: FiZap, color: "from-yellow-500 to-orange-500" },
                { name: "Career Test", icon: FiTrendingUp, color: "from-indigo-500 to-purple-500" },
              ].map((test, index) => (
                <div key={index} className="p-4 bg-white/40 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${test.color} shadow-lg mx-auto w-fit mb-3`}>
                    <test.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-gray-700">{test.name}</div>
                  <div className="text-xs text-gray-500 mt-1">Coming Soon</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="inline-block px-8 py-4 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 rounded-2xl font-semibold shadow-lg">
                🚀 Launching Soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
