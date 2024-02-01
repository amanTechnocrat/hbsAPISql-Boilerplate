const express = require('express');
const router = express.Router()
const usercont = require('../controller/userCont/index.js');
const config = require("../config")


//ProtectedAPIRoutes with the JWT Token
router.get("/",config.verifyToken, usercont.getuserdetails)
router.get("/getuserbyid/:id",config.verifyToken,usercont.getuserdetailsbyid)
router.post("/updateuser/:id",config.verifyToken, usercont.updateuserdetails)
router.get("/deleteuser/:id",config.verifyToken, usercont.deleteuserbyid)
router.get("/profileimg/:id",usercont.viewimage)


module.exports = router;
