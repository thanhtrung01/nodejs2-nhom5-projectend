const config = require("../../config/config");
const User = require("../../models/User");

const CTRL = {};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Đăng nhập tài khoản
CTRL.login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "email/Password invalid!",
      });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(404).json({
        ok: false,
        msg: "email/Password invalid!",
      });
    }

    let token = jwt.sign({ data: user }, config.ACCESS_TOKEN_SECRET, {
      expiresIn: "2h",
    });

    return res.status(201).json({
      ok: true,
      user,
      token,
    });
  });
};

//Đăng ký tài khoản
CTRL.register = async (req, res) => {
  const passwordHash = await bcrypt.hash(req.body.password, 12);
  const newUser = new User({ ...req.body, password: passwordHash });
  const refresh_token = createAccessToken({ id: newUser._id });
  try {
    const savedUser = await newUser.save();
    res.status(200).json({ refresh_token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err, {
      ok: false,
      msg: "Passwords with letters and characters greater than 8!",
    });
  }
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = CTRL;
