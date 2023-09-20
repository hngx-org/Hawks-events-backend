const router = require('express').Router()
const {
    alloha,
    register,
    login,
    profile,
    updateProfile,
    updateGroupDetails
} = require('../controller/user')

// test this route to see if your set up is working 
router.get('/', alloha)
router.post('/register', register)
router.post('/login', login)
router.get('/profile', profile)
router.put('/profile', updateProfile)
router.put('/api/groups/:groupId', updateGroupDetails)


module.exports = router 