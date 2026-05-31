import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Deck from './deck/Deck.tsx'
import Lab from './lab/Lab.tsx'

const params = new URLSearchParams(window.location.search)
const view = params.get('view')
if (params.get('still') === '1') document.documentElement.classList.add('still')

createRoot(document.getElementById('root')!).render(
  <StrictMode>{view === 'deck' ? <Deck /> : view === 'lab' ? <Lab /> : <App />}</StrictMode>,
)
