import { createRoot } from 'react-dom/client';
import { App, AppProviders } from './app';
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <App />
  </AppProviders>,
)
