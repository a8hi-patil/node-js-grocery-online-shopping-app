const { ProductRepository } = require("../database/repository");

class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }
  async CreateProduct({
    name,
    desc,
    banner,
    type,
    unit,
    price,
    available,
    supplier,
  }) {
    try {
      const result = await this.repository.CreateProduct({
        name,
        desc,
        banner,
        type,
        unit,
        price,
        available,
        supplier,
      });
      return result;
    } catch (err) {
      throw err;
    }
  }
  async GetAllProducts() {
    try {
      let result = await this.repository.GetAllProducts();
      let categories = {};
      result.map((el) => {
        categories[el.type] = el.type;
      });
      return {
        products: result,
        categories,
      };
    } catch (err) {
      throw err;
    }
  }

  async GetProductDescription({ _id }) {
    try {
      const product = await this.repository.FindProductById({ _id });
      return product;
    } catch (err) {
      throw err;
    }
  }

  async GetProductsByCategory({ category }) {
    try {
      const products = await this.repository.FindProductByCategory({
        category,
      });
      return products;
    } catch (err) {
      throw err;
    }
  }

  async GetSelectedProducts({ selectedIds }) {
    try {
      const products = await this.repository.FindProductBySelectedIds({
        selectedIds,
      });
      return products;
    } catch (err) {
      throw err;
    }
  }

  async GetProductById({ _id }) {
    try {
      return await this.repository.FindProductById({ _id });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ProductService;
