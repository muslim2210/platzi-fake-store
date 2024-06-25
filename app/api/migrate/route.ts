// pages/api/migrate.ts

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import clientPromise from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export default async (req: NextRequest, res: NextResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Ambil data dari Fake Store API
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products`
    );

    // Lakukan insert data ke MongoDB
    const result = await db.collection("products").insertMany(data);
    console.log(result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
};
