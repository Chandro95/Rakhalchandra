import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const resource = await cloudinary.api.resource("portfolio-data/portfolio-content", {
      resource_type: "raw",
    });

    if (!resource || !resource.secure_url) {
      return res.status(404).json({ error: "Content not found" });
    }

    const response = await fetch(resource.secure_url);
    if (!response.ok) {
      throw new Error("Failed to fetch saved content");
    }

    const content = await response.json();
    return res.status(200).json(content);
  } catch (error) {
    console.error("Load content failed", error);
    return res.status(500).json({ error: "Failed to load content" });
  }
}
