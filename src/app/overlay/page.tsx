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
        <div className="min-h-screen w-full bg-transparent flex items-end justify-center pb-20 overflow-hidden">
            
            <AnimatePresence mode="wait">
                {currentTip && (
                    <motion.div 
                        key="tip-popup"
                        initial={{ y: 100, opacity: 0, scale: 0.5 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -100, opacity: 0, scale: 0.5 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_#CCFF00] max-w-md text-center"
                    >   
                        <h1 className="text-3xl font-black uppercase text-black mb-2">
                            <span className="text-red-500">{currentTip.name}</span> Nyawer!
                        </h1>
                        <h2 className="text-2xl font-bold font-mono bg-black text-[#CCFF00] py-2 px-4 rounded-xl mb-4 inline-block">
                            {currentTip.amount} ETH
                        </h2>
                        <p className="text-xl font-medium text-gray-700 italic border-l-4 border-black pl-4 text-left">
                            "{currentTip.message}"
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )

}