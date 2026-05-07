'use client'

import { useConnection } from "wagmi"
import { TotalBalanceBox, TotalEarnedBox, TotalTippedBox } from "@/components/StatCards"
import useUserStats from "../hooks/useUserStats"
import { motion } from "framer-motion"

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] as const }
} as any)

export default function DashboardPage() {
    const { address } = useConnection()
    const { totalBalance, totalEarned, totalTipped, isLoading } = useUserStats()

    const shortAddress = address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : null

    return (
        <div className="max-w-4xl">
            <motion.div {...fadeUp(0)} className="mb-8">
                <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs text-gray-400 font-medium">Logged in as</p>
                    <code className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-mono">
                        {shortAddress}
                    </code>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Overview</h1>
                <p className="text-sm text-gray-400 mt-1">Your earnings and tipping stats at a glance.</p>
            </motion.div>

            <motion.div {...fadeUp(0.08)} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                <TotalEarnedBox value={totalEarned} isLoading={isLoading} />
                <TotalTippedBox value={totalTipped} isLoading={isLoading} />
                <TotalBalanceBox value={totalBalance} isLoading={isLoading} />
            </motion.div>

            <motion.div {...fadeUp(0.16)}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Quick actions</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                        href="/dashboard/link"
                        className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#7C5CFC]/30 hover:shadow-sm transition-all duration-200"
                    >
                        <div className="w-10 h-10 rounded-xl bg-[#7C5CFC]/10 flex items-center justify-center shrink-0 group-hover:bg-[#7C5CFC]/15 transition-colors">
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                                <path d="M6.5 9.5L9.5 6.5M7 4.5L7.793 3.707a3 3 0 114.243 4.243L11.5 8.5M8.5 11.5l-.793.793a3 3 0 11-4.243-4.243L4 7.5" stroke="#7C5CFC" strokeWidth="1.4" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-800 group-hover:text-[#7C5CFC] transition-colors">Share tip link</div>
                            <div className="text-xs text-gray-400 mt-0.5">Get your unique streamer page</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-auto text-gray-300 group-hover:text-[#7C5CFC] transition-colors">
                            <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>

                    <a
                        href="/dashboard/withdraw"
                        className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#7C5CFC]/30 hover:shadow-sm transition-all duration-200"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-gray-100 transition-colors">
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                                <path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="#6b7280" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-800">Withdraw balance</div>
                            <div className="text-xs text-gray-400 mt-0.5">Pull your ETH to your wallet</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-auto text-gray-300 group-hover:text-gray-400 transition-colors">
                            <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                </div>
            </motion.div>
        </div>
    )
}