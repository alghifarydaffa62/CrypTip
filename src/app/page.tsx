'use client'

import { useConnect, useConnection, useConnectors, useDisconnect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

function App() {
  const connection = useConnection()
  const { connect, status, error } = useConnect()
  const connectors = useConnectors()
  const { disconnect } = useDisconnect()

  return (
    <>
      <div>
        <h1 className='text-blue-900 text-3xl'>CrypTip</h1>
      </div>

      <ConnectButton/>

    </>
  )
}

export default App
