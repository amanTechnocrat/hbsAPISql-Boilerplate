# Node Boiler Plate

## Features
- User Registeration
- User Login with JWT
- CRUD Operation Avaliable on all Fields
- Upload and Update Profile Photo
- Forget Password
- Handlebars Views

### Pre-requisites

- Install mySQL `https://www.mysql.com/downloads/`

- Install npm and nodeJs `https://nodejs.org/`

$ node --versionPlease update your project in below sheet asap
- Must be `npm version >= 6.x`

$ npm --version
- Must be `npm version >= 12.x`

## ----Front-end server----
This project was generated with [Express-Handlebars](https://github.com/express-handlebars/express-handlebars) version 6.0.6

- Install required dependencies
$ npm install express-handlebars
$ npm install

## ----Back-end server----

### Run Node Server


$ cd node

- Install required dependencies
$ npm install

- Start server
$ npm run dev

--Please set .env file before starting the server

PASSWORD="qwertyuiop" //SQl Server Password
NODE_ENV="local"
NODE_PORT_ENV=""
MAILPASSWORD="bciiwbfwctogrgih"  //your mail App Password for Nodemailer
FROM="test@gmail.com"  //Your Mail ID

--optional for Creating Table
-if you not wanted to make the table and wanted to see the code in action in quick time then replace the code of sqlDBconnection.js file from userSchema.js file and your table and Database will be created automatically.Enjoy!

### File Structure

```
|-- Readme.md
|-- app.js
|-- config
|   `-- index.js
|-- controller
|   `-- userCont
|       `-- index.js
|-- helper
|   `-- bcrypt.js
|-- images
|   `-- profileimg
|   
|-- model
|   `-- userSchema.js
|-- package-lock.json
|-- package.json
|-- routes
|   `-- index.js
`-- views
    |-- edit.hbs
    |-- layouts
    |   `-- main.hbs
    |-- login.hbs
    |-- message.hbs
    |-- partials
    |   |-- footer.hbs
    |   `-- header.hbs
    |-- sendemail.hbs
    |-- setforgetpassword.hbs
    |-- signup.hbs
    `-- usersdata.hbs
