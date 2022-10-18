import mongoose from "mongoose";
import Tool from "../models/tool.js";
import cloudinary from "../middleware/cloudinary.js";

//GET TOOLS
export const getTools = async (req, res) => {
  try {
    const result = await Tool.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET TOOL DETAILS
export const getToolDetails = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const tool = await Tool.findById(_id);

    if (!tool) {
      return res.status(404).json({
        message: "Tool not found.",
      });
    }
    res.status(200).json(tool);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

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
