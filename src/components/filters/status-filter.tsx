'use client'

import { useQuery } from '@apollo/client'
import client from '@/lib/apolloClient' 
import { GET_STATUS_VALUES } from '@/lib/queries'
import { Suspense } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { capitalize } from '@/lib/utils'


export default function StatusFilter({ value, onChange }: { value: string; onChange: (val: string) => void }) {

    const { data, loading, error } = useQuery(GET_STATUS_VALUES, { client })
    if (error) return <p>Error: {error.message}</p>
    const statuses = data?.__type?.enumValues ?? [];

    return (
        <Suspense>
            <Select onValueChange={onChange} value={value}>
                <SelectTrigger className="w-[140px] h-40 text-sm cursor-pointer !bg-[#020618] text-slate-500 !outline-none">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    {
                        statuses.map((status : any, index :number) => (
                            <SelectItem key={index} value={status.name} className='cursor-pointer' >
                                {capitalize(status.name)}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </Suspense>
    )
}