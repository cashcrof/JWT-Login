import express from 'express'
import * as database from './database.js'
import bcrypt from 'bcrypt'
import cors from 'cors'
import multer from 'multer'
import bodyParser from 'body-parser'
var upload = multer();
import generateToken from './jwt.js'


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());
app.use(upload.array());

app.get("/*", (req, res) => {
  res.send("Hello World")
})

app.post("/api/login", async (req, res) => {
  const {email, password: plaintextPassword} = req.body;
  const userArray = await database.getUserWithEmail(email);
  const user = userArray[0];
  const hashedPassword = user.password;
  const same = await bcrypt.compare(plaintextPassword, hashedPassword)
  if (same) {
    console.log("sign in successful", req.body);
    const accessToken = generateToken({sub: user.id, email: user.email, displayName: user.displayName, profileImage: user.profileImage})
    res.send({ accessToken: accessToken })
  } else {
    console.log("incorrect login information", req.body);
    res.status(401).send({status: "error", message: "Incorrect login information"});
  }

})

app.post("/api/signup", async (req, res) => {
  const {email, password: plaintextPassword, displayName} = req.body;
  const hashedPassword = await bcrypt.hash(plaintextPassword, 10)
  const created = await database.createUser({email, password: hashedPassword, displayName})
  if (created) {
    const userArray = await database.getUserWithEmail(email);
     const user = userArray[0]
    const accessToken = generateToken({sub: user.id, email: user.email, displayName: user.displayName, profileImage: user.profileImage})
    res.send({ accessToken: accessToken })
  } else {
    console.log("sign up failed", req.body);
    res.status(401).send({status: "error", message: "Sign up failed"})
  }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})