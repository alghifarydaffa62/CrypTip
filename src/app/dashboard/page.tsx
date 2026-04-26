'use client'

import { useConnection } from "wagmi"

export default function DashboardPage() {
    const { address } = useConnection()

    return(
        <div>
            <h1>Hello User! {address?.slice(0, 10)}...{address?.slice(-6)}</h1>
        </div>
    )
}