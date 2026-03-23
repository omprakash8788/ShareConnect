import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import ConnectedToMongoDBDataBase from "./db/databasedconnection";

const app = express();
app.use(express.json());
const port_server = process.env.PORT;
console.log(port_server)

// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

// Databased call
ConnectedToMongoDBDataBase()

app.use('/', userRoutes)
app.use('/', authRoutes)

app.get("/", (req, res) => {
  res.send("Hello TS Backend");
});

app.listen(port_server, () => {
  console.log(`Server running on ${port_server}`);
});