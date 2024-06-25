"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: ProductType;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const formatCurrency = (number: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  };
  return (
    <div
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 flex flex-col gap-1"
      key={product.id}
    >
      <Link href={`/product/${product.id}`}>
        <div className="border border-slate-200 shadow-md">
          {product?.images && (
            <img
              width={500}
              height={500}
              src={product?.images[0]}
              alt=""
              className="h-[180px] md:h-[250px] lg:h-[300px] md:w-[350px]"
            />
          )}
        </div>
      </Link>
      <div className="py-4 px-2 flex flex-col gap-2">
        <h2 className="text-sm md:text-lg font-medium text-primaryBlack">
          {product.title}
        </h2>
        <span className="text-xs md:text-sm text-slate-500 hidden md:block">
          {product.description.substring(0, 50)}..
        </span>
        <div className="flex items-center justify-between">
          <p className="mr-2 text-sm md:text-lg font-semibold">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
