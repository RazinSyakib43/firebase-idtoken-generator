const express = require("express");
const router = express.Router();
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const firebase = require("firebase/app");

router.use(express.urlencoded({ extended: true }));
const firebaseConfig = {
  apiKey: "AIzaSyBbkK9FEIROolY29Z2FTrEAJpWaqe5TxzI",
};

const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);

router.post("/", (req, res) => {
  const { email, password } = req.body;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;

      user.getIdToken().then((idToken) => {
        res.status(200).json({ idToken });
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(400).json({ errorCode, errorMessage });
    });
});

module.exports = router;
