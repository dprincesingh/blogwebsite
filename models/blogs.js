import mongoose, { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    blog: {
      type: String,
      required: true,
    },
    coverimageurl: {
      type: String,
    },
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const blogs = model("blogs",blogSchema)

export default blogs