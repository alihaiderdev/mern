const express = require('express');
const {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  removeUserById,
} = require('../controllers/userControllers');

const router = express.Router();

// router.post('/', createUser);
// router.get('/', getUsers);
// router.get('/:userId', getUserById);
// router.patch('/:userId', updateUserById);
// router.delete('/:userId', removeUserById);

router.route('/').post(createUser).get(getUsers);
router
  .route('/:userId')
  .get(getUserById)
  .patch(updateUserById)
  .delete(removeUserById);

module.exports = router;
