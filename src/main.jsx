import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import FirebaseAuthProvider from './FirebaseAuthProvider/FirebaseAuthProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import Router from './Routes/Routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <FirebaseAuthProvider>
        <RouterProvider router={Router} />
      </FirebaseAuthProvider>
    </QueryClientProvider>
    
  </React.StrictMode>,
)
