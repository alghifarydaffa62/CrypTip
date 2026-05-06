'use client'

import { useState } from "react";
import { Address } from "viem";
import { useEffect } from "react";
import { useConnection } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useTip from "@/app/hooks/useTip";

export default function TipForm({streamerAddress}: {streamerAddress: Address}) {
    const [name, setName] = useState("Anonymous")
    const [message, setMessage] = useState("")
    const [amount, setAmount] = useState("")

    const { isConnected } = useConnection()

    const { sendTip, isWritePending, isConfirming, isConfirmed } = useTip()

    useEffect(() => {
        if (isConfirmed) {
            setName('Anonymous')
            setMessage(''); 
            setAmount('0'); 
        }
    }, [isConfirmed]);

    const handleTip = (e: React.FormEvent) => {
        e.preventDefault(); 
        
        if (!message || !amount) return;
        sendTip(streamerAddress, name, message, amount)
    }

    const isFormEmpty = !message || !amount || amount === "0";

    return(
        <div>
            {!isConnected && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm rounded-xl border-2 border-dashed border-gray-400">
                    <div className="bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000] flex flex-col items-center text-center">
                        <p className="text-sm font-black uppercase tracking-widest text-black mb-4">
                            Connect Wallet<br/>To Start Tipping
                        </p>
                        <ConnectButton />
                    </div>
                </div>
            )}

            <form 
                onSubmit={handleTip} 
                className={`flex flex-col gap-6 w-full transition-all duration-300 ${!isConnected ? 'opacity-50 pointer-events-none blur-[1px]' : 'opacity-100'}`}
            >
                <div className="flex flex-col text-left">
                    <label className="text-xs font-black uppercase tracking-widest text-black mb-2">
                        Sender Name
                    </label>
                    <input 
                        type="text"
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        name="name"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all text-black font-medium placeholder-gray-400"
                    />
                </div>
                
                <div className="flex flex-col text-left">
                    <label className="text-xs font-black uppercase tracking-widest text-black mb-2">
                        Message
                    </label>
                    <textarea 
                        value={message}
                        onChange={e => setMessage(e.target.value)} 
                        name="message"
                        placeholder="Keep building!"
                        rows={3}
                        className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all text-black font-medium placeholder-gray-400 resize-none"
                    />
                </div>
                
                <div className="flex flex-col text-left">
                    <label className="text-xs font-black uppercase tracking-widest text-black mb-2">
                        Tip Amount
                    </label>
                    <div className="relative">
                        <input 
                            type="number" 
                            step="any"
                            value={amount}
                            onChange={e => setAmount(e.target.value)} 
                            name="amount"
                            placeholder="0.01"
                            className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all text-black font-mono font-bold placeholder-gray-300"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-400 select-none">
                            ETH
                        </span>
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isWritePending || isConfirming || isFormEmpty}
                    className="mt-4 w-full py-4 bg-black text-[#CCFF00] font-black uppercase tracking-widest rounded-xl hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#CCFF00] active:translate-y-0 active:shadow-none transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:cursor-not-allowed"
                >
                    {isWritePending ? 'Confirm in Wallet...' : isConfirming ? 'Mining Transaction...' : 'Send Tip'}
                </button>
            </form>
        </div>
    )
}