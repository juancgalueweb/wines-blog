import cors from 'cors'
import express from 'express'
import UserRouter from './routes/user.routes.js'
import WineRouter from './routes/wine.routes.js'

const app = express()

//Using dotenv
import 'dotenv/config'

//Mongoose config
import './config/mongoose.config.js'

//Using cors
app.use(cors())

//Access POST method
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Calling all routes
app.use(UserRouter)
app.use(WineRouter)

//Using the port
const PORT = 8000
app.listen(PORT, () =>
  console.log(`CORS-enabled web server listening on port ${PORT}`)
)
