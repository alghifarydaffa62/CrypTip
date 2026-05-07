'use client'

import { useState, useEffect } from "react"
import { Address } from "viem"
import useTip from "@/app/hooks/useTip"
import { Loader2 } from "lucide-react"

export default function TipForm({ streamerAddress }: { streamerAddress: Address }) {
    const [name, setName] = useState("Anonymous")
    const [message, setMessage] = useState("")
    const [amount, setAmount] = useState("")

    const { sendTip, isWritePending, isConfirming, isConfirmed } = useTip()

    useEffect(() => {
        if (isConfirmed) {
            setName('Anonymous')
            setMessage('')
            setAmount('')
        }
    }, [isConfirmed])

    const handleTip = (e: React.FormEvent) => {
        e.preventDefault()
        if (!message || !amount) return
        sendTip(streamerAddress, name, message, amount)
    }

    const isDisabled = isWritePending || isConfirming || !message || !amount

    const inputClass = `
        w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800
        placeholder-gray-400 font-medium transition-all duration-150
        focus:outline-none focus:border-[#7C5CFC]/50 focus:bg-white focus:ring-2 focus:ring-[#7C5CFC]/10
    `

    const labelClass = "text-[10px] font-semibold uppercase tracking-widest text-gray-400 block mb-2"

    return (
        <form onSubmit={handleTip} className="flex flex-col gap-5">
            <div>
                <label className={labelClass}>Your name</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Anonymous"
                    className={inputClass}
                />
            </div>

            <div>
                <label className={labelClass}>Message</label>
                <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Keep building!"
                    rows={3}
                    className={`${inputClass} resize-none`}
                />
            </div>

            <div>
                <label className={labelClass}>Amount</label>
                <div className="relative">
                    <input
                        type="number"
                        step="any"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="0.01"
                        className={`${inputClass} font-mono pr-14`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 select-none">
                        ETH
                    </span>
                </div>
            </div>

            <button
                type="submit"
                disabled={isDisabled}
                className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 mt-1 ${
                    isDisabled
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-[#7C5CFC] text-white hover:bg-[#6d4ef0] hover:shadow-[0_0_20px_rgba(124,92,252,0.35)]'
                }`}
            >
                {(isWritePending || isConfirming) && (
                    <Loader2 size={15} className="animate-spin" />
                )}
                {isWritePending ? 'Confirm in wallet...' : isConfirming ? 'Confirming...' : 'Send tip'}
            </button>

            {isConfirmed && (
                <p className="text-center text-xs text-green-600 font-medium">
                    Tip sent successfully!
                </p>
            )}
        </form>
    )
}