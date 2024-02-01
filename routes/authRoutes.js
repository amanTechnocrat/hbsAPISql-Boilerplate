const express = require('express');
const router = express.Router()
const authCont = require('../controller/authCont/index.js');
const config = require("../config")


//API Routes for Page Rendering 
router.get("/login", authCont.loginpage)
router.get("/forgetpasspage",authCont.forgetpasspage)
router.get("/setforgetpasspage/:id",authCont.setforgetpasswordpage)
router.get("/changepaswordpage",authCont.changepasswordpage)
router.get("/signup", authCont.signuppage)

//API Routes
router.post("/login", authCont.loginapi)
router.get('/logout', authCont.logout)
router.post('/sendmail', authCont.sendmail)
router.post("/setforgetpassword", config.verifyToken, authCont.setforgetpassword)
router.post("/changepasswordapi", config.verifyToken, authCont.changepassword)
router.post("/adduser", authCont.adduserdetails)

module.exports = router;
