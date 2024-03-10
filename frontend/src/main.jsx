import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './global.css'
import './normalize.css'
import { SpeedInsights } from "@vercel/speed-insights/next"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
      <SpeedInsights />
      <App />
    </div>
  </React.StrictMode>,
)
