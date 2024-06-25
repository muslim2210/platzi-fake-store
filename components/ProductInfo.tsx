"use client";
import React, { useState } from "react";

import { MinusCircle, PlusCircle } from "lucide-react";

interface ProductInfoProps {
  productInfo: ProductType;
}

const formatCurrency = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

const ProductInfo: React.FC<ProductInfoProps> = ({ productInfo }) => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="w-full flex flex-col gap-y-4">
      {/* PRODUCT TITLE */}
      <div className="text-2xl md:text-[34px] font-semibold leading-tight">
        {productInfo?.title}
      </div>
      {/* PRODUCT SUBTITLE */}
      <div className="text-lg font-semibold capitalize flex gap-2">
        {productInfo?.category.name}
      </div>

      {/* PRODUCT PRICE */}
      <div className="flex items-center justify-between">
        <p className="mr-2 text-lg md:text-xl font-semibold">
          {formatCurrency(productInfo?.price)}
        </p>
      </div>

      {/* <div className="text-md font-medium text-black/[0.5]">incl. of taxes</div>
      <div className="text-md font-medium text-black/[0.5] mb-5">
        {`(Also includes all applicable duties)`}
      </div> */}

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-black/[0.5]">Quantity:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-[#EE4D2D] cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-lg font-semibold">{quantity}</p>
          <PlusCircle
            className="hover:text-[#EE4D2D] cursor-pointer"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>

      {/* ADD TO CART BUTTON START */}
      <button className="w-full py-4 rounded-md bg-primary text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75">
        Add to Cart
      </button>
      {/* ADD TO CART BUTTON END */}

      {/* <div className="text-md font-medium text-black/[0.5] text-center max-w-[300px] mx-auto mb-10">
        This product is excluded from site promotions and discounts.
      </div> */}

      <div>
        <div className="text-lg font-semibold mb-5">Product Description</div>
        <div className="text-primaryBlack text-base text-pretty mb-5">
          {productInfo?.description}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
