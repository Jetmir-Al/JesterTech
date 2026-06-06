import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ToggleModeProvider } from './context/ModeProvider.tsx';
import { AlertProvider } from './context/AlertProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { AuthProvider } from './context/AuthProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
            <ToggleModeProvider>
                <AlertProvider>
                    <App />
                </AlertProvider>
            </ToggleModeProvider>
            </AuthProvider>
        </QueryClientProvider>
  </StrictMode>,
)
