'use client'

import { useParams } from 'next/navigation'
import TipForm from '@/components/TipForm'
import { Address } from 'viem'
import { motion, AnimatePresence } from 'framer-motion'
import { useConnection } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function TipPage() {
    const params = useParams()
    const streamerAddress = params.address as Address
    const { isConnected } = useConnection()

    return (
        <div className="min-h-screen bg-[#f7f7f8] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative">
                    <div className="h-1 bg-linear-to-r from-[#7C5CFC] to-[#a78bfa]" />

                    <div className="p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-[#7C5CFC]/10 flex items-center justify-center">
                                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                                        <path d="M7 1L12 4V10L7 13L2 10V4L7 1Z" stroke="#7C5CFC" strokeWidth="1.5" strokeLinejoin="round"/>
                                        <path d="M7 1V13M2 4L12 10M12 4L2 10" stroke="#7C5CFC" strokeWidth="0.8" strokeOpacity="0.4" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-base font-bold text-gray-900">Send a tip</h1>
                                    <p className="text-xs text-gray-400 mt-0.5">via CrypTip on Ethereum</p>
                                </div>
                            </div>

                            <div className="shrink-0">
                                <ConnectButton
                                    showBalance={false}
                                    chainStatus="icon"
                                    accountStatus="avatar"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 block mb-2">
                                Sending to
                            </label>
                            <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                                <div className="w-6 h-6 rounded-full bg-[#7C5CFC]/15 flex items-center justify-center shrink-0">
                                    <div className="w-2 h-2 rounded-full bg-[#7C5CFC]" />
                                </div>
                                <code className="text-sm font-mono text-gray-600 truncate">
                                    {streamerAddress || 'Loading...'}
                                </code>
                            </div>
                        </div>

                        <div className="relative">
                            <div className={`transition-all duration-300 ${!isConnected ? 'blur-sm pointer-events-none select-none' : ''}`}>
                                <TipForm streamerAddress={streamerAddress} />
                            </div>

                            <AnimatePresence>
                                {!isConnected && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.25 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl px-6 py-6 text-center shadow-lg max-w-xs w-full mx-auto">
                                            <div className="w-10 h-10 rounded-2xl bg-[#7C5CFC]/10 flex items-center justify-center mx-auto mb-4">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                    <rect x="1" y="6" width="16" height="11" rx="2" stroke="#7C5CFC" strokeWidth="1.4"/>
                                                    <path d="M5 6V4.5a4 4 0 018 0V6" stroke="#7C5CFC" strokeWidth="1.4" strokeLinecap="round"/>
                                                    <circle cx="9" cy="11.5" r="1.5" fill="#7C5CFC"/>
                                                </svg>
                                            </div>
                                            <p className="text-sm font-semibold text-gray-800 mb-1">Wallet not connected</p>
                                            <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                                                Connect your wallet to send a tip to this streamer.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-400 mt-4">
                    95% reaches the streamer · 5% platform fee · On-chain
                </p>
            </motion.div>
        </div>
    )
}