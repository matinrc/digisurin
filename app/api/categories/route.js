import { query } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await query({
      query: "select * from categories",
      values: [],
    });

    return NextResponse.json(
      { message: "OK", data: categories },
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
    const senddata = await query({
      query: "insert into categories values (?,?,?,?,?)",
      values: [
        body.catid,
        body.catname,
        body.catfk,
        body.catnamee,
        body.ordersort,
      ],
    });

    return NextResponse.json(
      { message: "OK", data: senddata },
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
    const senddata = await query({
      query:
        "update categories set catname = ? ,catnamee = ? , ordersort = ? where catid = ?",
      values: [body.catname, body.catnamee, body.ordersort, body.catid],
    });

    return NextResponse.json(
      { message: "OK", data: senddata },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", data: error },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  const body = await req.json();

  try {
    const senddata = await query({
      query: "delete from categories where catid = ?",
      values: [body.catid],
    });
    return NextResponse.json(
      { message: "OK", data: senddata },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", data: error },
      { status: 500 }
    );
  }
}
