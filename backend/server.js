const express = require("express");
const routes = require("./routes/server");
const mongoose = require("mongoose");
const config = require("./config/db");
const path = require('path');
const cors = require('cors');
const app = express();


app.use(cors({
  origin: ["http://localhost:5017", "http://host.docker.internal:5017"],
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({ extended: true }));

config.connectDB();

app.use("/api", routes);

app.listen(3000, () => {
  console.log("ayaktayiz");
});
