import { Router } from 'express'
import { loginUser, registerUser } from '../controllers/user.controllers.js'

const UserRouter = Router()

UserRouter.post('/api/auth/register', registerUser)
UserRouter.post('/api/auth/login', loginUser)

export default UserRouter
