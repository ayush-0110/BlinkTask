const UserSchema = require("../models/user");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await UserSchema.findOne({ email });
    if (user) {
      return res.status(400).send("User already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user = new UserSchema({email, password: hashPassword });
    await user.save();
    res.status(201).send({ message: "New user created successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
