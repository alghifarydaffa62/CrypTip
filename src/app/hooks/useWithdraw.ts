'use client'

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import tipAbi from "../../abi/CrypTip.json"

export default function useWithdraw() {
    const contractAddress = "0x3512F30BdBd2639850DBF0dB63859e919c4d8E1f"

    const { data: hash, writeContract, isPending: isWritePending } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash
    })

    const withdrawTip = () => {
        writeContract({
            address: contractAddress,
            abi: tipAbi.abi,
            functionName: "withdraw",
        })
    }

    return { isWritePending, isConfirming, isConfirmed, withdrawTip }
}