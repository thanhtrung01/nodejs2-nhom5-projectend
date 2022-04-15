const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 5,
      maxlength: 15,
    },
    imageProduct: {
      type: String,
    },
    sale: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    idCategory: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    quantity: {
      type: Number,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    update_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamp: true,
  },
);

module.exports = mongoose.model('Product', ProductSchema);
