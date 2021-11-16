const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { genJWT } = require("../helpers/jwt");

//Método para registrar un usario
module.exports.registerUser = async (req, res) => {
  try {
    const newUser = UserModel(req.body);
    //Encrypt password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newUser.password, salt);
    newUser.password = hash;
    await newUser.save();
    return res.json(newUser);
  } catch (err) {
    const errorMsg = Object.values(err.errors).map((val) => val.message);
    res.status(500).json(errorMsg);
  }
};

//Método para hacer el login de un usuario
module.exports.loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (validPassword) {
      const token = await genJWT(user._id, user.fullName, user.email);
      return res
        .cookie("usertoken", token, process.env.SECRET_KEY, { httpOnly: true })
        .json({ _id: user._id, fullName: user.fullName, token: token });
    } else {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }
  } catch (err) {
    res.status(403).json({ msg: "Credenciales inválidas", err });
  }
};

//Método para cerrar sesión
module.exports.logout = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      res.clearCookie("usertoken");
      return res.json(user);
    }
  } catch (err) {
    return res.status(500).json({ msg: "Ha fallado el logout", err });
  }
};
