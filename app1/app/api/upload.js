//api/upload.js
import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const form = new formidable.IncomingForm();

  form.uploadDir = path.join(process.cwd(), "public/images");
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const uploadedFile = files.image;
    const fileName = uploadedFile.name;

    const oldPath = uploadedFile.path;
    const newPath = path.join(form.uploadDir, fileName);

    // Move the uploaded file to the public/images directory
    fs.renameSync(oldPath, newPath);

    res.status(200).json({ success: true });
  });
}
