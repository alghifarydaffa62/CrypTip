'use client'

import { useConnection } from "wagmi"
import { useState, useEffect } from "react"
import { Copy, ExternalLink, Check } from 'lucide-react'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] as const }
} as any)

export default function LinkPage() {
    const { address: userAddress } = useConnection()
    const [baseUrl, setBaseUrl] = useState('')
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        setBaseUrl(window.location.origin)
    }, [])

    const shareLink = `${baseUrl}/tip/${userAddress}`

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="max-w-2xl">
            <motion.div {...fadeUp(0)} className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Your tip link</h1>
                <p className="text-sm text-gray-400 mt-1">
                    Share this link in your stream, bio, or anywhere your audience can find it.
                </p>
            </motion.div>

            <motion.div {...fadeUp(0.08)} className="bg-white border border-gray-100 rounded-2xl p-6 mb-4">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 block mb-3">
                    Your personal tip link
                </label>

                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4">
                    <code className="text-sm text-gray-700 truncate flex-1 font-mono">
                        {userAddress ? shareLink : 'Connect wallet to generate your link'}
                    </code>
                    <button
                        onClick={copyToClipboard}
                        disabled={!userAddress}
                        className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                            copied
                                ? 'bg-green-50 text-green-600 border border-green-200'
                                : 'bg-[#7C5CFC]/10 text-[#7C5CFC] border border-[#7C5CFC]/20 hover:bg-[#7C5CFC]/15'
                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                        {copied
                            ? <><Check size={13} /> Copied</>
                            : <><Copy size={13} /> Copy</>
                        }
                    </button>
                </div>

                <a
                    href={shareLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        userAddress
                            ? 'bg-[#7C5CFC] text-white hover:bg-[#6d4ef0] hover:shadow-[0_0_20px_rgba(124,92,252,0.3)]'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
                    }`}
                >
                    Preview your tip page <ExternalLink size={14} />
                </a>
            </motion.div>

            <motion.div {...fadeUp(0.16)} className="bg-white border border-gray-100 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">How to use this link</h3>
                <div className="flex flex-col gap-3">
                    {[
                        { step: '01', text: 'Add it to your Twitch panel, YouTube description, or Instagram bio.' },
                        { step: '02', text: 'Paste it into your OBS stream overlay as a browser source.' },
                        { step: '03', text: 'Tips go straight to your balance — withdraw anytime.' },
                    ].map((item) => (
                        <div key={item.step} className="flex items-start gap-4">
                            <span className="text-[10px] font-mono font-bold text-[#7C5CFC] bg-[#7C5CFC]/10 px-2 py-1 rounded-md shrink-0 mt-0.5">
                                {item.step}
                            </span>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}