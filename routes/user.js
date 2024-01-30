import { Router } from "express";
import user from "../models/user.js";
const router = Router();

router.get("/home", (req, resp) => {
  resp.render("home");
});

router.get("/signup", (req, resp) => {
  resp.render("signup");
});
router.post("/signup", async (req, resp) => {
  const { name, email, password, profileimageurl } = req.body;
  const result = await user.create({
    name,
    email,
    password
  });
  console.log(`user created: ${result.name}`);
  return resp.redirect("/home")
});

router.get("/signin", (req, resp) => {
  resp.render("signin");
});
router.post("/signin", async (req, resp) => {
    const {email,password} = req.body 
    const  result  = await user.matchpassword(email,password)
    console.log(result);
    return resp.render("home",{result})
});

export default router;
