import { validatetoken } from "../service/userAuth.js";

function chekcforauthcooke(cookiename) {
  return (req, resp, next) => {
    const cookievalue = req.cookies[cookiename];
    if (!cookievalue) {
      return next();
    }
    try {
      const userpayload = validatetoken(cookievalue);
       req.user = userpayload;
       
      
    } catch (error) {
    }
    return next();
  };
}

export { chekcforauthcooke };
