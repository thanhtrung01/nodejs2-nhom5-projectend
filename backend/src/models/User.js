const mongoose = require("mongoose");
const validator = require('validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  displayName: {
    type: String,
    // required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate(value) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error(
          'Password must contain at least one letter and one number',
        );
      }
    },
    private: true, // used by the toJSON plugin
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    // required: true
  },
  avatar: {
    type: String,
    maxlength: 600,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
