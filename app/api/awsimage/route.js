import { awsquery } from "../../../lib/awsquery";
import { NextResponse } from "next/server";

// Helper function to check if a given content type is an image
function isImageContentType(contentType) {
  return contentType.startsWith("image/");
}

export async function GET() {
  // const reqname = req.params.name;
  const reqname = "original/0.png";
  try {
    const thisimage = await awsquery("download", reqname);
    return NextResponse.json(
      { message: "OK", data: thisimage },
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
  //   const reqname = req.pic1;
  const body = await req.json();
  const reqname = body.pic1;
  console.log(reqname);
  try {
    const thisimage = await awsquery("download", reqname);
    //---testing url
    const testing = await fetch(thisimage);
    const contentType = testing.headers.get("content-type");
    console.log("Content-Type:", contentType);
    if (contentType.startsWith("image/")) {
      return NextResponse.json(
        { message: "OK", data: thisimage },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Error: Not an image", data: null },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error", data: error },
      { status: 500 }
    );
  }
}
