import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { content } = body;

    if (!content || typeof content !== "object") {
      return res.status(400).json({ error: "Invalid content payload" });
    }

    const jsonString = JSON.stringify(content);
    const base64 = Buffer.from(jsonString).toString("base64");
    const dataUri = `data:application/json;base64,${base64}`;

    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      resource_type: "raw",
      public_id: "portfolio-content",
      folder: "portfolio-data",
      overwrite: true,
      format: "json",
    });

    return res.status(200).json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error("Save content failed", error);
    return res.status(500).json({ error: "Content save failed" });
  }
}
