const { ProductModel } = require("../models");

class ProductRepository {
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
      const newProduct = new ProductModel({
        name,
        desc,
        banner,
        type,
        unit,
        price,
        available,
        supplier,
      });
      const result = await newProduct.save();
      return result;
    } catch (err) {
      throw err;
    }
  }
  async GetAllProducts() {
    try {
      return await ProductModel.find();
    } catch (err) {
      throw err;
    }
  }
  async FindProductById({ _id }) {
    try {
      return await ProductModel.find({ _id });
    } catch (err) {
      throw err;
    }
  }
  async FindProductByCategory({ category }) {
    try {
      return await ProductModel.find({ type: category });
    } catch (err) {
      throw err;
    }
  }
  async FindProductBySelectedIds({ selectedIds }) {
    try {
      let result = await ProductModel.find()
        .where("_id")
        .in([...selectedIds])
        .exec();
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ProductRepository;
