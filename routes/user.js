import { Router } from "express";
import blogs from "../models/blogs.js";
import user from "../models/user.js";
const router = Router();

router.get("/home", async (req, resp) => {
 
   try {
    const logedUser = req.user;
   const allblogs = await blogs.find({createdby:req.user._id});
   resp.render("home", {
     user: logedUser,
     blogs: allblogs,
   });
   } catch (error) {
    resp.redirect('/signin')
   }
   



 
});

router.get("/signup", (req, resp) => {
  resp.render("signup");
});
router.post("/signup", async (req, resp) => {
  const { name, email, password, profileimageurl } = req.body;

  try {
    const result = await user.create({
      name,
      email,
      password,
    });
    return resp.render("signin", {
      createduser: `User Created : Congratulations  ${result.name} ! Kinldy login `,
    });
  } catch (error) {
    return resp.render("home", {
      createduser: "email id already  used ",
    });
  }
});

router.get("/signin", (req, resp) => {
  resp.render("signin");
});

router.post("/signin", async (req, resp) => {
  const { email, password } = req.body;
  try {
    const token = await user.matchpasswordANDgenerateToken(email, password);
    if (!token)
      return resp.render("signin", {
        error: "User not found  :Kindly signup",
      });
    return resp.cookie("uid", token).redirect("/home");
  } catch (error) {
    return resp.render("signin", {
      error: "Incorrect email or password ",
    });
  }
});

router.get("/logout", (req, resp) => {
  resp.clearCookie("uid").redirect("/home");
});

export default router;
