"use client"

import { customFormat } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"
import { format } from 'date-fns';
import {
    ActiveBadge, 
    BlacklistedBadge, 
    DisabledBadge, 
    PendingBadge, 
    SuspendedBadge, 
    UnverifiedBadge, 
    VerifiedBadge 
} from "@/components/statuses-badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColumnProps  = {
  name: string
//   verificationStatus: "VERIFIED" | "UNVERIFIED" | "PENDING"
  verificationStatus: string
  balance : number
  email : string
  mobileNumber : string
  domain: string
  dateRegistered: string
//   status : "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED" | "BLACKLISTED" | "DELETED"
  status : string
  dateTimeLastActive: string
}

// export const columns: ColumnDef<ColumnProps>[] = [
export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const { name } = row.original;
            return name ? <span className="text-[#FBBD2C]" >{name}</span> : "-";
        },
    },
    {
        accessorKey: "verificationStatus",
        header: "Verification Status",
        cell: ({ row }) => {
            const { verificationStatus } = row.original;
            switch (verificationStatus) {
                case "VERIFIED":
                    return <VerifiedBadge />;
                case "PENDING":
                    return <PendingBadge />;
                case "UNVERIFIED":
                    return <UnverifiedBadge />;
            }
        },
    },
    {
        accessorKey: "balance",
        header: "Balance", 
        cell: ({ row }) => {
            return <span className="text-slate-400" >{Math.floor(Math.random() * 10000).toFixed(2)}</span>
        },
    },
    {
        accessorKey: "email",
        header: "Email address", 
        cell: ({ row }) => {
            console.log(row.original);
            const { emailAddress } = row.original;
            return emailAddress ? <span className="text-slate-400" >{emailAddress}</span> : "-";
        },
    },
    {
        accessorKey: "mobileNumber",
        header: "Mobile number",
        cell: ({ row }) => {
            const { mobileNumber } = row.original;
            return mobileNumber ? <span className="text-slate-400" >{customFormat(mobileNumber)}</span> : "-";
        },
    },
    {
        accessorKey: "domain",
        header: "Domain",
        cell: ({ row }) => {
            const { domain } = row.original;
            return domain ? <span className="text-slate-400" >{domain}</span> : "-";
        },
    },
    {
        accessorKey: "dateRegistered",
        header: "Date Registered", 
        cell: ({ row }) => {
            const { dateRegistered } = row.original;
            return dateRegistered ? <span className="text-slate-400" >{dateRegistered}</span> : "-";
        },
    },
    {
        accessorKey: "status",
        header: "Status", 
        cell: ({ row }) => {
            const { status } = row.original;
            switch (status) {
                case "ACTIVE":
                    return <ActiveBadge />;
                case "BLACKLISTED":
                    return <BlacklistedBadge />;
                case "SUSPENDED":
                    return <SuspendedBadge />;
                default:
                    return <span >{status}</span>;
            }
        },
    },
    {
        accessorKey: "dateTimeLastActive",
        header: "Date and Time Last Active ",
        cell: ({ row }) => {
            const { dateTimeLastActive } = row.original;
            const formatted = format(new Date(dateTimeLastActive), 'yyyy MMM dd hh:mm a');
            return dateTimeLastActive ? <span className="text-slate-400" >{formatted}</span> : "-";
        },
    },
]