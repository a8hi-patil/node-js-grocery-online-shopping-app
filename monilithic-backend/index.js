const express = require("express");
const { PORT } = require("./src/config");
const expressServer = require("./express-app");
const connectToDatabase = require("./src/database/dbConnect");
const startServer = async () => {
  const app = express();
  await connectToDatabase();
  expressServer(app);
  app
    .listen(PORT, () => {
      console.log(`Server started on port : ${PORT}`);
    })
    .on("error", (err) => {
      console.log("Unable to start server");
      process.env.exit();
    });
};

startServer();
