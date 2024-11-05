const router = require('express').Router()
const categoryControl = require('../controlers/categoryControl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/category')
.get(categoryControl.getCategory)
.post(auth, authAdmin, categoryControl.createCategory)

router.delete('/category/:id', auth, authAdmin, categoryControl.deleteCategory);
router.put('/category/:id', auth, authAdmin, categoryControl.updateCategory);


module.exports = router