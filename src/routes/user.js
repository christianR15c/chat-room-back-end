const express = require('express');
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/user');

const router = express.Router();

router.post('/api/v1/user', createUser);
router.get('/api/v1/user/:userId', getUser);
router.get('/api/v1/users', getAllUsers);
router.put('/api/v1/user/:userId', updateUser);
router.delete('/api/v1/user/:userId', deleteUser);

module.exports = router;
