const router = require('express').Router()
const {
    register,
    profile
} = require('../controller/user')

const protect = require('../middlewares/protect')

router.post('/register', register)
router.get('/profile', protect , profile)



module.exports = router 