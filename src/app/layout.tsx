import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TestProvider } from "@/contexts/TestContext"
import Sidebar from "@/components/Sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portal Test",
  description: "Platform tes minat dan bakat untuk mengetahui potensi diri",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <TestProvider>
          <Sidebar>{children}</Sidebar>
        </TestProvider>
      </body>
    </html>
  )
}
