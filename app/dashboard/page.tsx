"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Wrapper from "@/components/Wrapper";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/ProductColumn";

const Dashboard = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  const getProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("[products_GET]", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log(products);

  return (
    <Wrapper className="my-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primaryBlack">Products</h1>
        <Button
          className="md:hidden bg-primary text-white"
          onClick={() => router.push("/dashboard/product/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create
        </Button>
        <Button
          className="hidden md:flex bg-primary text-white"
          onClick={() => router.push("dashboard/product/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Products
        </Button>
      </div>
      <Separator className="bg-black mt-4 mb-7" />
      {loading ? (
        <Loader />
      ) : (
        <DataTable columns={columns} data={products} searchKey="title" />
      )}
    </Wrapper>
  );
};

export default Dashboard;
