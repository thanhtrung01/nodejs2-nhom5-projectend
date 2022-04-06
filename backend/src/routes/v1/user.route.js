var express = require('express');
var router = express.Router();
const userController = require('../../controllers/user.controller');
const auth = require('../../middleware/auth');

/* GET Users. */
router.get('/search', userController.getUsers);

router.get('/search-email', userController.getEmailUsers);

/* GET Product by Id. */
router.get('/', auth, userController.getUser);

/* Post Users. */
router.post('/create-user', userController.createUser);

/* patch Users. */
router.patch('/update/:id', userController.updateUser);

/* patch Users. */
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
