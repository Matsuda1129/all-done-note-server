import {Router} from 'express';
const router = Router()

import {getUser, getUsers, createUser, updateUser, deleteUser} from '../controller/usersController'
router.get('/users', getUsers);
router.get('/users/:id',getUser);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router