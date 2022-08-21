const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  addWine,
  getWinesByUser,
  getWineById,
  deleteWineById,
  updateWineById,
  uploadFile,
} = require("../controllers/wine.controllers");
const { validateJWT } = require("../middlewares/validate-jwt");

module.exports = (app) => {
  app.post("/api/wine/new", validateJWT, addWine);
  app.get("/api/wines/:id", validateJWT, getWinesByUser);
  app.get("/api/wine/:id", validateJWT, getWineById);
  app.delete("/api/wine/delete/:id", validateJWT, deleteWineById);
  app.put("/api/wine/:id", updateWineById);
  app.post("/api/file", upload.single("file"), uploadFile); //pendiente validar con el token para subir una foto
};
