import express from "express";
import dotenv from "dotenv";
import ConnectedToMongoDBDataBase from "./db/databasedconnection";
dotenv.config();

const app = express();
const port_server = process.env.PORT;
console.log(port_server)

// Databased call
ConnectedToMongoDBDataBase()


app.get("/", (req, res) => {
  res.send("Hello TS Backend");
});

app.listen(port_server, () => {
  console.log(`Server running on ${port_server}`);
});