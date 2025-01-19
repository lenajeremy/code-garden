import { Toaster } from "@/components/ui/sonner"
import { QuokkaProvider } from "quokkajs"
import { ThemeProvider } from "next-themes"
import MainContext from "@/lib/main-context"
import { jwtDecode } from "jwt-decode"
import { headers } from 'next/headers'
import '@/index.css'

export const metadata = {
  title: 'Code Garden',
  description: 'Your coding playground',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  let userDetails = null

  // Move token handling to client component since localStorage is not available on server
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("TOKEN")
    if (token) {
      userDetails = jwtDecode(token)["user"]
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <MainContext.Provider
            value={{
              userDetails,
              updateUserDetails: () => {},
            }}
          >
            <QuokkaProvider getState={() => {}}>
              <Toaster richColors position="top-center" />
              {children}
            </QuokkaProvider>
          </MainContext.Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}