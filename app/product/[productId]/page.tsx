"use client";
import ProductInfo from "@/components/ProductInfo";
import Wrapper from "@/components/Wrapper";
import React, { useEffect, useState } from "react";
import { MinusCircle, PlusCircle } from "lucide-react";

const formatCurrency = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

const ProductDetailsPage = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );

  const [quantity, setQuantity] = useState<number>(1);

  const getProductDetails = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${params.productId}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setProductDetails(data);
      console.log(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("something went wrong", err);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  console.log(productDetails);

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="flex flex-col lg:flex-row gap-2">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1] mt-10 md:mt-0 lg:max-w-full mx-auto lg:mx-0">
            <img
              className="w-full h-[350px] lg:w-[550px] md:h-[550px] object-cover rounded-lg"
              src={productDetails?.images[0]}
              alt={productDetails?.title}
            />
          </div>
          {/* left column end */}

          {/* right column start */}
          <div className="flex-[1] md:mt-12 lg:mt-0 py-3">
            <div className="max-w-full lg:max-w-[500px] flex flex-col gap-y-3 md:gap-y-4">
              {/* PRODUCT TITLE */}
              <div className="text-2xl md:text-[34px] font-semibold leading-tight">
                {productDetails?.title}
              </div>
              {/* PRODUCT SUBTITLE */}
              <div className="text-lg font-semibold capitalize flex gap-2">
                {productDetails?.category.name}
              </div>

              {/* PRODUCT PRICE */}
              <div className="flex items-center justify-between">
                <p className="mr-2 text-lg md:text-xl font-semibold">
                  {productDetails?.price &&
                    formatCurrency(productDetails.price)}
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
              <button className="w-full mt-3 py-4 rounded-md bg-primary text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75">
                Add to Cart
              </button>
              {/* ADD TO CART BUTTON END */}

              {/* <div className="text-md font-medium text-black/[0.5] text-center max-w-[300px] mx-auto mb-10">
        This product is excluded from site promotions and discounts.
      </div> */}

              <div>
                <div className="text-lg font-semibold mb-5">
                  Product Description
                </div>
                <div className="text-primaryBlack text-base text-pretty mb-5">
                  {productDetails?.description}
                </div>
              </div>
            </div>
          </div>
          {/* right column end */}
        </div>
      </Wrapper>
    </div>
  );
};

export default ProductDetailsPage;
