'use client'

import { motion } from 'framer-motion'

const ticks = [
    { name: "alex.eth", amount: "0.05 ETH", to: "cozy_dev" },
    { name: "0x9f3a", amount: "0.01 ETH", to: "nightcoder" },
    { name: "vitalik_fan", amount: "0.12 ETH", to: "streamer99" },
    { name: "web3bro.eth", amount: "0.25 ETH", to: "techgirl" },
    { name: "anon_0x4", amount: "0.008 ETH", to: "cozy_dev" },
    { name: "cryptowhale", amount: "1.0 ETH", to: "nightcoder" },
    { name: "defi_dan", amount: "0.033 ETH", to: "streamer99" },
    { name: "satoshi_jr", amount: "0.07 ETH", to: "techgirl" },
]

function TickItem({ item }: { item: typeof ticks[0] }) {
    return (
        <div className="flex items-center gap-2 px-5 py-2.5 mx-2 bg-white/3 border border-white/6 rounded-xl shrink-0">
            <span className="text-white/30 text-xs font-mono">{item.name}</span>
            <span className="text-white/15 text-xs">sent</span>
            <span className="text-[#7C5CFC] text-xs font-bold font-mono">{item.amount}</span>
            <span className="text-white/15 text-xs">to</span>
            <span className="text-white/50 text-xs font-medium">{item.to}</span>
        </div>
    )
}

export default function LiveTickerSection() {
    const doubled = [...ticks, ...ticks]

    return (
        <section className="bg-[#0a0a0a] py-8 border-y border-white/4 overflow-hidden relative">
            <div className="flex items-center gap-3 mb-4 px-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/20 text-xs font-medium uppercase tracking-widest">Live tips</span>
            </div>

            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-klinear-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        duration: 28,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {doubled.map((item, i) => (
                        <TickItem key={i} item={item} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}