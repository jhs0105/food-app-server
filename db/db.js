const mongoose = require("mongoose");
const db = mongoose
  .connect(
    `mongodb+srv://fpaldps:${process.env.MONGO_PASSWORD}@cluster0.g1ce30s.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "food",
    }
  )
  .then(() => {
    console.log("db연결");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
