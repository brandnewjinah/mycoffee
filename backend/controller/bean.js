import mongoose from "mongoose";
import Bean from "../models/bean.js";
import cloudinary from "../middleware/cloudinary.js";

//GET BEANS
export const getBeans = async (req, res) => {
  try {
    const result = await Bean.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
};

//ADD BEAN
export const addBean = async (req, res) => {
  const bean = req.body;
  const image = req.body.img;

  try {
    const uploadedResponse = await cloudinary.uploader.upload(image, {
      upload_preset: "coffee",
    });
    const newBean = new Bean({ ...bean, img: uploadedResponse.url });
    await newBean.save();
    res.status(201).json(newBean);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
