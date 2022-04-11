const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ['User', 'Admin'],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamp: true,
  },
);

module.exports = mongoose.model('Role', RoleSchema);
