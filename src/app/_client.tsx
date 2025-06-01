
'use client';


import { useLazyQuery } from '@apollo/client';
import { GET_MEMBERS } from '@/lib/queries';
import { DataTable } from './(datatable)/data-table';
import { columns } from './(datatable)/column';
import VerificationStatusFilter from '@/components/filters/verification-status-filter';
import StatusFilter from '@/components/filters/status-filter';
import { useEffect, useMemo } from 'react';
import { useFilterStore } from '@/stores/filterStore';
import { LoaderCircle } from 'lucide-react';
import  DateTimeRangePicker from '@/components/filters/datetime';


export function ClientComponent() {
    const { 
        verificationStatus, 
        status,
        dateTimeLastActiveFrom,
        dateTimeLastActiveTo,
     } = useFilterStore();

    const [triggerQuery, { data, loading, error }] = useLazyQuery(GET_MEMBERS, {
        fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
        const filterVars: any = {};

        if (verificationStatus) {
            filterVars.verificationStatus = { equal: verificationStatus };
        }

        if (status) {
            filterVars.status = { equal: status };
        }

            
        if (dateTimeLastActiveFrom || dateTimeLastActiveTo) {
            filterVars.dateTimeLastActive = {};

            if (dateTimeLastActiveFrom) {
                filterVars.dateTimeLastActive.greaterThanOrEqual = dateTimeLastActiveFrom;
            }
            
            if (dateTimeLastActiveTo) {
                filterVars.dateTimeLastActive.lesserThanOrEqual = dateTimeLastActiveTo;
            }
        }


        triggerQuery({
            variables: {
                first: 100,
                filter: filterVars,
            },
        });
    }, [
        verificationStatus, 
        status, 
        triggerQuery,
        dateTimeLastActiveFrom,
        dateTimeLastActiveTo,
    ]);

    const membersData = useMemo(() => data?.members?.edges?.map((edge: any) => edge.node) ?? [], [data]);

    if (error) return <p>Error: {error.message}</p>;

    return (
        <main className='rounded-md table-color overflow-auto custom-scrollbar'>
            <FilterBlock  />
            {
                loading && !data ?  (
                    <div className='h-[500px] flex items-center justify-center'>
                        {/* loading... */}
                        <LoaderCircle className="h-20 w-20 animate-spin" color='#FBBD2C'  />
                    </div>
                ) : (
                    <DataTable columns={columns} data={membersData} />
                )
            }
        </main>
    )
}

function FilterBlock() {
    const {
        verificationStatus,
        status,
        setVerificationStatus,
        setStatus,
        setDateTimeLastActiveFrom,
        setDateTimeLastActiveTo,
    } = useFilterStore();

    const handleApply = (startDate: Date, endDate: Date) => {
        const from = new Date(startDate);
        const to = new Date(endDate);
        setDateTimeLastActiveFrom(from.toISOString());
        setDateTimeLastActiveTo(to.toISOString());
    }

    return (
        <section className="table-head-color p-2 py-4 rounded-t-md flex gap-2 items-center">
            <span className="border-r border-white pr-2 font-semibold tracking-wide">Filter</span>
            <div className="flex gap-2">
                <VerificationStatusFilter
                    value={verificationStatus}
                    onChange={setVerificationStatus}
                />
                <StatusFilter
                    value={status}
                    onChange={setStatus}
                />
                <DateTimeRangePicker onApply={handleApply} />
            </div>
        </section>
    );
}