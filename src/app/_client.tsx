"use client"

import { useLazyQuery } from "@apollo/client"
import { useEffect, useMemo } from "react"
import { useFilterStore } from "@/stores/filterStore"

import { GET_MEMBERS } from "@/lib/queries"

import { DataTable } from "./(datatable)/data-table"
import { columns } from "./(datatable)/column"

import VerificationStatusFilter from "@/components/filters/verification-status-filter"
import StatusFilter from "@/components/filters/status-filter"
import DateTimeRangePicker from "@/components/filters/datetime"

import { LoaderCircle } from "lucide-react"
import SelectFilter from "@/components/filters/select-filter"
import { DateFilter } from "@/components/filters/date-filter"
import { format } from "date-fns"



const DATA_LIMIT = 100;

export function TableEnvironment() {
    const {
        verificationStatus,
        status,
        dateTimeLastActiveFrom,
        dateTimeLastActiveTo,
        dateRegistered,

        setNameList,
        setEmailList,
        setMobileNumberList,
        setDomainList,

        filters, // group filter
    } = useFilterStore()

    // This is for Filter options
    const [fetchAllMembers, { data: allMembersData }] = useLazyQuery(GET_MEMBERS, {
        fetchPolicy: "cache-and-network",
        variables: {
        first: DATA_LIMIT,
        },
    })

    // This is for display in table
    const [fetchFilteredMembers, { data: filteredData, loading, error }] = useLazyQuery(GET_MEMBERS, {
        fetchPolicy: "cache-and-network",
    })

    // Extract all members for filter options
    const allMembers = useMemo(
        () => allMembersData?.members?.edges?.map((edge: any) => edge.node) ?? [],
        [allMembersData],
    )

    // Extract filtered members for display
    const filteredMembers = useMemo(
        () => filteredData?.members?.edges?.map((edge: any) => edge.node) ?? [],
        [filteredData],
    )

    // Fetch all members once on component mount
    useEffect(() => {
        fetchAllMembers()
    }, [fetchAllMembers])

    // Update filter options based on ALL members (not filtered)
    useEffect(() => {
        if (allMembers.length > 0) {
        function extractUniqueField<T extends Record<string, any>>(data: T[], field: keyof T): string[] {
            return Array.from(new Set(data.map((item) => item[field]).filter((v): v is string => typeof v === "string")))
        }

        setNameList(extractUniqueField(allMembers, "name"))
        setEmailList(extractUniqueField(allMembers, "emailAddress"))
        setMobileNumberList(extractUniqueField(allMembers, "mobileNumber"))
        setDomainList(extractUniqueField(allMembers, "domain"))
        }
    }, [allMembers, setNameList, setEmailList, setMobileNumberList, setDomainList])


    useEffect(() => {
    const filterVars: any = {}

    // Handle equal fields
    const equalFields = [
        { key: "verificationStatus", value: verificationStatus },
        { key: "status", value: status },
        // { key: "dateTimeCreated", value: dateRegistered },
    ];
    equalFields.forEach(({ key, value }) => {
        if (value) filterVars[key] = { equal: value };
    });

    if (dateRegistered.from || dateRegistered.to) {
        filterVars.dateTimeCreated = {
            ...(dateRegistered.from && { greaterThanOrEqual: dateRegistered.from }),
            ...(dateRegistered.to && { lesserThanOrEqual: dateRegistered.to }),
        }
    }

    // Handle date range
    if (dateTimeLastActiveFrom || dateTimeLastActiveTo) {
        filterVars.dateTimeLastActive = {
        ...(dateTimeLastActiveFrom && { greaterThanOrEqual: dateTimeLastActiveFrom }),
        ...(dateTimeLastActiveTo && { lesserThanOrEqual: dateTimeLastActiveTo }),
        };
    }

    // Handle "in" filters
    const inFields = [
        { key: "name", values: filters.filterNameList },
        { key: "emailAddress", values: filters.filterEmailList },
        { key: "mobileNumber", values: filters.filterMobileNumberList },
        { key: "domain", values: filters.filterDomainList },
    ];

    inFields.forEach(({ key, values }) => {
        if (values?.length > 0) filterVars[key] = { in: values };
    });

    fetchFilteredMembers({
        variables: {
        first: DATA_LIMIT,
        filter: filterVars,
        },
    });
    }, [
        verificationStatus,
        status,
        fetchFilteredMembers,
        dateTimeLastActiveFrom,
        dateTimeLastActiveTo,
        dateRegistered,
        filters
    ]);

    if (error) return <p>Error: {error.message}</p>

    return (
        <main className="rounded-md table-color overflow-auto custom-scrollbar">
            <FilterBlock />
            {loading && !filteredData ? (
                <div className="h-[500px] flex items-center justify-center">
                <LoaderCircle className="h-20 w-20 animate-spin" color="#FBBD2C" />
                </div>
            ) : (
                <DataTable columns={columns} data={filteredMembers} />
            )}
        </main>
    )
}

function FilterBlock() {
  const {
    verificationStatus,
    status,
    dateRegistered,

    setVerificationStatus,
    setStatus,
    setDateTimeLastActiveFrom,
    setDateTimeLastActiveTo,
    setDateRegistered,

    nameList,
    emailList,
    mobileNumberList,
    domainList,

    filters,
    setFilters,
  } = useFilterStore()

    const handleDateRegistered = (date?: Date) => {
        if (date) {
            const from = new Date(date)
            from.setHours(0, 0, 0, 0)

            const to = new Date(date)
            to.setHours(23, 59, 59, 999)

            // You could store both, but since you're using a single `dateRegistered`, just use one object:
            setDateRegistered({
                from: from.toISOString(),
                to: to.toISOString(),
            })
        } else {
            setDateRegistered({ from: "", to: "" })
        }
    }


  const handleApply = (startDate: Date, endDate: Date) => {
    const from = new Date(startDate)
    const to = new Date(endDate)
    setDateTimeLastActiveFrom(from.toISOString())
    setDateTimeLastActiveTo(to.toISOString())
  }

  return (
    <section className="table-head-color p-2 py-4 rounded-t-md flex gap-2 items-center">
      <span className="border-r border-white pr-2 font-semibold tracking-wide">Filter</span>
      <div className="flex gap-2">
        
        <SelectFilter
            label="Name"
            list={nameList}
            selectedValues={filters.filterNameList}
            onChange={(newValues) => setFilters({ filterNameList: newValues })}
        />

        <VerificationStatusFilter value={verificationStatus} onChange={setVerificationStatus} />


        <SelectFilter
            label="Email"
            list={emailList}
            selectedValues={filters.filterEmailList}
            onChange={(newValues) => setFilters({ filterEmailList: newValues })}
        />

        <SelectFilter
            label="Mobile Number"
            list={mobileNumberList}
            selectedValues={filters.filterMobileNumberList}
            onChange={(newValues) => setFilters({ filterMobileNumberList: newValues })}
            className="w-[160px]"
        />

        <SelectFilter
            label="Domain"
            list={domainList}
            selectedValues={filters.filterDomainList}
            onChange={(newValues) => setFilters({ filterDomainList: newValues })}
        />

       <DateFilter
            value={{
                from: dateRegistered.from ? new Date(dateRegistered.from) : undefined,
                to: dateRegistered.to ? new Date(dateRegistered.to) : undefined,
            }}
            onChange={(range) => {
                if (range) {
                setDateRegistered({
                    from: range.from.toISOString(),
                    to: range.to.toISOString(),
                })
                } else {
                setDateRegistered({ from: "", to: "" })
                }
            }}
        />

        <StatusFilter value={status} onChange={setStatus} />

        <DateTimeRangePicker onApply={handleApply} />
      </div>
    </section>
  )
}
