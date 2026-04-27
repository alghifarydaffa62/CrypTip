'use client'

import { useConnection } from "wagmi";
import { useParams } from 'next/navigation'

export default function TipPage() {
    const params = useParams()
    const streamerAddress = params.address as string
    
    return(
        <div className="min-h-screen bg-[#CCFF00] flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-lg bg-white border-4 border-black rounded-3xl p-8 [box-shadow:12px_12px_0px_#000]">
                
                <h1 className="text-3xl font-black uppercase text-black tracking-tight mb-2">
                    Dukung Kreator!
                </h1>
                
                <p className="text-gray-500 font-medium mb-6">
                    Kirim tip langsung ke dompet tujuan tanpa perantara pihak ketiga.
                </p>

                {/* Info Target Address */}
                <div className="space-y-2 mb-8">
                    <label className="text-xs font-black uppercase tracking-widest text-black">Target Address</label>
                    <div className="bg-gray-100 p-4 border-4 border-black rounded-xl">
                        <p className="font-mono text-sm break-all font-bold text-black">
                            {streamerAddress || "Loading..."}
                        </p>
                    </div>
                </div>

                <div className="p-4 border-4 border-dashed border-gray-300 rounded-xl text-center text-gray-500 font-medium">
                    [ Area Form Input Tip Akan Dibuat Di Sini ]
                </div>

            </div>
        </div>
    )
}