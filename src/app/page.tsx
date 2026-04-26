'use client'

import Navbar from '@/components/Navbar'
import { useEffect } from 'react'
import { useConnections } from 'wagmi'
import { useRouter } from 'next/navigation'

function App() {
  const connection = useConnections()
  const router = useRouter()

  useEffect(() => {
    if(connection.length > 0) {
      router.push('/dashboard')
    }
  }, [connection, router])

  return (
    <>
      <div className='my-5'>
        <Navbar/>
      </div>
    </>
  )
}

export default App