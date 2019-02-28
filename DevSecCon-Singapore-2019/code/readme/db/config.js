const mongoose = require("mongoose");
const mongo_ip = process.env.MONGO_IP || "localhost";

  mongoose
    .connect("mongodb://" + mongo_ip + ":27017/readme")
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch(err => {
      console.log(`Database connection error ${err}`);
    });
