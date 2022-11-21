import multer from "multer";
import { Router } from "express";
import {
  addWine,
  getWinesByUser,
  getWineById,
  deleteWineById,
  updateWineById,
  uploadImage,
  downloadImage,
  updateImage,
  deleteImageFile,
} from "../controllers/wine.controllers.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const upload = multer();
const WineRouter = Router();

WineRouter.post("/api/wine/new", validateJWT, addWine);
WineRouter.get("/api/wines/:id", validateJWT, getWinesByUser);
WineRouter.get("/api/wine/:id", validateJWT, getWineById);
WineRouter.delete("/api/wine/delete/:id", validateJWT, deleteWineById);
WineRouter.put("/api/wine/:id", validateJWT, updateWineById);
WineRouter.post(
  "/api/uploadSingleFile",
  upload.single("file"),
  validateJWT,
  uploadImage
);
WineRouter.get("/api/getFile/:key", validateJWT, downloadImage);
WineRouter.post(
  "/api/updateSingleFile/:key",
  upload.single("file"),
  validateJWT,
  updateImage
);
WineRouter.delete("/api/deleteImageFile/:key", validateJWT, deleteImageFile);

export default WineRouter;
