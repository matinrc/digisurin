import { writeFile } from "fs/promises";
import sharp from "sharp"; // Importing the Sharp package for image resizing
import { NextResponse } from "next/server";
import { join } from "path";
import { awsquery } from "../../../lib/awsquery";

export async function POST(req, res) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");
    const prid = formData.get("prid");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // const path = join("/", "tmp", file.name);
    // writeFile(path, buffer);
    // console.log(`open ${path} to see image`);
    try {
      const mimetype = file.type; //---must be !

      // Resize the image using sharp
      const resizedImageBuffer = await sharp(buffer)
        .resize(100) // Specify your desired dimensions
        .toBuffer();

      // Upload the resized image to AWS S3 using the awsquery function
      const thubm = await awsquery(
        "upload",
        `thumbs/${prid}.png`,
        resizedImageBuffer,
        mimetype
      );
      const original = await awsquery(
        "upload",
        `original/${prid}.png`,
        buffer,
        mimetype
      );

      return NextResponse.json({
        message: "File uploaded successfully",
        prid: prid,
        //   path: path,
      });
    } catch (error) {
      console.error("Error Resizing or uploading:", error);
      return NextResponse.error({ status: 500, message: "File upload failed" });
    }
  } catch (error) {
    console.error("Error handling file upload:", error);
    return NextResponse.error({ status: 500, message: "File upload failed" });
  }
}
