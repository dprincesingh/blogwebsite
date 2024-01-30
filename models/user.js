import { Schema, model } from "mongoose";
import { createHmac, randomBytes } from "node:crypto";
const userschema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileimageurl: {
      type: String,
      default:
        "images/portrait-boy-with-brown-hair-brown-eyes_1308-146018.avif",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userschema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedpassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedpassword;
  next();
});

userschema.static("matchpassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) return false;
  const salt = user.salt;
  const hashedpassword = user.password;
  const userprovidehashedpassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

    if(hashedpassword !== userprovidehashedpassword) throw  new Error ("wrong password ") 

    return  user
});

const user = model("user", userschema);

export default user;
