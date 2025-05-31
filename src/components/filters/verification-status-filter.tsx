'use client'

import { useQuery } from '@apollo/client'
import client from '@/lib/apolloClient' 
import { GET_VERIFICATION_STATUS_VALUES } from '@/lib/queries'
import { Suspense } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { capitalize } from '@/lib/utils'
import { Skeleton } from '../ui/skeleton'


export default function VerificationStatusFilter({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    const { data, loading, error } = useQuery(GET_VERIFICATION_STATUS_VALUES, { client })
    if (loading) return <Skeleton className="h-8 w-[170px]" />;
    if (error) return <p>Error: {error.message}</p>
    const statuses = data?.__type?.enumValues ?? []

    return (
        <Suspense>
            <Select onValueChange={onChange} value={value}>
                <SelectTrigger className="w-[170px] h-40 text-sm cursor-pointer !bg-[#020618] text-slate-500 !outline-none">
                    <SelectValue placeholder="Verification Status" />
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