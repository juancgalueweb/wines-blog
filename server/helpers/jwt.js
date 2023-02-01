import jwt from 'jsonwebtoken'

export default function genJWT (userId, fullName, email) {
  return new Promise((resolve, reject) => {
    const payload = { userId, fullName, email }
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          console.log(err)
          reject('No se puede generer el token')
        }
        resolve(token)
      }
    )
  })
}
