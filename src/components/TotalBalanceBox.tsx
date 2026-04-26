import { StatsBox } from "@/interface/types"
import { Loader2 } from "lucide-react"

export default function TotalBalanceBox({value, isLoading}: StatsBox) {
    return(
        <div className="w-[25vw] h-[12vw] group relative overflow-hidden rounded-2xl bg-[#0ED3EF] p-6 border-2 border-black transition-all duration-300 hover:[box-shadow:12px_12px_0px_#29383a] [box-shadow:5px_5px_0px_#29383a]">
            <div className="flex h-full flex-col justify-between">
                <div>
                    <p className="text-xl font-medium tracking-wide text-black uppercase">
                        Total Balance
                    </p>
                </div>
                
                <div className="flex flex-1 items-end justify-start">
                    <h3 className="text-2xl font-black tracking-tight text-black">
                        {isLoading ? (
                            <Loader2 className="h-6 w-6 animate-spin text-black" />
                        ) : (
                            `${value} ETH`
                        )}
                    </h3>
                </div>
            </div>
        </div>
    )
}