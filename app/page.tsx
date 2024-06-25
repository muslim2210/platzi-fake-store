import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { getProducts } from "@/lib/action";
import Image from "next/image";

export default async function Home() {
  const products = await getProducts();

  console.log(products);
  return (
    <Wrapper className="my-10">
      <div className="text-primaryBlack flex flex-col gap-2">
        <h5 className="font-medium text-xs md:text-base">Products</h5>
        <h2 className="text-xl md:text-[34px] font-semibold leading-tight">
          All Products {`(${products.length})`}
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mt-5 md:mt-10">
        {products?.map((product: ProductType) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Wrapper>
  );
}
