
const express = require('express')
const router = express.Router()
const { addUser, getUser, logoutUser, deleteUser } = require('../controllers/user')

router.post('/add-user', addUser)
router.get('/get-user', getUser)
router.post('/logout-user', logoutUser)
router.delete('/delete-user', deleteUser)


module.exports = router
