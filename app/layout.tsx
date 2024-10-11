import '@/app/globals.css'

import { GeistSans } from 'geist/font/sans'

import { AppProvider } from '@/components/app-provider'
import { Header } from '@/components/header'
import { SessionProvider } from '@/hooks/use-session'
import { seo } from '@/lib/seo'
import { cn } from '@/lib/utils'
import { auth } from '@/server/auth'

export const metadata = seo({})

const RootLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const session = await auth()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-dvh font-sans', GeistSans.variable)}>
        <AppProvider>
          <SessionProvider session={session}>
            <Header />
            {children}
          </SessionProvider>
        </AppProvider>
      </body>
    </html>
  )
}

export default RootLayout
