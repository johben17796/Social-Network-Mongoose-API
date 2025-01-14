import { Router } from 'express';
const router = Router();
import {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/userController.js';

router.route('/').get(getUsers).post(createUser)

router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

export { router as userRouter };