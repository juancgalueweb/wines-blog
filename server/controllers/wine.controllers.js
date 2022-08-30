const WineModel = require("../models/wine.model");
const { uploadFile, getObjectSignedUrl } = require("../helpers/s3");
const fs = require("fs-extra");
const util = require("util");
const crypto = require("crypto");
const sharp = require("sharp");

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const resizeImage = (file) => {
  try {
    sharp(file)
      .resize({ width: 1920, height: 1080, fit: "contain" })
      .toBuffer();
  } catch (err) {
    console.log(err);
  }
};

//Subir una imagen a AWS s3 bucket
module.exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;
    const imageName = generateFileName();
    const fileBuffer = resizeImage(file.buffer);
    await uploadFile(fileBuffer, imageName, file.mimetype);
    //Remueve imagen de la carpeta uploads de multer, una vez que se suba a AWS s3
    const unlinkFile = util.promisify(fs.unlink);
    await unlinkFile(file.path);
    // console.log("Respuesta de S3: ", s3Result);
    return res.status(200).json({
      status: "success",
      msg: "Archivo subido con éxito!",
    });
  } catch (err) {
    res.status(500).json({ msg: "Error al subir el archivo", err });
  }
};

//Encontrar imagen en el AWS s3 bucket
module.exports.downloadImage = async (req, res) => {
  try {
    const key = req.params.key;
    const readStream = getObjectSignedUrl(key);
    readStream.pipe(res);
    // console.log("RES", readStream);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error al buscar imagen por su key en el AWS s3" });
  }
};

//Crear una reseña de vino
module.exports.addWine = async (req, res) => {
  try {
    const wine = await WineModel.create(req.body);
    return res.json({ msg: "Vino registrado con éxito", wine });
  } catch (err) {
    res.status(500).json({ msg: "Error al crear el vino", err });
  }
};

//Consultar todos los vinos creados por usuario
module.exports.getWinesByUser = async (req, res) => {
  try {
    const winesUser = await WineModel.find({ author: req.params.id });
    return res.json(winesUser);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error al obtener los vinos por el usuario", err });
  }
};

//Encontrar un vino por el ID del vino
module.exports.getWineById = async (req, res) => {
  try {
    const singleWine = await WineModel.findById({ _id: req.params.id });
    return res.json(singleWine);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener el vino por su ID", err });
  }
};

//Borrar un vino por el ID del vino
module.exports.deleteWineById = async (req, res) => {
  try {
    await WineModel.deleteOne({ _id: req.params.id });
    return res.json({ msg: "Vino borrado satisfactoriamente" });
  } catch (err) {
    res.status(500).json({ msg: "Error al borrar el vino", err });
  }
};

//Actualizar un vino por su ID
module.exports.updateWineById = async (req, res) => {
  try {
    const updatedWine = await WineModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    return res.json({ msg: "Vino modificado exitosamente", updatedWine });
  } catch (err) {
    res.status(500).json({ msg: "Error al editar el vino", err });
  }
};
