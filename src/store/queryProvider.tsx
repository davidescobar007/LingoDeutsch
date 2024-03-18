"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false
      }
   }
})

// eslint-disable-next-line no-undef
const QueryProvider = ({ children }: { children: React.ReactNode }) => {
   return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider
