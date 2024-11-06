const userControler = require('../controlers/userControl')
const auth = require('../middleware/auth')

const router = require('express').Router()

router.post('/register', userControler.register)
router.post('/login', userControler.login)
router.get('/logout', userControler.logout)
router.post('/refresh_token', userControler.refreshToken)
router.get('/information', auth, userControler.getInformation)

module.exports = router