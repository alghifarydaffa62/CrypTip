'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useRouter } from 'next/navigation'
import { useConnection } from 'wagmi'

const streamerPoints = [
    { title: 'One link, all tips', desc: 'Share your wallet address — viewers land on your tip page instantly.' },
    { title: 'OBS overlay included', desc: 'Animated pop-ups appear on your stream the moment a tip confirms.' },
    { title: 'Withdraw on your terms', desc: 'Pull your balance to your wallet whenever you want, no minimum.' },
    { title: 'Full earnings history', desc: 'Every tip is on-chain. Exportable, auditable, yours forever.' },
]

const viewerPoints = [
    { title: 'No account needed', desc: 'Connect your wallet, type a message, send. Done.' },
    { title: 'Tip any amount', desc: 'Send as little as 0.001 ETH. No minimums, no maximums.' },
    { title: 'Message lives on-chain', desc: 'Your shoutout is permanently recorded on the blockchain.' },
    { title: 'Support direct', desc: '95% of your tip reaches the streamer. No middlemen.' },
]

export default function ForUsersSection() {
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
        <section id="for-streamers" ref={ref} className="bg-[#0d0d0d] py-28 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-[#7C5CFC] text-sm font-medium uppercase tracking-widest mb-4">Built for both sides</p>
                    <h2 className="text-4xl font-bold text-white tracking-tight leading-tight">
                        Whether you stream or watch.
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="rounded-3xl border border-white/8 bg-white/2 p-8 flex flex-col"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 rounded-lg bg-[#7C5CFC]/15 border border-[#7C5CFC]/20 flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <circle cx="7" cy="7" r="3" fill="#7C5CFC"/>
                                    <circle cx="7" cy="7" r="6" stroke="#7C5CFC" strokeOpacity="0.3" strokeWidth="1"/>
                                </svg>
                            </div>
                            <div>
                                <div className="text-white font-semibold text-sm">For Streamers</div>
                                <div className="text-white/30 text-xs">Monetize your stream with crypto</div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 flex-1">
                            {streamerPoints.map((pt, i) => (
                                <motion.div
                                    key={pt.title}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.3 + i * 0.07 }}
                                    className="flex gap-4"
                                >
                                    <div className="w-5 h-5 rounded-full border border-[#7C5CFC]/30 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#7C5CFC]" />
                                    </div>
                                    <div>
                                        <div className="text-white/80 text-sm font-medium">{pt.title}</div>
                                        <div className="text-white/30 text-xs mt-0.5 leading-relaxed">{pt.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.a
                            onClick={handleConnect}
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.6 }}
                            href="/dashboard"
                            className="mt-8 w-full py-3 bg-[#7C5CFC] hover:bg-[#6d4ef0] text-white text-sm font-semibold rounded-xl text-center transition-all duration-200 hover:shadow-[0_0_20px_rgba(124,92,252,0.35)]"
                        >
                            Set up your tip page
                        </motion.a>
                    </motion.div>

                    <motion.div
                        onClick={handleConnect}
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.25 }}
                        className="rounded-3xl border border-white/8 bg-white/2 p-8 flex flex-col"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M2 7C2 7 4 3 7 3C10 3 12 7 12 7C12 7 10 11 7 11C4 11 2 7 2 7Z" stroke="white" strokeOpacity="0.5" strokeWidth="1.2"/>
                                    <circle cx="7" cy="7" r="1.5" fill="white" fillOpacity="0.5"/>
                                </svg>
                            </div>
                            <div>
                                <div className="text-white font-semibold text-sm">For Viewers</div>
                                <div className="text-white/30 text-xs">Show your support on-chain</div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 flex-1">
                            {viewerPoints.map((pt, i) => (
                                <motion.div
                                    key={pt.title}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.35 + i * 0.07 }}
                                    className="flex gap-4"
                                >
                                    <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                                    </div>
                                    <div>
                                        <div className="text-white/80 text-sm font-medium">{pt.title}</div>
                                        <div className="text-white/30 text-xs mt-0.5 leading-relaxed">{pt.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.a
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.65 }}
                            href="/tip"
                            className="mt-8 w-full py-3 bg-white/6 hover:bg-white/1 text-white/80 text-sm font-semibold rounded-xl text-center border border-white/8 transition-all duration-200"
                        >
                            Send a tip now
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}