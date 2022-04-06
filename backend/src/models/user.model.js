const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
    role: {
      // type: String,
      type: Boolean,
      // enum: roles,
      
      default: 'user',
    },
    // isEmailVerified: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', UserSchema);
