"use client";
import ProductForm from "@/components/ProductForm";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import React, { useEffect, useState } from "react";

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );
  console.log(params.productId);

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

  return loading ? <Loader /> : <ProductForm initialData={productDetails} />;
};

export default ProductDetails;
