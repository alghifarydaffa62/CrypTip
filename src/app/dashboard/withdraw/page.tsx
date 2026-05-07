'use client'

import { TotalBalanceBox } from "@/components/StatCards"
import useUserStats from "@/app/hooks/useUserStats"
import useWithdraw from "@/app/hooks/useWithdraw"
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] as const }
} as any)

export default function WithdrawPage() {
    const { isLoading, totalBalance } = useUserStats()
    const { isWritePending, isConfirming, withdrawTip } = useWithdraw()

    const isBalanceZero = totalBalance === "0" || totalBalance === "0.0"
    const isDisabled = isWritePending || isConfirming || isBalanceZero || isLoading

    const buttonLabel = () => {
        if (isWritePending) return 'Confirm in wallet...'
        if (isConfirming) return 'Confirming transaction...'
        return 'Withdraw to wallet'
    }

    return (
        <div className="max-w-md">
            <motion.div {...fadeUp(0)} className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Withdraw</h1>
                <p className="text-sm text-gray-400 mt-1">
                    Pull your accumulated balance directly to your connected wallet.
                </p>
            </motion.div>

            <motion.div {...fadeUp(0.08)} className="mb-4">
                <TotalBalanceBox value={totalBalance} isLoading={isLoading} />
            </motion.div>

            <motion.div {...fadeUp(0.12)} className="flex items-center gap-2 mb-6 px-1">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0">
                    <circle cx="6.5" cy="6.5" r="6" stroke="#9ca3af" strokeWidth="1"/>
                    <path d="M6.5 6v3M6.5 4v.5" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <p className="text-xs text-gray-400">
                    Withdrawals go to your connected wallet. Gas fees apply.
                </p>
            </motion.div>

            <motion.div {...fadeUp(0.16)}>
                <button
                    disabled={isDisabled}
                    onClick={() => withdrawTip()}
                    className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                        isDisabled
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-[#7C5CFC] text-white hover:bg-[#6d4ef0] hover:shadow-[0_0_24px_rgba(124,92,252,0.35)]'
                    }`}
                >
                    {(isWritePending || isConfirming) && (
                        <Loader2 size={15} className="animate-spin" />
                    )}
                    {buttonLabel()}
                </button>

                {isBalanceZero && !isLoading && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-xs text-gray-400 mt-4"
                    >
                        No balance to withdraw yet. Share your tip link to start earning.
                    </motion.p>
                )}
            </motion.div>
        </div>
    )
}