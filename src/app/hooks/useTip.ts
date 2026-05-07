import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import tipAbi from '../../abi/CrypTip.json'
import { Address, parseEther } from "viem"

export default function useTip() {
    const contractAddress = "0x3512F30BdBd2639850DBF0dB63859e919c4d8E1f"

    const { data: hash, writeContract, isPending: isWritePending} = useWriteContract()

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })

    const sendTip = (streamerAddress: Address, name: string , message: string, amount: string) => {
        writeContract({
            address: contractAddress,
            abi: tipAbi.abi,
            functionName: 'sendTip',
            args: [streamerAddress, name, message],
            value: parseEther(amount)
        })
    }

    return { sendTip, hash, isWritePending, isConfirming, isConfirmed }
}