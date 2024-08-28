const mongoose = require("mongoose");

exports.connect_db = () => {
  mongoose
    .connect(process.env.MONGO)
    .then((res) => console.log(`mongo connected at ${res.connection.host}`))
    .catch((err) => console.log(err));
};
