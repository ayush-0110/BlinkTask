const express = require("express");
const cors = require("cors");
const loginRoute = require("./Routes/login");
const registerRoute = require("./Routes/register");
const preSigned = require("./Routes/preSigned");
const getImages = require("./Routes/getImages");
const getSignedImage = require("./Routes/getsignedimage");
const authenticateToken = require("./middlewares/tokenAuthentication")
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;


app.get("/validate-token", authenticateToken, (req, res) => {
  res.status(200).send("Token is valid");
});
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use(preSigned);
app.use(getImages);
app.use('/', getSignedImage);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
