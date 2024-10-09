import '@/app/globals.css'

import { GeistSans } from 'geist/font/sans'

import { AppProvider } from '@/components/app-provider'
import { Header } from '@/components/header'
import { seo } from '@/lib/seo'
import { cn } from '@/lib/utils'

export const metadata = seo({})

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <body className={cn('min-h-dvh font-sans', GeistSans.variable)}>
      <AppProvider>
        <Header />
        {children}
      </AppProvider>
    </body>
  </html>
)

export default RootLayout
