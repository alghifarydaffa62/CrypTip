
import { StatsBox } from "@/interface/types"
import { Loader2 } from "lucide-react"
import { StatCardProps } from "@/interface/types"

export function TotalBalanceBox({ value, isLoading }: StatsBox) {
    return (
        <StatCard
            label="Withdrawable Balance"
            value={value}
            isLoading={isLoading}
            accent="#7C5CFC"
            icon={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            }
        />
    )
}

export function TotalEarnedBox({ value, isLoading }: StatsBox) {
    return (
        <StatCard
            label="Total Earned"
            value={value}
            isLoading={isLoading}
            accent="#16a34a"
            icon={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 10L6 6L9 9L14 4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11 4h3v3" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            }
        />
    )
}

export function TotalTippedBox({ value, isLoading }: StatsBox) {
    return (
        <StatCard
            label="Total Tipped Out"
            value={value}
            isLoading={isLoading}
            accent="#f59e0b"
            icon={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2C5.8 2 4 3.8 4 6c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4z" stroke="#f59e0b" strokeWidth="1.4"/>
                    <circle cx="8" cy="6" r="1.5" fill="#f59e0b"/>
                </svg>
            }
        />
    )
}

function StatCard({ label, value, isLoading, accent, icon }: StatCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4 min-w-50 flex-1 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">{label}</span>
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accent}15` }}
                >
                    {icon}
                </div>
            </div>

            <div>
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-gray-300" />
                        <span className="text-gray-300 text-sm">Loading...</span>
                    </div>
                ) : (
                    <div className="flex items-end gap-1.5">
                        <span className="text-2xl font-bold text-gray-900 tracking-tight">{value}</span>
                        <span className="text-sm font-medium text-gray-400 mb-0.5">ETH</span>
                    </div>
                )}
            </div>

            <div className="h-0.5 w-8 rounded-full" style={{ backgroundColor: accent }} />
        </div>
    )
}