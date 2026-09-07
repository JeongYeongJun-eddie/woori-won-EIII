import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import TransferPage from './components/TransferPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='phone'>
        <TransferPage />
      </div>
    </>
  )
}

export default App
