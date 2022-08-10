import mongoose from "mongoose";
import Bean from "../models/bean.js";
import cloudinary from "../middleware/cloudinary.js";

//GET BEANS
export const getBeans = async (req, res) => {
  try {
    const result = await Bean.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET BEAN DETAILS
export const getBeanDetails = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const bean = await Bean.findById(_id);

    if (!bean) {
      return res.status(404).json({
        message: "Bean not found.",
      });
    }
    res.status(200).json(bean);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//ADD BEAN
export const addBean = async (req, res) => {
  const bean = req.body;
  const image = req.body.img;

  // const newBean = { ...bean, img: image };
  // console.log(newBean);

  try {
    if (image === "") {
      const newBean = new Bean({ ...bean, img: "" });
      await newBean.save();
      res.status(201).json(newBean);
    } else {
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "coffee",
      });
      const newBean = new Bean({ ...bean, img: uploadedResponse.url });
      await newBean.save();
      res.status(201).json(newBean);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//DELETE BEAN
export const deleteBean = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Bean doesn't exist with that id");

  await Bean.findByIdAndRemove(_id);
  res.status(204).json({ message: "Bean deleted" });
};

//ADD Note
export const addNote = async (req, res) => {
  const { id: _id } = req.params;
  const note = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Bean doesn't exist with that id");

  const updatedBean = await Bean.findByIdAndUpdate(
    _id,
    { $push: { notes: note } },
    {
      new: true,
    }
  );

  res.status(200).json(updatedBean);
};
