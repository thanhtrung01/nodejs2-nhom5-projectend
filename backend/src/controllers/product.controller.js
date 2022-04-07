const Product = require("../models/Product");

const CTRL = {};

//Lấy dữ liệu sản phẩm từ trường thư mực
CTRL.getProducts = (req, res) => {
  Product.find({})
    .populate("category")
    .exec((err, products) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        })
      }
      res.json({
        ok: true,
        products,
      });
    });
};

//Lấy dữ liệu sản phẩm từ id thư mực
CTRL.getProduct = (req, res) => {
  const { productId } = req.params;
  Product.findById(productId)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        })
      }
      res.json({
        ok: true,
        product,
      });
    });
};

//Tạo mới sản phẩm
CTRL.createProduct = (req, res) => {
  const newProduct = new Product({
    code: req.body.code,
    name: req.body.name,
    excerpt: req.body.excerpt,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    image: req.body.image,
    category: req.body.category,
    status: req.body.status
  });

  newProduct.save((err, product) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    return res.status(201).json({
      ok: true,
      product,
    });
  });
};

// Cập nhật sản phẩm
CTRL.updateProduct = (req, res) => {
  const { productId } = req.params;
  
  Product.findByIdAndUpdate(
    productId,
    req.body,
    { new: true },
    (err, product) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      return res.status(201).json({
        ok: true,
        product,
      });
    }
  );
};

//Xóa sản phẩm
CTRL.deleteProduct = (req, res) => {
  const { productId } = req.params;
  Product.findByIdAndRemove(productId, (err, product) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    return res.status(201).json({
      ok: true,
      product,
    });
  });
};

module.exports = CTRL;
