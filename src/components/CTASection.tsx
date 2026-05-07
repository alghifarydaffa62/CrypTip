'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useRouter } from 'next/navigation'
import { useConnection } from 'wagmi'

export default function CTASection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const { isConnected } = useConnection()

    const { openConnectModal } = useConnectModal()
    const router = useRouter()

    const handleConnect = (e: React.MouseEvent) => {
        e.preventDefault() 

        if (isConnected) {
            router.push('/dashboard')
        } else {
            if (openConnectModal) {
                openConnectModal()
            }
        }
    }

    return (
        <>
            <section ref={ref} className="bg-[#0a0a0a] py-28 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 rounded-full px-4 py-1.5 mb-10">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFC]" />
                            <span className="text-[#7C5CFC] text-xs font-medium">No sign-up required</span>
                        </div>

                        <h2 className="text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.08] mb-6">
                            Ready to go
                            <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#7C5CFC] to-[#a78bfa]">
                                on-chain?
                            </span>
                        </h2>

                        <p className="text-white/35 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                            Connect your wallet and get your tip page live in under a minute.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                onClick={handleConnect}
                                href="/dashboard"
                                className="px-8 py-3.5 bg-[#7C5CFC] hover:bg-[#6d4ef0] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_32px_rgba(124,92,252,0.45)] text-sm"
                            >
                                Start using CrypTip
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3.5 bg-white/5 hover:bg-white/8 text-white/60 hover:text-white/80 font-semibold rounded-xl border border-white/8 transition-all duration-200 text-sm flex items-center gap-2"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M7 1C3.686 1 1 3.686 1 7c0 2.652 1.719 4.9 4.103 5.695.3.056.41-.13.41-.288 0-.143-.005-.52-.008-1.02-1.67.363-2.022-.805-2.022-.805-.273-.694-.667-0.879-.667-.879-.545-.373.041-.365.041-.365.603.042.92.619.92.619.535.917 1.404.652 1.746.498.055-.387.21-.652.38-.802-1.332-.151-2.732-.666-2.732-2.965 0-.655.233-1.19.616-1.61-.062-.151-.267-.762.058-1.588 0 0 .504-.161 1.65.615A5.75 5.75 0 017 4.97c.51.002 1.022.069 1.502.203 1.145-.776 1.648-.615 1.648-.615.326.826.121 1.437.059 1.588.384.42.615.955.615 1.61 0 2.306-1.403 2.812-2.74 2.96.216.185.407.551.407 1.111 0 .802-.007 1.449-.007 1.647 0 .16.108.347.413.288C11.282 11.898 13 9.65 13 7c0-3.314-2.686-6-6-6z" fill="currentColor"/>
                                </svg>
                                View on GitHub
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <footer className="bg-[#0a0a0a] border-t border-white/4 px-6 py-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-[#7C5CFC] flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                <path d="M7 1L12 4V10L7 13L2 10V4L7 1Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="text-white/40 text-sm font-medium">CrypTip</span>
                        <span className="text-white/15 text-xs ml-2">Built on Ethereum</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="#" className="text-white/20 hover:text-white/50 text-xs transition-colors">Contract</a>
                        <a href="#" className="text-white/20 hover:text-white/50 text-xs transition-colors">GitHub</a>
                        <a href="#" className="text-white/20 hover:text-white/50 text-xs transition-colors">Docs</a>
                    </div>

                    <p className="text-white/15 text-xs">
                        Not financial advice. Tip responsibly.
                    </p>
                </div>
            </footer>
        </>
    )
}