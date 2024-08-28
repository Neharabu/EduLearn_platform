const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const { connect_db } = require("./config/database");

const port = process.env.PORT || 3800;

connect_db();

app.listen(port, () => console.log(`backend server live on port ${port}`));
