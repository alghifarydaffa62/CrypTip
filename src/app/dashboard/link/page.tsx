'use client'

import { useConnection } from "wagmi"
import { useState, useEffect } from "react"
import { Copy, ExternalLink, Check } from 'lucide-react'

export default function LinkPage() {
    const { address: userAddress } = useConnection()
    const [baseUrl, setBaseUrl] = useState('')
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        setBaseUrl(window.location.origin)
    }, [])

    const shareLink = `${baseUrl}/tip/${userAddress}`

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return(
        <div className="space-y-10">
            <div className="max-w-2xl">
                <h1 className="text-4xl font-black text-black uppercase tracking-tighter">Sebarkan Link-mu!</h1>
                <p className="text-gray-600 mt-2 font-medium">
                Salin link di bawah ini dan tempelkan di bio sosial media atau deskripsi stream-mu.
                </p>
            </div>

            <div className="w-[40vw] h-[20vw] min-h-75 bg-[#CCFF00] border-4 border-black rounded-3xl p-8 [box-shadow:12px_12px_0px_#000] flex flex-col justify-between">
                <div className="space-y-4">
                    <label className="text-sm font-black uppercase text-black tracking-widest">Tautan Sawer Pribadi</label>
                    <div className="bg-white mt-4 border-4 border-black p-4 rounded-xl flex items-center justify-between">
                        <code className="text-black font-bold truncate mr-4">
                            {userAddress ? shareLink : 'Menghubungkan dompet...'}
                            </code>
                            
                            <button 
                            onClick={copyToClipboard}
                            className="bg-black text-white p-2 rounded-lg hover:scale-110 transition-transform active:scale-95"
                            >
                            {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                        </button>
                    </div>
                </div>

                <div className="flex gap-4">
                    <a 
                        href={shareLink} 
                        target="_blank"
                        className="flex-1 bg-black text-white text-center py-4 rounded-xl font-black uppercase tracking-wider border-4 border-black hover:[box-shadow:4px_4px_0px_#CCFF00] transition-all flex items-center justify-center gap-2"
                    >
                        Preview Halaman <ExternalLink size={20} />
                    </a>
                </div>
            </div>

            <div className="max-w-xl bg-white border-4 border-black p-6 rounded-2xl [box-shadow:6px_6px_0px_#000]">
                <h3 className="font-black uppercase mb-2 text-black">Cara Pakai:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 font-medium">
                <li>Pasang di Bio Instagram/Twitter</li>
                <li>Gunakan sebagai Link di Twitch/Youtube Overlay</li>
                <li>Dana akan masuk langsung ke saldo Kryptip-mu</li>
                </ul>
            </div>
        </div>
    )
}