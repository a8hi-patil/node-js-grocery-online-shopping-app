const { ProductService } = require("../service");

const ProductAPI = (app) => {
  const service = new ProductService();
  app.post("/product/create", async (req, res, next) => {
    try {
      const { name, desc, type, unit, price, available, suplier, banner } =
        req.body;
      const data = await service.CreateProduct({
        name,
        desc,
        type,
        unit,
        price,
        available,
        suplier,
        banner,
      });
      return res.json(data);
    } catch (err) {
      throw err;
    }
  });
  app.get("/product/:id", async (req, res, next) => {
    const _id = req.params.id;

    try {
      const data = await service.GetProductDescription({ _id });
      return res.status(200).json(data);
    } catch (err) {
      throw err;
    }
  });
  app.get("/products", async (req, res, next) => {
    const _id = req.params.id;

    try {
      const data = await service.GetAllProducts();
      return res.status(200).json(data);
    } catch (err) {
      throw err;
    }
  });
  app.get("/product/category/:category", async (req, res, next) => {
    const category = req.params.category;

    try {
      const data = await service.GetProductsByCategory({ category });
      return res.status(200).json(data);
    } catch (err) {
      throw err;
    }
  });
  app.post("/product/ids", async (req, res, next) => {
    try {
      const { selectedIds } = req.body;
      const products = await service.GetSelectedProducts({ selectedIds });
      return res.status(200).json(products);
    } catch (err) {
      throw err;
    }
  });
};

module.exports = ProductAPI;
