
'use client';

import { useQuery } from '@apollo/client';
import { GET_MEMBERS } from '@/lib/queries';
import { DataTable } from './(datatable)/data-table';
import { columns } from './(datatable)/column';


export function ClientComponent() {

    const { data, loading, error, } = useQuery(GET_MEMBERS, {
        variables: {
            first: 100,
        },
        fetchPolicy: 'cache-and-network',
    });

    if (loading && !data) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const membersData = data?.members?.edges?.map((edge : any) => edge.node) ?? [];
    console.log(membersData);

    return (
        <main className='rounded-md table-color overflow-auto custom-scrollbar'>
            <FilterBlock />
            <DataTable columns={columns} data={membersData} />
        </main>
    )
}

function FilterBlock() {
    return (
        <section className='table-head-color p-2 py-4 rounded-t-md flex '>
            <span className='border-r border-white pr-2 font-semibold tracking-wide'>Filter</span>
        </section>
    )
}