const multer = require("multer");
const upload = multer();
// const upload = multer({ dest: "uploads/" });

const {
  addWine,
  getWinesByUser,
  getWineById,
  deleteWineById,
  updateWineById,
  uploadImage,
  downloadImage,
  updateImage,
} = require("../controllers/wine.controllers");
const { validateJWT } = require("../middlewares/validate-jwt");

module.exports = (app) => {
  app.post("/api/wine/new", validateJWT, addWine);
  app.get("/api/wines/:id", validateJWT, getWinesByUser);
  app.get("/api/wine/:id", validateJWT, getWineById);
  app.delete("/api/wine/delete/:id", validateJWT, deleteWineById);
  app.put("/api/wine/:id", updateWineById);
  app.post(
    "/api/uploadSingleFile",
    upload.single("file"),
    validateJWT,
    uploadImage
  );
  app.get("/api/getFile/:key", validateJWT, downloadImage);
  app.post(
    "/api/updateSingleFile/:key",
    upload.single("file"),
    validateJWT,
    updateImage
  );
};
