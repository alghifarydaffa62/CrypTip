'use client'

import { useConnections } from "wagmi";
import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const navItems = [
    {
        href: '/dashboard',
        label: 'Dashboard',
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
            </svg>
        )
    },
    {
        href: '/dashboard/link',
        label: 'Tip Link',
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6.5 9.5L9.5 6.5M7 4.5L7.793 3.707a3 3 0 114.243 4.243L11.5 8.5M8.5 11.5l-.793.793a3 3 0 11-4.243-4.243L4 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
        )
    },
    {
        href: '/dashboard/withdraw',
        label: 'Withdraw',
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const connection = useConnections()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (connection.length === 0) {
            router.push('/')
        }
    }, [connection, router])

    const isActive = (path: string) => pathname === path

    return (
        <div className="flex min-h-screen bg-[#f7f7f8]">
            <aside className="w-56 bg-white border-r border-gray-100 flex flex-col fixed top-0 left-0 h-screen z-30">
                <div className="px-5 h-14 flex items-center border-b border-gray-100">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-[#7C5CFC] flex items-center justify-center shrink-0">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                <path d="M7 1L12 4V10L7 13L2 10V4L7 1Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="text-[13px] font-semibold text-gray-900 tracking-tight">CrypTip</span>
                    </Link>
                </div>

                <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-2 mb-2">Menu</p>
                    {navItems.map((item) => {
                        const active = isActive(item.href)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                                    active
                                        ? 'bg-[#7C5CFC]/10 text-[#7C5CFC]'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                                }`}
                            >
                                <span className={active ? 'text-[#7C5CFC]' : 'text-gray-400'}>
                                    {item.icon}
                                </span>
                                {item.label}
                                {active && (
                                    <span className="ml-auto w-1 h-4 rounded-full bg-[#7C5CFC]" />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                <div className="px-4 py-4 border-t border-gray-100">
                    <ConnectButton showBalance={false} chainStatus="none" />
                </div>
            </aside>

            <main className="ml-56 flex-1 min-h-screen">
                <div className="h-14 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs">Dashboard</span>
                        {pathname !== '/dashboard' && (
                            <>
                                <span className="text-gray-300 text-xs">/</span>
                                <span className="text-gray-700 text-xs font-medium capitalize">
                                    {pathname.split('/').pop()}
                                </span>
                            </>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            Sepolia Testnet
                        </span>
                    </div>
                </div>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}