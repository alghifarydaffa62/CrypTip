'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const steps = [
    {
        number: '01',
        title: 'Connect your wallet',
        desc: 'Link MetaMask or any WalletConnect-compatible wallet. No sign-up, no email, no password.',
        detail: 'CrypTip is entirely non-custodial. We never hold your funds or access your private keys — the smart contract handles everything.'
    },
    {
        number: '02',
        title: 'Share your tip link',
        desc: 'Get your unique page at cryptip.app/your-address. Drop it in your stream overlay, bio, or chat.',
        detail: 'Your page is auto-generated from your wallet address. Viewers can find you instantly without you setting up a profile.'
    },
    {
        number: '03',
        title: 'Receive tips live',
        desc: 'Viewers connect their wallet and send ETH directly. An OBS overlay shows every tip in real-time.',
        detail: 'Tips trigger a smart contract event that your stream overlay listens to via WebSocket — the pop-up appears within seconds of confirmation.'
    },
    {
        number: '04',
        title: 'Withdraw anytime',
        desc: 'Your balance accumulates in the contract. Withdraw everything to your wallet whenever you want.',
        detail: 'One transaction pulls your entire balance. Gas fees are minimal on Sepolia; mainnet gas applies on production.'
    },
]

export default function HowItWorksSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [active, setActive] = useState(0)

    return (
        <section id="how-it-works" ref={ref} className="bg-[#0d0d0d] py-28 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <p className="text-[#7C5CFC] text-sm font-medium uppercase tracking-widest mb-4">How it works</p>
                    <h2 className="text-4xl font-bold text-white tracking-tight max-w-lg leading-tight">
                        From zero to live tips in four steps.
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="flex flex-col gap-2">
                        {steps.map((step, i) => (
                            <motion.button
                                key={step.number}
                                initial={{ opacity: 0, x: -16 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.1 + i * 0.08 }}
                                onClick={() => setActive(i)}
                                className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
                                    active === i
                                        ? 'bg-[#7C5CFC]/10 border-[#7C5CFC]/30'
                                        : 'bg-transparent border-white/5 hover:border-white/1 hover:bg-white/2'
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <span className={`text-xs font-mono font-bold mt-0.5 transition-colors duration-300 ${
                                        active === i ? 'text-[#7C5CFC]' : 'text-white/20'
                                    }`}>
                                        {step.number}
                                    </span>
                                    <div>
                                        <div className={`font-semibold text-sm transition-colors duration-300 ${
                                            active === i ? 'text-white' : 'text-white/50'
                                        }`}>
                                            {step.title}
                                        </div>
                                        <div className="text-white/30 text-sm mt-1 leading-relaxed">
                                            {step.desc}
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="lg:sticky lg:top-24"
                    >
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-[#111] border border-white/8 rounded-3xl p-8 min-h-70 flex flex-col justify-between"
                        >
                            <div>
                                <div className="text-6xl font-black text-white/4 font-mono mb-6 select-none">
                                    {steps[active].number}
                                </div>
                                <h3 className="text-white text-xl font-semibold mb-4">{steps[active].title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{steps[active].detail}</p>
                            </div>

                            <div className="flex gap-2 mt-8">
                                {steps.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActive(i)}
                                        className={`h-0.5 rounded-full transition-all duration-300 ${
                                            i === active ? 'bg-[#7C5CFC] w-8' : 'bg-white/10 w-4'
                                        }`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}