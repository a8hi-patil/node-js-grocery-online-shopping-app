const { OrderService } = require("../service");
const OrderAPI = (app) => {
  const service = new OrderService();
  app.get("/order/:id", async (req, res) => {
    try {
      const _id = req.params.id;

      if (!_id) {
        res.json({ message: "Id is mandatory !!" });
      }
      const result = await service.PlaceOrder({ _id });
      res.json(result);
    } catch (err) {
      throw err;
    }
  });
};

module.exports = OrderAPI;
