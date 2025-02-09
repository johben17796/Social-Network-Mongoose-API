import { Router } from 'express';
const router = Router();
import {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} from '../../controllers/userController.js';

router.route('/').get(getUsers).post(createUser)

router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:userId/friends/:friendId')
  .post(addFriend).delete(removeFriend);


export { router as userRouter };
// /api/users


// GET all users


// GET a single user by its _id and populated thought and friend data


// POST a new user (note that the examples below are just sample data):

// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }




// PUT to update a user by its _id


// DELETE to remove user by its _id


// BONUS: Remove a user's associated thoughts when deleted.

// /api/users/:userId/friends/:friendId


// POST to add a new friend to a user's friend list


// DELETE to remove a friend from a user's friend list