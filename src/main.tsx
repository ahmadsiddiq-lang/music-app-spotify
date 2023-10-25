import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './index.css'
import { containerTheme } from './utility/custom/customeTime.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



const theme = extendTheme({ containerTheme })
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider disableGlobalStyle theme={theme} toastOptions={{ defaultOptions: { position: 'top' } }}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
