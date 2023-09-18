const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

export async function awsquery(method, filename, filedata, mimetype) {
  console.log("method");
  console.log(method);
  console.log("filename");
  console.log(filename);

  const client = new S3Client({
    region: "default",
    endpoint: process.env.LIARA_ENDPOINT,
    credentials: {
      accessKeyId: process.env.LIARA_ACCESS_KEY,
      secretAccessKey: process.env.LIARA_SECRET_KEY,
    },
  });

  if (method === "download") {
    const params = {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: filename,
      Expires: 60, // expires in 60 seconds
    };

    const command = new GetObjectCommand(params);

    const url = await getSignedUrl(client, command, { expiresIn: 8000 });

    return url;
  }
  if (method === "upload") {
    const params = {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: filename,
      Body: filedata,
      ACL: "public-read",
      ContentType: mimetype,
    };

    console.log(params);

    try {
      const command = new PutObjectCommand(params);
      await client.send(command);
      return "Image uploaded successfully";
    } catch (error) {
      return `Error ${error}`;
    }
  }
}
