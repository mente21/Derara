const express = require('express');
const router = express.Router();
const {
  getUsers,
  updateUserRole,
  deleteUser,
  syncAllUsers,
  inviteUser,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes here are protected and require Admin or Manager role
router.use(protect);
router.use(authorize('admin', 'manager'));

router.get('/', getUsers);
router.post('/sync', syncAllUsers);
router.post('/invite', inviteUser);
router.put('/:id/role', updateUserRole);
router.delete('/:id', deleteUser);

module.exports = router;
