'use client'

import { useConnections } from "wagmi";
import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function DashboardLayout({ children }: {children: ReactNode}) {
    const connection = useConnections()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if(connection.length == 0) {
            router.push('/')
        }
    }, [connection, router])

    const getLinkStyle = (path: string) => {
        const isActive = pathname === path;
        return `block p-3 rounded-xl font-black uppercase tracking-wider border-4 transition-all ${
            isActive 
            ? "bg-[#0ED3EF] text-black border-black [box-shadow:4px_4px_0px_#000]" 
            : "bg-transparent text-gray-500 border-transparent hover:border-gray-200 hover:text-black" 
        }`;
    }

    return(
        <div className="flex min-h-screen">
            <aside className="w-60 border-r-4 border-black bg-white p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-3xl font-black mb-8 text-black uppercase tracking-tighter">
                        CrypTip
                    </h2>
                    
                    <nav className="space-y-4">
                        <Link href="/dashboard" className={getLinkStyle('/dashboard')}>
                            Dashboard
                        </Link>
                        
                        <Link href="/dashboard/link" className={getLinkStyle('/dashboard/link')}>
                            Create Link
                        </Link>
                    </nav>
                </div>

                <div className="pb-4">
                    <ConnectButton showBalance={false} chainStatus="none"/>
                </div>
            </aside>

            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    )
}