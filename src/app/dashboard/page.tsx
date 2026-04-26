'use client'

import { useConnection } from "wagmi"
import TotalBalanceBox from "@/components/TotalBalanceBox"
import TotalEarnedBox from "@/components/TotalEarnedBox"
import TotalTippedBox from "@/components/TotalTippedBox"
import useUserStats from "../hooks/useUserStats"

export default function DashboardPage() {
    const { address } = useConnection()
    const { totalBalance, totalEarned, totalTipped, isLoading } = useUserStats()

    return(
        <div>
            <h1>Hello User! {address?.slice(0, 10)}...{address?.slice(-6)}</h1>

            <div className="flex gap-8">
                <TotalEarnedBox value={totalEarned} isLoading={isLoading}/>
                <TotalTippedBox value={totalTipped} isLoading={isLoading}/>
                <TotalBalanceBox value={totalBalance} isLoading={isLoading}/>
            </div>
        </div>
    )
}