'use client'

import TotalBalanceBox from "@/components/TotalBalanceBox"
import useUserStats from "@/app/hooks/useUserStats"
import useWithdraw from "@/app/hooks/useWithdraw"

export default function WithdrawPage() {
    const {isLoading, totalBalance} = useUserStats()

    const { isWritePending, isConfirming, withdrawTip } = useWithdraw()

    const handleWithdraw = () => {
        withdrawTip()
    }

    const isBalanceZero = totalBalance === "0" || totalBalance === "0.0";

    return(
        <div className="min-h-screen bg-[#CCFF00] flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-lg bg-white border-4 border-black rounded-3xl p-8 shadow-[12px_12px_0px_#000]">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-black uppercase text-black tracking-tight mb-2">
                        Creator Area
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Tarik semua hasil dukungan langsung ke dompetmu.
                    </p>
                </div>

                <div className="bg-gray-100 border-4 border-black rounded-xl p-6 mb-6">
                    <TotalBalanceBox value={totalBalance} isLoading={isLoading}/>
                </div>

                <button
                    disabled={isWritePending || isConfirming || isBalanceZero || isLoading}
                    className="w-full py-4 bg-black text-[#CCFF00] font-black uppercase tracking-widest rounded-xl hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#CCFF00] active:translate-y-0 active:shadow-none transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:cursor-not-allowed"
                    onClick={handleWithdraw}
                >
                    {isWritePending ? 'Confirm in Wallet...' : isConfirming ? 'Mining Transaction...' : 'Withdraw Balance'}
                </button>

                {isBalanceZero && !isLoading && (
                    <p className="text-center text-sm font-bold text-red-500 mt-4 uppercase tracking-wider">
                        Belum ada saldo untuk ditarik.
                    </p>
                )}

            </div>
        </div>
    )
}