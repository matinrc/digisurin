import { query } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await query({
      query: "select * from products",
      values: [],
    });

    return NextResponse.json(
      { message: "OK", data: products },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", data: error },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  const body = await req.json();

  try {
    const products = await query({
      query:
        "INSERT INTO products (prid , prname, prnamee, brand, price, count, catid) VALUES (?,?,?,?,?,?,?);",
      values: [
        req.body.prid,
        req.body.prname,
        body.prnamee,
        body.brand,
        body.price,
        body.count,
        body.catid,
      ],
    });

    return NextResponse.json(
      { message: "OK", data: products },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", data: error },
      { status: 500 }
    );
  }
}
export async function PUT(req) {
  const body = await req.json();

  try {
    const products = await query({
      query:
        "update products set prname = ? , prnamee = ? , price = ? , buyprice = ?, discount = ?, pic1 = ? , catid = ? , brand = ? , count = ? where prid = ?",
      values: [
        body.prname,
        body.prnamee,
        body.price,
        body.buyprice,
        body.discount,
        body.pic1,
        body.catid,
        body.brand,
        body.count,
        body.prid,
      ],
    });
    return NextResponse.json(
      { message: "OK", data: products },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", data: error },
      { status: 500 }
    );
  }
}
