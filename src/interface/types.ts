
export interface UserStats {
    totalEarned: string;
    totalTipped: string;
    totalBalance: string;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
}

export interface StatsBox {
    value: string;
    isLoading: boolean;
}

export interface TipData {
    name: string;
    message: string;
    amount: string;
}

export interface StatCardProps {
    label: string
    value: string
    isLoading: boolean
    accent: string
    icon: React.ReactNode
}