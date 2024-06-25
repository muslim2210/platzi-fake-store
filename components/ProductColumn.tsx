"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FilePenLine } from "lucide-react";
import Link from "next/link";
import Delete from "./custom ui/Delete";
import { Button } from "./ui/button";

const formatCurrency = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`dashboard/product/${row.original.id}`}
        className="hover:text-red-500"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <p className="text-black">
          {row.original.description.substring(0, 50)}..
        </p>
      );
    },
  },
  {
    accessorKey: "categoryId",
    header: "Category",
    cell: ({ row }) => {
      return <span className="text-black">{row.original.category.name}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Price ($)",
    cell: ({ row }) => {
      return (
        <span className="text-black">{formatCurrency(row.original.price)}</span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-4 items-center">
        <Link href={`dashboard/product/${row.original.id}`}>
          <Button className="bg-yellow-400 hover:bg-yellow-400/80">
            <FilePenLine className="h-4 w-4 text-white" />
          </Button>
        </Link>
        <Delete item="products" id={row.original.id} />
      </div>
    ),
  },
];
