'use client'
import { UserStats } from "@/interface/types"
import { formatEther } from "viem"
import CrypTipAbi from "../../abi/CrypTip.json"
import { useConnection, useReadContract } from "wagmi"

export default function useUserStats(): UserStats {
    const { address: userAddress } = useConnection()
    const contractAddress = "0x3512F30BdBd2639850DBF0dB63859e919c4d8E1f"

    const { data, isLoading, isError, refetch } = useReadContract({
        address: contractAddress,
        abi: CrypTipAbi.abi,
        functionName: "getUserStats",
        args: userAddress ? [userAddress] : undefined,
    })

    const stats = data as [bigint, bigint, bigint] | undefined

    return {
        totalBalance: stats ? formatEther(stats[0]) : "0",
        totalEarned: stats ? formatEther(stats[1]) : "0",
        totalTipped: stats ? formatEther(stats[2]) : "0",
        isLoading,
        isError,
        refetch
    }
}