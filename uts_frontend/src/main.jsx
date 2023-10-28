import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    const test = async () => {
      const response = await fetch('http://127.0.0.1:6543/products')
      const data = await response.json()
      console.log(data)
    }
    test();
  }, []);
  return (
    <div>
      <h1>Test</h1>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)