var express = require('express');
var router = express.Router();
const productController = require('../controllers/user.controller');
const auth = require('../middleware/auth');


/* GET Products. */
router.get('/search', productController.getProducts);

router.get('/search-email', productController.getEmailProducts);

/* GET Product by Id. */
router.get('/', auth, productController.getProduct);

/* Post Products. */
router.post('/create-user', productController.createProduct);

/* patch Products. */
router.patch('/update/:id', productController.updateProduct);

/* patch Products. */
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
