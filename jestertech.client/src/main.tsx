import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ToggleModeProvider } from './context/ModeProvider.tsx';
import { AlertProvider } from './context/AlertProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ToggleModeProvider>
            <AlertProvider>
            <App />
            </AlertProvider>
        </ToggleModeProvider>
  </StrictMode>,
)
