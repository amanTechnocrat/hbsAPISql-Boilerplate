const usertable = require('../../helper/sqlDBconnection')
const config = require('../../config');
const genhash = require('../../helper/bcrypt').genhash;
const verifyhash = require('../../helper/bcrypt').verify;


//User Login API
exports.loginapi = async (req, res) => {
    try {
        if (req.body.email && req.body.password) {
            data = [req.body.email];
            usertable.query('select ID,email,password from UserTable where email = ? ', data, async (err, result) => {
                if (err) throw err;
                else if (!result.length > 0) {
                    res.render('message', { message: config.accountNotExistsMessage, path: "/", check: true })
                    return;
                }
                else {
                    const checkpassword = await verifyhash(req.body.password, result[0].password)
                    if (checkpassword) {
                        let token = config.genToken(result[0].email)
                        res.cookie("token", token)
                        res.cookie("userid", result[0].ID)
                        res.redirect('/');
                        return;
                    } else {
                        res.render('message', { message: config.wrongPassMessage, path: "/", check: true })
                        return;
                    }
                }
            })
        } else {
            res.render('message', { message: config.errCode, path: "/", check: true })
            return;
        }
    } catch (err) {
        res.render('message', { message: err.message, path: "/", check: true })
        return;
    }
   
}

//Sending Mail for Forgetpassword
exports.sendmail = async (req, res) => {
    try {
        if (req.body.email) {
            usertable.query(`select * from UserTable where email = "${req.body.email}"`, (err, result) => {
                if (err) throw err;
                else {
                    if (result.length !== 0) {
                        let token = config.genToken(req.body.email, "10m")
                        config.mail(req.body.email, token)
                        res.render('message', { message: "Mail is sended to your account follow that link to change your Password", path: "/login", check: true })
                        return;
                    } else {
                        return res.render('message', { message: "Email is not found", path: "/forgetpasspage", check: true })
                    }
                }
            })
        } else {
            return res.render('message', { message: config.errMessage, path: "/forgetpasspage", check: true })
        }
    } catch (err) {
        return res.render('message', { message: err.message, path: "/forgetpasspage", check: true })
    }

}

//API for Setting Forget Password
exports.setforgetpassword = async (req, res) => {
    try {
        if (req.body.password) {
            let hashcode = await genhash(10, req.body.password) //function for Generating the hashtoken
            let data = [hashcode, res.valid.data]
            usertable.query('update UserTable SET password = ? where email = ?', data, (err) => {
                if (err) throw err;
                else {
                    res.clearCookie("tokenX");
                    return res.render('message', { message: "Password is Changed Now Login Again with New Password", path: "/login", check: true })
                }
            })
        } else {
            return res.render('message', { message: config.errMessage, path: "/login", check: true })
        }
    } catch (err) {
        return res.render('message', { message: err.message, path: "/login", check: true })
    }
    
}

//API for Rendering Login Page
exports.loginpage = (req, res) => {
    res.render('login', { check: true })
}

//API for Rendering Forgetpassword Page 
exports.forgetpasspage = (req, res) => {
    res.render('sendemail', { check: true })
}

//API for Rendering SetForgetpassword Page 
exports.setforgetpasswordpage = (req, res) => {
    res.cookie("tokenX", req.params.id)
    res.render('setforgetpassword', { check: true })
}

//API for Rendering Forgetpassword Page 
exports.changepasswordpage = (req, res) => {
    res.render('changepassword', { check: true })
}

//Logout API
exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect('/login');
}

//Change Password API
exports.changepassword = async (req, res) => {
    try {
        var receivedValues = req.body;
        if (
            JSON.stringify(receivedValues) === '{}' ||
            receivedValues === undefined ||
            receivedValues === null ||
            receivedValues === '' || receivedValues.oldpassword === undefined || receivedValues.newpassword === undefined) {
            res.render('message', { message: config.reqPasswordMessage, path: "/changepaswordpage", check: true })
            return;
        } else {
            usertable.query(`select * from UserTable where ID =${req.cookies["userid"]}`, async (err, result) => {
                if (err) throw err;
                else {
                    const checkpassword = await verifyhash(req.body.oldpassword, result[0].password)
                    if (checkpassword) {
                        let hashcode = await genhash(10, req.body.newpassword)
                        usertable.query(`update UserTable SET password = "${hashcode}" where ID = ${req.cookies["userid"]}`, (err, result) => {
                            if (err) throw err;
                            else {
                                res.render('message', { message: "Password is Changed", path: "/", check: true })
                                return;
                            }
                        })
                    } else {
                        res.render('message', { message: "Old Password didn't Match ! You can't Change Password with this", path: "/changepaswordpage", check: true })
                        return
                    }
                }
            })
        }
    } catch (err) {
        res.render('message', { message: err.message, path: "/changepaswordpage", check: true })
        return
    }
}

//User Registering API
exports.adduserdetails = async (req, res) => {
    try {
        //Function for Image Upload
        config.upload.single("profileimg")(req, res, async (err) => {
            if (err) {
                res.render('message', { message: err.message, path: "/signup", check: true })
                return
            } else {
                var receivedValues = req.body;
                if (
                    JSON.stringify(receivedValues) === '{}' ||
                    receivedValues === undefined ||
                    receivedValues === null ||
                    receivedValues === '') {
                    res.json({
                        "code": config.errCode,
                        "status": "Error",
                        "message": "All fields are required"
                    });
                    return;
                } else {
                    let hashpassword = await genhash(10, receivedValues.password)
                    let data = [
                        receivedValues.firstName,
                        receivedValues.lastName,
                        receivedValues.email,
                        hashpassword,
                        receivedValues.mobileNo,
                        req.file.filename
                    ]
                    usertable.query('insert into UserTable SET firstName = ?,lastName = ?,email = ?,password = ?,mobileNo = ?,userImage=?', data, (err, result) => {
                        if (err) {
                            res.render('message', { message: err.message, path: "/signup", check: true })
                            return;
                        }
                        else {
                            res.redirect('/');
                            return;
                        }
                    })
                }
            }
        })
    } catch (err) {
        return res.render('message', { message: err.message, path: "/signup", check: true })
    }
}

//API for Rendering Signup Page
exports.signuppage = (req, res) => {
    res.render('signup', { check: true })
}