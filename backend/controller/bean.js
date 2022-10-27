import mongoose from "mongoose";
import Bean from "../models/bean.js";
import cloudinary from "../middleware/cloudinary.js";

//GET BEANS

export const getBeans = async (req, res) => {
  const category = req.query.category;
  const search = req.query.search;
  const pageSize = parseInt(req.query.limit) || 6;

  try {
    if (category === "beansList") {
      let result = await Bean.find()
        .collation({ locale: "en" })
        .sort({ roaster: 1 })
        .limit(pageSize);

      let groups = result.reduce((acc, bean) => {
        let initial = bean.roaster[0].toUpperCase();

        if (!acc.some((item) => item.initial === initial)) {
          acc.push({ initial, beans: [bean] });
        } else {
          const index = acc.findIndex((item) => item.initial === initial);
          acc[index].beans.push(bean);
        }

        return acc;
      }, []);

      res.status(200).json(groups);
    } else if (search) {
      const result = await Bean.find({
        roaster: { $regex: search, $options: "i" },
      });
      res.status(200).json(result);
    } else {
      const result = await Bean.find();
      res.status(200).json(result);
    }
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

//UPDATE BEAN
export const updateBean = async (req, res) => {
  const { id: _id } = req.params;
  const bean = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Bean doesn't exist with that id");

  const updatedBean = await Bean.findByIdAndUpdate(_id, {
    $set: {
      process: bean.process,
      description: bean.description,
      region: bean.region,
      variety: bean.variety,
      flavor: bean.flavor,
    },
  });

  res.status(200).json(updatedBean);
};

//DELETE BEAN
export const deleteBean = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send({ message: "Not a valid Id" });

  await Bean.findByIdAndRemove(_id);
  res.status(200).json({ message: "Bean deleted successfully" });
};

//Add Note
export const addNote = async (req, res) => {
  const { id: _id } = req.params;
  const note = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send({ message: "Bean doesn't exist with that Id" });

  const updatedBean = await Bean.findByIdAndUpdate(
    _id,
    { $push: { notes: note } },
    {
      new: true,
    }
  );

  res.status(200).json(updatedBean);
};

//Delete Note
export const deleteNote = async (req, res) => {
  const { id: _id } = req.params;
  const { noteId } = req.query;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send({ message: "Bean doesn't exist with that Id" });

  const updatedBean = await Bean.findByIdAndUpdate(
    _id,
    { $pull: { notes: { date: noteId } } },
    {
      new: true,
    }
  );

  res.status(200).json(updatedBean);
};
