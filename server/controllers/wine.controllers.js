import WineModel from "../models/wine.model.js";
import { uploadFile, getObjectSignedUrl, deleteObject } from "../helpers/s3.js";
import crypto from "crypto";
import sharp from "sharp";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

//Actualizar imagen en AWS s3 bucket
export async function updateImage(req, res) {
  try {
    const key = req.params.key;
    const file = req.file;
    //* I had to use this function to properly get the filename in Spanish
    const fileName = Buffer.from(file.originalname, "latin1").toString("utf8");
    const fileBuffer = await sharp(file.buffer)
      .resize({
        height: 1920,
        width: 1080,
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .toBuffer();
    await uploadFile(fileBuffer, key, file.mimetype);
    return res.status(200).json({
      status: "success",
      msg: "Archivo actualizado con éxito!",
      imageName: key,
      originalName: fileName,
    });
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar el archivo", err });
  }
}

//Subir una imagen a AWS s3 bucket
export async function uploadImage(req, res) {
  try {
    const file = req.file;
    //* I had to use this function to properly get the filename in Spanish
    const fileName = Buffer.from(file.originalname, "latin1").toString("utf8");
    const imageName = generateFileName();
    const fileBuffer = await sharp(file.buffer)
      .resize({
        height: 1920,
        width: 1080,
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .toBuffer();
    await uploadFile(fileBuffer, imageName, file.mimetype);
    return res.status(200).json({
      status: "success",
      msg: "Archivo subido con éxito!",
      imageName: imageName,
      originalName: fileName,
    });
  } catch (err) {
    res.status(500).json({ msg: "Error al subir el archivo", err });
  }
}

//Encontrar imagen en el AWS s3 bucket
export async function downloadImage(req, res) {
  try {
    const key = req.params.key;
    const imageUrl = await getObjectSignedUrl(key);
    res.json({ imageUrl: imageUrl });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error al buscar imagen por su key en el AWS s3" });
  }
}

//Borrar imagen en el AWS s3 bucket
export async function deleteImageFile(req, res) {
  try {
    const key = req.params.key;
    await deleteObject(key);
    return res.json({
      status: "success",
      msg: "Imagen borrada satisfactoriamente",
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al borrar la image del AWS s3" });
  }
}

//Crear una reseña de vino
export async function addWine(req, res) {
  try {
    const wine = await WineModel.create(req.body);
    return res.json({ msg: "Vino registrado con éxito", wine });
  } catch (err) {
    res.status(500).json({ msg: "Error al crear el vino", err });
  }
}

//Consultar todos los vinos creados por usuario
export async function getWinesByUser(req, res) {
  try {
    const winesUser = await WineModel.find({ author: req.params.id });
    return res.json(winesUser);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error al obtener los vinos por el usuario", err });
  }
}

//Encontrar un vino por el ID del vino
export async function getWineById(req, res) {
  try {
    const singleWine = await WineModel.findById({ _id: req.params.id });
    return res.json(singleWine);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener el vino por su ID", err });
  }
}

//Borrar un vino por el ID del vino
export async function deleteWineById(req, res) {
  try {
    const wineToDelete = await WineModel.findById({ _id: req.params.id });
    if (wineToDelete.imageUrl !== "") {
      await deleteObject(wineToDelete.imageUrl);
    }
    await WineModel.deleteOne({ _id: req.params.id });
    return res.json({ msg: "Vino borrado satisfactoriamente" });
  } catch (err) {
    res.status(500).json({ msg: "Error al borrar el vino", err });
  }
}

//Actualizar un vino por su ID
export async function updateWineById(req, res) {
  try {
    const updatedWine = await WineModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.json({ msg: "Vino modificado exitosamente", updatedWine });
  } catch (err) {
    res.status(500).json({ msg: "Error al editar el vino", err });
  }
}
