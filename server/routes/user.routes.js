import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controllers.js";

const UserRouter = Router();

UserRouter.post("/api/auth/register", registerUser);
UserRouter.post("/api/auth/login", loginUser);

export default UserRouter;
