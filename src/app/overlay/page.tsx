'use client'

import { TipData } from "@/interface/types";
import { useState } from "react";
import tipAbi from "../../abi/CrypTip.json"
import { formatEther } from "viem";
import { useWatchContractEvent } from "wagmi";
import { motion, AnimatePresence } from 'framer-motion'

export default function OverlayPage() {
    const contractAddress = "0x3512F30BdBd2639850DBF0dB63859e919c4d8E1f" as `0x${string}`
    const [currentTip, setCurrentTip] = useState<TipData | null>(null)

    useWatchContractEvent({
        address: contractAddress,
        abi: tipAbi.abi,
        eventName: 'NewTip',
        onLogs(logs) {
            console.log("🔥 EVENT MASUK:", logs)
            const log = logs[0] as any
            const newTip = log?.args
            if (!newTip) {
                console.warn("⚠️ args kosong")
                return
            }
            setCurrentTip({
                name: newTip.name as string,
                message: newTip.message as string,
                amount: formatEther(newTip.amount as bigint),
            })
            setTimeout(() => setCurrentTip(null), 7000)
        },
        onError(error) {
            console.error("❌ useWatchContractEvent ERROR:", error)
        },
    })

    return (
        <div className="min-h-screen w-full bg-transparent flex items-end justify-start p-8 overflow-hidden">
            <AnimatePresence mode="wait">
                {currentTip && (
                    <motion.div
                        key="tip-popup"
                        initial={{ y: 40, opacity: 0, scale: 0.92 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 20, opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                        className="relative w-90"
                    >
                        <div className="absolute -inset-0.5 rounded-[22px] bg-linear-to-br from-[#7C5CFC] via-[#a78bfa] to-[#7C5CFC] opacity-70 blur-[2px]" />

                        <div className="relative bg-[#0f0f10] rounded-[20px] overflow-hidden">
                            <div className="h-0.75 w-full bg-linear-to-r from-[#7C5CFC] via-[#c4b5fd] to-[#7C5CFC] bg-size-[200%_100%] animate-[shimmer_2s_linear_infinite]" />
                            <div className="px-5 pt-4 pb-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="relative shrink-0">
                                        <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#7C5CFC] to-[#a78bfa] flex items-center justify-center shadow-[0_0_14px_rgba(124,92,252,0.6)]">
                                            <span className="text-white text-base font-black">
                                                {currentTip.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0f0f10]" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-black text-[15px] leading-tight truncate">
                                            {currentTip.name}
                                        </p>
                                        <p className="text-white/40 text-xs font-medium mt-0.5 tracking-wide">
                                            just sent a tip
                                        </p>
                                    </div>

                                    <motion.div
                                        initial={{ scale: 0.7, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.18, type: "spring", stiffness: 300 }}
                                        className="shrink-0 bg-[#7C5CFC] rounded-xl px-3.5 py-2 shadow-[0_0_16px_rgba(124,92,252,0.55)]"
                                    >
                                        <span className="text-white font-black text-sm font-mono tracking-tight">
                                            {currentTip.amount} ETH
                                        </span>
                                    </motion.div>
                                </div>

                                {currentTip.message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.22, duration: 0.3 }}
                                        className="bg-white/6 border border-white/8 rounded-xl px-4 py-3"
                                    >
                                        <p className="text-white/75 text-sm leading-relaxed">
                                            "{currentTip.message}"
                                        </p>
                                    </motion.div>
                                )}
                            </div>

                            <motion.div
                                className="h-0.5 bg-linear-to-r from-[#7C5CFC] to-[#a78bfa]"
                                initial={{ width: '100%' }}
                                animate={{ width: '0%' }}
                                transition={{ duration: 7, ease: 'linear' }}
                            />
                        </div>

                        <style>{`
                            @keyframes shimmer {
                                0% { background-position: 200% 0; }
                                100% { background-position: -200% 0; }
                            }
                        `}</style>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}