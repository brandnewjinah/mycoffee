import mongoose from "mongoose";
import Bean from "../models/bean.js";
import cloudinary from "../middleware/cloudinary.js";

//GET BEANS

export const searchBeans = async (req, res) => {
  const roaster = req.query.roaster;
  const beanName = req.query.beanName;
  const pageSize = parseInt(req.query.limit) || 6;

  try {
    if (roaster && beanName) {
      const result = await Bean.find({
        $and: [
          { roaster: { $regex: roaster, $options: "i" } },
          { name: { $regex: beanName, $options: "i" } },
        ],
      });
      res.status(200).json(result);
    } else {
      const result = await Bean.find({
        roaster: { $regex: roaster, $options: "i" },
      });
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
