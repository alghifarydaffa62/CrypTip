'use client'

import { useConnection, useConnections } from "wagmi"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function page() {
    const { address } = useConnection()
    const connection = useConnections()
    const router = useRouter()

    useEffect(() => {
        if(connection.length == 0) {
            router.push('/')
        }
    }, [connection, router])

    return(
        <div>
            <ConnectButton showBalance={false} chainStatus="none"/>
            <h1>Hello User! {address?.slice(0, 10)}...{address?.slice(-6)}</h1>
        </div>
    )
}