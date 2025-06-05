const { CustomerService } = require("../service");
const isAuth = require("./middleware/auth");
const CustomerAPI = (app) => {
  const service = new CustomerService();
  app.post("/customer/sign-in", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.json({
          message: "All fields required !!",
        });
      }
      let result = await service.SignIn({ email, password });
      res.json({ ...result });
    } catch (err) {
      throw err;
    }
  });
  app.post("/customer/sign-up", async (req, res) => {
    const { email, password, phone } = req.body;
    console.log(email, password, phone);
    try {
      const { email, password, phone } = req.body;
      console.log(email, password, phone);
      if (!email || !password || !phone) {
        res.json({
          message: "All fields required !!",
        });
      }
      let result = await service.SignUp({ email, password, phone });
      res.json({ ...result });
    } catch (err) {
      throw err;
    }
  });
  app.post("/customer/add-new-address", async (req, res) => {
    try {
      const { _id, street, postalCode, country, city } = req.body;
      if (!_id || !street || !postalCode || !country || !city) {
        res.json({
          message: "All fields required !!",
        });
      }
      let result = await service.AddNewAddress({
        _id,
        street,
        postalCode,
        country,
        city,
      });
      res.json({ ...result });
    } catch (err) {
      throw err;
    }
  });
  app.post("/customer/get-customer-email", isAuth, async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        res.json({
          message: "All fields required !!",
        });
      }
      let result = await service.GetCustomerByEmail({ email });
      res.json({ ...result });
    } catch (err) {
      throw err;
    }
  });
  app.post("/customer/get-customer-id", isAuth, async (req, res) => {
    try {
      const { _id } = req.body;
      if (!_id) {
        res.json({
          message: "All fields required !!",
        });
      }
      let result = await service.GetCustomerByID({ _id });
      res.json({ ...result });
    } catch (err) {
      throw err;
    }
  });
  app.post("/customer/get-customer-wishlist", isAuth, async (req, res) => {
    try {
      const { _id } = req.body;
      if (!_id) {
        res.json({
          message: "All fields required !!",
        });
      }
      let result = await service.GetCustomerWishlist({ _id });
      res.json({ ...result });
    } catch (err) {
      throw err;
    }
  });
  app.post("/customer/add-to-customer-wishlist", isAuth, async (req, res) => {
    try {
      const { _id, productId } = req.body;
      if (!_id || !productId) {
        res.json({
          message: "All fields required !!",
        });
      }
      let result = await service.AddToWishList({ _id, productId });
      res.json({ ...result });
    } catch (err) {
      throw err;
    }
  });
  app.post(
    "/customer/remove-to-customer-wishlist",
    isAuth,
    async (req, res) => {
      try {
        const { _id, productId } = req.body;
        if (!_id || !productId) {
          res.json({
            message: "All fields required !!",
          });
        }
        let result = await service.RemoveFromWishList({ _id, productId });
        res.json({ ...result });
      } catch (err) {
        throw err;
      }
    }
  );
  app.get("/customer/cart/:id", isAuth, async (req, res) => {
    try {
      const _id = req.params.id;
      if (!_id) {
        res.json({
          message: "All fields required !!",
        });
      }
      let result = await service.GetCustomerCart({ _id });
      res.json({ ...result });
    } catch (err) {
      throw err;
    }
  });
  app.get("/customer/orders/:id", isAuth, async (req, res) => {
    try {
      const _id = req.params.id;
      if (!_id) {
        res.json({
          message: "All fields required !!",
        });
      }
      let result = await service.GetCustomerOrders({ _id });
      res.json({ ...result });
    } catch (err) {
      throw err;
    }
  });
  app.post("/customer/add-to-customer-cart", isAuth, async (req, res) => {
    try {
      const { _id, productId, unit } = req.body;
      if (!_id || !productId || !unit) {
        res.json({
          message: "All fields required !!",
        });
      }
      let result = await service.AddToCart({ _id, productId, unit });
      res.json({ ...result });
    } catch (err) {
      throw err;
    }
  });
  app.post("/customer/remove-from-customer-cart", isAuth, async (req, res) => {
    try {
      const { _id, productId } = req.body;
      if (!_id || !productId) {
        res.json({
          message: "All fields required !!",
        });
      }
      let result = await service.RemoveFromCart({ _id, productId });
      res.json({ ...result });
    } catch (err) {
      throw err;
    }
  });
};
module.exports = CustomerAPI;
