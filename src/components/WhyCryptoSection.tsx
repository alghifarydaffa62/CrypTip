'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const comparisons = [
    {
        label: 'Platform cut',
        traditional: '20–30%',
        cryptip: '5%',
        note: 'Transparent on-chain fee'
    },
    {
        label: 'Payout speed',
        traditional: '7–30 days',
        cryptip: 'Instant',
        note: 'Withdraw anytime'
    },
    {
        label: 'Who can receive',
        traditional: 'Verified accounts only',
        cryptip: 'Any wallet address',
        note: 'No KYC, no approval'
    },
    {
        label: 'Transparency',
        traditional: 'Opaque',
        cryptip: 'On-chain',
        note: 'Fully auditable'
    },
]

export default function WhyCryptoSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="features" ref={ref} className="bg-[#0a0a0a] py-28 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <p className="text-[#7C5CFC] text-sm font-medium uppercase tracking-widest mb-4">Why crypto</p>
                    <h2 className="text-4xl font-bold text-white tracking-tight max-w-lg leading-tight">
                        Tipping, without the platform getting in the way.
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="border border-white/8 rounded-2xl overflow-hidden"
                    >
                        <div className="grid grid-cols-3 bg-white/3 border-b border-white/6 text-xs font-medium uppercase tracking-widest">
                            <div className="px-5 py-4 text-white/20"></div>
                            <div className="px-5 py-4 text-white/30 border-l border-white/6">Traditional</div>
                            <div className="px-5 py-4 text-[#7C5CFC] border-l border-white/6">CrypTip</div>
                        </div>

                        {comparisons.map((row, i) => (
                            <motion.div
                                key={row.label}
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.3 + i * 0.08 }}
                                className="grid grid-cols-3 border-b border-white/4 last:border-b-0 group hover:bg-white/2 transition-colors"
                            >
                                <div className="px-5 py-5">
                                    <div className="text-white/50 text-sm">{row.label}</div>
                                    <div className="text-white/20 text-xs mt-0.5">{row.note}</div>
                                </div>
                                <div className="px-5 py-5 border-l border-white/4 flex items-center">
                                    <span className="text-white/30 text-sm font-mono">{row.traditional}</span>
                                </div>
                                <div className="px-5 py-5 border-l border-white/4 flex items-center gap-2">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                                        <circle cx="7" cy="7" r="6.5" stroke="#7C5CFC" strokeOpacity="0.3"/>
                                        <path d="M4.5 7L6.5 9L9.5 5.5" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="text-white text-sm font-medium">{row.cryptip}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex flex-col gap-6"
                    >
                        {[
                            {
                                title: 'Your money, your wallet',
                                desc: 'Tips go directly to your wallet address. No holding periods, no withdrawal minimums, no verification hoops.'
                            },
                            {
                                title: 'Open and auditable',
                                desc: 'Every transaction lives on-chain. Any tip, any fee, any withdrawal — permanently verifiable by anyone.'
                            },
                            {
                                title: 'Global by default',
                                desc: 'ETH has no borders. A viewer in Jakarta can tip a streamer in São Paulo in seconds, with no currency conversion.'
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 12 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="p-6 rounded-2xl border border-white/6 bg-white/2 hover:border-[#7C5CFC]/20 transition-colors duration-300"
                            >
                                <div className="w-8 h-0.5 bg-[#7C5CFC] mb-4" />
                                <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}