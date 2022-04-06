const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = {
  getEmailUsers: async (req, res) => {
    try {
      const users = await User.find()
        .select('email password')
        .where('email')
        .sort('-createdAt');
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.find().sort('-createdAt');
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const UserId = req.user;
      var id = mongoose.Types.ObjectId(UserId);
      const user = await User.findById(id);
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  createUser: async (req, res) => {
    const passwordHash = await bcrypt.hash(req.body.password, 12);
    const newUser = new User({ ...req.body, password: passwordHash });
    const refresh_token = createAccessToken({ id: newUser._id });
    try {
      const savedUser = await newUser.save();
      res.status(200).json({ refresh_token });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);

      const newUser = await user.updateOne({ $set: req.body });
      res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.deleteOne();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = user;
