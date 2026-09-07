import { useEffect, useState } from 'react'
import './Toast.css'

function Toast({ trigger }) {
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    if (!trigger) return
    setText(trigger.message)
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 1800)
    return () => clearTimeout(timer)
  }, [trigger])

  return (
    <div className={`toast ${visible ? 'show' : ''}`} role="status" aria-live="polite">
      {text}
    </div>
  )
}

export default Toast
