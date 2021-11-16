const WineModel = require("../models/wine.model");

//Crear una reseña de vino
module.exports.addWine = async (req, res) => {
  try {
    const wine = await WineModel.create(req.body);
    return res.json(wine);
  } catch (err) {
    res.status(500).json({ msg: "Algo salió mal", err });
  }
};

//Consultar todos los vinos creados por usuario
module.exports.getWinesByUser = async (req, res) => {
  try {
    const winesUser = await WineModel.find({ author: req.params.id });
    return res.json(winesUser);
  } catch (err) {
    res.status(500).json({ msg: "Algo salió mal", err });
  }
};

//Encontrar un vino por el ID del vino
module.exports.getWineById = async (req, res) => {
  try {
    const singleWine = await WineModel.findById({ _id: req.params.id });
    return res.json(singleWine);
  } catch (err) {
    res.status(500).json({ msg: "Algo salió mal", err });
  }
};

//Borrar un vino por el ID del vino
module.exports.deleteWineById = async (req, res) => {
  try {
    await WineModel.deleteOne({ _id: req.params.id });
    return res.json({ msg: "Vino borrado satisfactoriamente" });
  } catch (err) {
    res.status(500).json({ msg: "Algo salió mal", err });
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
    return res.json(updatedWine);
  } catch (err) {
    res.status(500).json({ msg: "Algo salió mal", err });
  }
};
