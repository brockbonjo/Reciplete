const express = require('express');
const router = express.Router();
const restaurantsController = require('../../controllers/restaurants');

router.use(require('../../config/auth'));
router.get('/', checkAuth, restaurantsController.get);
router.put('/users/:id', restaurantsController.addOrUpdateUser);
router.put('/users/remove/:id', restaurantsController.removeUser)
router.post('/', restaurantsController.create);

function checkAuth(req, res, next) {
   if (req.user) return next();
   return res.status(401).json({msg: 'Not Authorized'});
 }

module.exports = router;