import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ToggleModeProvider } from './context/ModeProvider.tsx';
import { AlertProvider } from './context/AlertProvider.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import { CartProvider } from './context/CartProvider.tsx';
import { queryClient } from './api/config.ts';
import { QueryClientProvider } from '@tanstack/react-query';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider 
            client={queryClient}
        >
            <AuthProvider>
                <ToggleModeProvider>
                        <AlertProvider>
                            <CartProvider>
                                 <App />
                            </CartProvider>
                        </AlertProvider>
                </ToggleModeProvider>
            </AuthProvider>
        </QueryClientProvider>
  </StrictMode>,
)
