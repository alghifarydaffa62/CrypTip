'use client'

import { useConnections } from "wagmi";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function DashboardLayout({ children }: {children: ReactNode}) {
    const connection = useConnections()
    const router = useRouter()

    useEffect(() => {
        if(connection.length == 0) {
            router.push('/')
        }
    }, [connection, router])

    return(
        <div className="flex min-h-screen">
            <aside className="w-64 border-r border-slate-800 bg-slate-900 p-4 text-white">
                <h2 className="text-xl font-bold mb-6 text-blue-400">CrypTip</h2>
                <nav className="space-y-2">
                    <p className="p-2 bg-slate-800 rounded">Dashboard</p>
                    <p className="p-2 hover:bg-slate-800 rounded cursor-pointer">Create Link</p>
                    <ConnectButton showBalance={false} chainStatus="none"/>
                </nav>
            </aside>

            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    )
}