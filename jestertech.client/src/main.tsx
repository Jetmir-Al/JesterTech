import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ToggleModeProvider } from './context/ModeProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ToggleModeProvider>
            <App />
        </ToggleModeProvider>
  </StrictMode>,
)
