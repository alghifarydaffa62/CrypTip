'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled 
                ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/6' 
                : 'bg-transparent'
        }`}>
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#7C5CFC] flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1L12 4V10L7 13L2 10V4L7 1Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                            <path d="M7 1V13M2 4L12 10M12 4L2 10" stroke="white" strokeWidth="1" strokeOpacity="0.4" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <span className="text-white font-semibold text-[15px] tracking-tight">CrypTip</span>
                </Link>

                <ul className="hidden md:flex items-center gap-1">
                    {['Features', 'How it works', 'For Streamers'].map((item) => (
                        <li key={item}>
                            <a 
                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="px-4 py-2 text-sm text-white/50 hover:text-white/90 rounded-lg hover:bg-white/6 transition-all duration-200"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3">
                    <ConnectButton 
                        showBalance={false}
                        chainStatus="icon"
                        accountStatus="avatar"
                    />
                </div>
            </div>
        </nav>
    )
}