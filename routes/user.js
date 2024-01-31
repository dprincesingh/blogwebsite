import { Router } from "express";
import user from "../models/user.js";
const router = Router();

router.get("/home", (req, resp) => {
  const logedUser = req.user
  resp.render("home",{
     user : logedUser
  });

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
    return resp.render("home",{
      createduser :`User Created : Congratulations  ${result.name} ! Kinldy login `
    });
  } catch (error) {
    return resp.render("home",{
      createduser : "email id already  used "
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
    if(!token) return resp.render('signin',{
      error:"User not found  :Kindly signup"
    })
   return resp.cookie('uid',token).redirect('/home')
  } catch (error) {
     return resp.render("signin",{
      error:"Incorrect email or password "
     })
  }
});



router.get("/logout",(req,resp)=>{
  resp.clearCookie("uid").redirect('/home')
})

export default router;
