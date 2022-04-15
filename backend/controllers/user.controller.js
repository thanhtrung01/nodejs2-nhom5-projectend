const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const product = {
    getEmailProducts: async (req, res) => {
        try {
            const users = await User.find().select('email password').where('email').sort(
                '-createdAt',
            );
            return res.status(200).json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    getProducts: async (req, res) => {
        try {
            const users = await User.find().sort(
                '-createdAt',
            );
            return res.status(200).json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    getProduct: async (req, res) => {
        try {
             const UserId = req.user;
             var id = mongoose.Types.ObjectId(UserId);
            const product = await User.findById(id);
            return res.status(200).json(product);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    createProduct: async (req, res) => {
        const passwordHash = await bcrypt.hash(req.body.password, 12);
        const newProduct = new User({...req.body, password: passwordHash});
        const refresh_token = createAccessToken({ id: newProduct._id });
        try {
            const savedProduct = await newProduct.save();
            res.status(200).json({refresh_token});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    updateProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await User.findById(id);

            const newProduct = await product.updateOne({ $set: req.body });
            res.status(200).json(newProduct);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const product = await User.findById(req.params.id);
            await product.deleteOne();
            res.status(200).json(product);
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

module.exports = product;
