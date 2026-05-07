'use client'

import { useEffect } from 'react'
import { useConnections } from 'wagmi'
import { useRouter } from 'next/navigation'
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/Hero"
import LiveTickerSection from "@/components/LiveTickerSection"
import WhyCryptoSection from "@/components/WhyCryptoSection"
import HowItWorksSection from "@/components/HowItWorksSection"
import StatsSection from "@/components/StatsSection"
import ForUsersSection from "@/components/ForUserSection"
import CTASection from "@/components/CTASection"

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
      <div className='bg-[#0a0a0a] min-h-screen'>
          <Navbar />
            <HeroSection />
            <LiveTickerSection />
            <WhyCryptoSection />
            <HowItWorksSection />
            <StatsSection />
            <ForUsersSection />
            <CTASection />
      </div>
    </>
  )
}

export default App