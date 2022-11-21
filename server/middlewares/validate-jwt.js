import jwt from "jsonwebtoken";

export function validateJWT(req, res, next) {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      success: false,
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
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        msg: "El token expiró. Vuelva a iniciar sesión.",
      });
    }
    return res.status(401).json({
      success: false,
      msg: "Token no válido",
    });
  }
  next();
}
