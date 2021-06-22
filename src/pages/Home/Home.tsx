import React, { useMemo, useEffect, useState } from 'react'
import MyWebSocket from 'src/utils/websocket'

/**
 * 主页
 */
export default function Home() {
  const websocket = useMemo(() => {
    const ws = new MyWebSocket('wss://localhost:3001')
    return ws
  }, [])

  const [status, setStatus] = useState('close')
  const [message, setMessage] = useState('')
  const [inputMessage, setInputMessage] = useState('')

  useEffect(() => {
    websocket.addEventListener('open', () => {
      setStatus('open')
    })
    websocket.addEventListener('message', (event) => {
      setMessage(event.data)
    })
    websocket.addEventListener('close', () => {
      setStatus('close')
    })
  }, [websocket])

  return (
    <main>
      Home
      <div>status: {status}</div>
      <div>message: {message}</div>
      <input
        type="text"
        onChange={(event) => {
          setInputMessage(event.target.value)
        }}
      ></input>
      <button
        onClick={() => {
          websocket.send(inputMessage)
        }}
      >
        send
      </button>
      <button
        onClick={() => {
          websocket.reconnect()
        }}
      >
        reconnect
      </button>
    </main>
  )
}
