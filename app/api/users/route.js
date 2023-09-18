import { query } from "../../../lib/db";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await query({
      query: "select * from users",
      values: [],
    });

    return NextResponse.json({ message: "OK", data: users }, { status: 200 });
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
    const users = await query({
      query: "select * from users where username = ? and password = ?",
      values: [body.username, body.password],
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Error", data: error },
      { status: 500 }
    );
  }
}
