import { Router } from "express";
import path from "path";
import multer from "multer";
import blogs from "../models/blogs.js";

const blogroute = Router();
/// file save //
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./images/uploads/`));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

// routes
blogroute.get("/blog", (req, resp) => {
  const logedUser = req.user;
  resp.render("blog", {
    user: logedUser,
  });
});

blogroute.post("/blog", upload.single("coverimageurl"), async (req, resp) => {
  const { title, blog } = req.body;
  const coverimageurl = `/uploads/${req.file.filename}`;

  try {
    const result = await blogs.create({
      title,
      blog,
      coverimageurl,
      createdby: req.user._id,
    });
    resp.redirect("/home")

  } catch (error) {
    console.log( error );
  }
});







export default blogroute;
