

"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

export default function TransactionTable({ data = [], onView }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const columns = useMemo(() => [
    {
      header: "No",
      id: "rowNo",
      accessorFn: (_r, i) => i + 1 + pageIndex * pageSize,
    },
    { header: "Customer", accessorKey: "clientName" },
    { header: "Service", accessorKey: "service" },
    {
      header: "Amount",
      accessorFn: (row) => `₹${row.totalPayment}`,
    },
    { header: "Payment Mode", accessorKey: "paymentMode" },
    { header: "Payment Status", accessorKey: "paymentStatus" },
    { header: "Service Status", accessorKey: "serviceStatus" },
    {
      header: "Date",
      accessorFn: (row) =>
        new Date(row.createdAt).toLocaleDateString(),
    },
    {
      id: "view",
      header: "View",
      cell: (info) => (
        <button
          onClick={() => onView?.(info.row.original)}
          className="bg-blue-600 text-white w-7 h-7 rounded"
        >
          ▶
        </button>
      ),
    },
  ], [pageIndex, pageSize, onView]);

  const table = useReactTable({
    data,
    columns,
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(next.pageIndex);
      setPageSize(next.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="border rounded bg-white overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 border-b">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border-b text-center">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

