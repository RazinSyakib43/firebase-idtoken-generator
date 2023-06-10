require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const authMiddleware = require("./middleware/authMiddleware");

const userPreference = require("./routes/user_preferences");
const loginUser = require("./routes/login_user");

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(authMiddleware);

const { Firestore } = require("@google-cloud/firestore");

const { initializeApp } = require("firebase-admin/app");
const admin = require("firebase-admin");
const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const db = admin.firestore();

app.use("/userpreferences", userPreference);
app.use("/loginUser", loginUser);

app.listen(PORT, () => console.log(`Server berjalan di ${PORT}`));
