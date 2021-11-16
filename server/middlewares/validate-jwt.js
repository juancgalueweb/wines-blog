const jwt = require("jsonwebtoken");

module.exports.validateJWT = (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }
  try {
    const { userId, fullName, email } = jwt.verify(
      token,
      process.env.SECRET_KEY
    );
    req.userId = userId;
    req.fullName = fullName;
    req.email = email;
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
  next();
};
