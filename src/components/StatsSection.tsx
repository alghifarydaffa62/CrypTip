'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function CountUp({ target, suffix = '' }: { target: number, suffix?: string }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    useEffect(() => {
        if (!inView) return
        const duration = 1500
        const steps = 50
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
            current += increment
            if (current >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.floor(current))
            }
        }, duration / steps)
        return () => clearInterval(timer)
    }, [inView, target])

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const stats = [
    { label: 'Total tips sent', value: 1284, suffix: '+', prefix: '' },
    { label: 'ETH tipped', value: 42, suffix: ' ETH', prefix: '' },
    { label: 'Streamers onboard', value: 87, suffix: '+', prefix: '' },
    { label: 'Countries reached', value: 24, suffix: '', prefix: '' },
]

export default function StatsSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section ref={ref} className="bg-[#0a0a0a] py-20 px-6 border-y border-white/4]">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <p className="text-white/20 text-sm">Growing on testnet. Ready for mainnet.</p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/4 rounded-2xl overflow-hidden border border-white/4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 12 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.08 }}
                            className="bg-[#0a0a0a] px-8 py-10 flex flex-col gap-2"
                        >
                            <div className="text-4xl font-bold text-white tracking-tight font-mono">
                                {stat.prefix}
                                <CountUp target={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-white/30 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}