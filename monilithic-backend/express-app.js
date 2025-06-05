const express = require("express");
const cors = require("cors");
const { CustomerAPI, ProductAPI, OrderAPI } = require("./src/api");

const expressServer = (app) => {
  app.use(express.json());
  app.use(cors());
  app.get("/health-check", (req, res) => {
    res.json({
      messsage: "All good !",
    });
  });
  CustomerAPI(app);
  ProductAPI(app);
  OrderAPI(app);
};

module.exports = expressServer;
