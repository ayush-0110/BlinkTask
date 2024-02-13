const UserSchema = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserSchema.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid login credentials');
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
      res.status(200).send({ token });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

