import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-tooltip/dist/react-tooltip.css'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import './index.css'
// import "flowbite"
const queryClient = new QueryClient({defaultOptions:{queries:{gcTime:500000,refetchOnWindowFocus:false}}})

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>

  <StrictMode>
    <App />
  </StrictMode>
  </QueryClientProvider>
)
