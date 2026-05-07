'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const floatingTips = [
    { name: "alex.eth", amount: "0.05", message: "Keep it up, legend!", avatar: "A" },
    { name: "vitalik_fan", amount: "0.12", message: "Best stream ever!", avatar: "V" },
    { name: "0x4f2a", amount: "0.008", message: "gm gm", avatar: "0" },
    { name: "web3_bro", amount: "0.25", message: "LFG!!!", avatar: "W" },
]

function TipCard({ tip, delay }: { tip: typeof floatingTips[0], delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="bg-[#111111] border border-white/8 rounded-2xl p-4 flex items-center gap-3 min-w-60 shadow-xl"
        >
            <div className="w-9 h-9 rounded-full bg-[#7C5CFC]/20 border border-[#7C5CFC]/30 flex items-center justify-center text-[#7C5CFC] text-sm font-semibold shrink-0">
                {tip.avatar}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <span className="text-white/70 text-xs font-medium truncate">{tip.name}</span>
                    <span className="text-[#7C5CFC] text-xs font-bold font-mono shrink-0">{tip.amount} ETH</span>
                </div>
                <p className="text-white/40 text-xs mt-0.5 truncate">{tip.message}</p>
            </div>
        </motion.div>
    )
}

export default function HeroSection() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            <div className="absolute inset-0 bg-[#0a0a0a]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(124,92,252,0.15),transparent)]" />
                <div 
                    className="absolute inset-0 opacity-[0.015]"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 rounded-full px-4 py-1.5 mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFC] animate-pulse" />
                            <span className="text-[#7C5CFC] text-xs font-medium">Live on Sepolia Testnet</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                            className="text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6"
                        >
                            Support creators
                            <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#7C5CFC] to-[#a78bfa]">
                                on-chain.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-white/40 text-lg leading-relaxed mb-10 max-w-md"
                        >
                            CrypTip lets you send tips to your favorite streamers using ETH — instantly, borderless, no platform cut beyond a transparent 5% fee.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex flex-wrap gap-3"
                        >
                            <a
                                href="/dashboard"
                                className="px-6 py-3 bg-[#7C5CFC] hover:bg-[#6d4ef0] text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_24px_rgba(124,92,252,0.4)]"
                            >
                                Connect Your Wallet
                            </a>
                            <a
                                href="#how-it-works"
                                className="px-6 py-3 bg-white/6 hover:bg-white/6 text-white/80 text-sm font-semibold rounded-xl border border-white/8 transition-all duration-200"
                            >
                                See how it works
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="flex items-center gap-6 mt-10 pt-10 border-t border-white/6"
                        >
                            {[
                                { label: 'Platform fee', value: '5%' },
                                { label: 'Settlement', value: 'Instant' },
                                { label: 'Network', value: 'Ethereum' },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-white font-bold text-lg">{stat.value}</div>
                                    <div className="text-white/30 text-xs mt-0.5">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="hidden lg:block relative h-105">
                        {mounted && floatingTips.map((tip, i) => (
                            <motion.div
                                key={tip.name}
                                className="absolute"
                                style={{
                                    top: `${[10, 30, 52, 70][i]}%`,
                                    left: `${[5, 30, 8, 35][i]}%`,
                                }}
                                animate={{
                                    y: [0, -8, 0],
                                }}
                                transition={{
                                    duration: 3 + i * 0.7,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.5,
                                }}
                            >
                                <TipCard tip={tip} delay={0.4 + i * 0.15} />
                            </motion.div>
                        ))}

                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(124,92,252,0.08),transparent)] pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
        </section>
    )
}