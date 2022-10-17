import mongoose from "mongoose";
import Tool from "../models/tool.js";
import cloudinary from "../middleware/cloudinary.js";

//ADD TOOL
export const addTool = async (req, res) => {
  const tool = req.body;
  const image = req.body.img;

  try {
    const uploadedResponse = await cloudinary.uploader.upload(image, {
      upload_preset: "coffee",
    });
    const newTool = new Tool({ ...tool, img: uploadedResponse.url });
    await newTool.save();
    res.status(201).json(newTool);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
