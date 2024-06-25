import { NextRequest, NextResponse } from "next/server";

// PUT DATA PRODUCT EDIT
export const PUT = async (
  req: NextRequest,
  { params }: { params: { productId: number } }
) => {
  try {
    const body = await req.json();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${params.productId}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
};
