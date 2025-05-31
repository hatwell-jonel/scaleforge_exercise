"use client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

    const [pageSize, setPageSize] = useState(10);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: pageSize,
            },
        },
    })
    
    useEffect(() => {
        table.setPageSize(pageSize);
    }, [pageSize, table]);

    return (
        <div>
            <div>
                <Table className="border">
                <TableHeader className="table-head-color"> 
                    {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                        return (
                            <TableHead 
                            key={header.id}
                            className="text-slate-400"
                            >
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </TableHead>
                        )
                        })}
                    </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-15 text-center">
                        No results.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </div>
            <TablePagination table={table} setPageSize={setPageSize} />
        </div>
    )
}


function TablePagination({ table, setPageSize }: { table: any, setPageSize: (size: number) => void }) {
  return (
    <>
        <div className="flex items-center justify-end space-x-2 py-4 pr-2">
            <SelectEntries onChange={setPageSize} />
            <div className="inline-flex border rounded-lg overflow-hidden">
                <Button
                    variant="ghost"
                    className="cursor-pointer rounded-none rounded-l-lg border-r border-border px-6 gap-2 "
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                </Button>
                <Button
                    variant="ghost"
                    className="cursor-pointer rounded-none rounded-r-lg px-6 gap-2"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    </>
  )
}


function SelectEntries({ onChange }: { onChange: (value: number) => void }) {
  return (
    <Select defaultValue="10" onValueChange={(value) => onChange(Number(value))}>
      <SelectTrigger className="w-[130px] cursor-pointer !outline-none !bg-transparent !text-white font-semibold">
        <SelectValue placeholder="Entries" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10 Entries</SelectItem>
        <SelectItem value="25">25 Entries</SelectItem>
        <SelectItem value="50">50 Entries</SelectItem>
      </SelectContent>
    </Select>
  );
}