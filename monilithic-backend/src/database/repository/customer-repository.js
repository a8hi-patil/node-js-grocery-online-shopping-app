const { CustomerModel, AddressModel } = require("../models");

class CustomerRepository {
  async CreateCustomer({ email, password, phone, salt }) {
    try {
      const newCustomer = new CustomerModel({
        email,
        password,
        phone,
        salt,
        address: [],
      });
      let result = await newCustomer.save();
      return result._doc;
    } catch (err) {
      throw err;
    }
  }
  async CreateAddress({ _id, street, postalCode, country, city }) {
    try {
      let existingCustomer = await CustomerModel.findById(_id);
      if (existingCustomer) {
        const newAddress = new AddressModel({
          street,
          postalCode,
          country,
          city,
        });
        await newAddress.save();
        existingCustomer.address.push(newAddress);
      }
      await existingCustomer.save();
      return { message: "Address Stored Successfully" };
    } catch (err) {
      throw err;
    }
  }
  async FindCustomer({ email }) {
    try {
      const existingCustomer = await CustomerModel.findOne({ email });
      return existingCustomer._doc;
    } catch (err) {
      throw err;
    }
  }
  async FindCustomerById({ _id }) {
    try {
      const existingCustomer = await CustomerModel.findById(_id)
        .populate("address")
        // .populate("cart.product")
        // .populate("orders")
        .populate("wishlist");
      return existingCustomer._doc;
    } catch (err) {
      throw err;
    }
  }
  async GetWishList({ _id }) {
    try {
      const existingCustomer = await CustomerModel.findById(_id).populate(
        "wishlist"
      );
      return {
        products: existingCustomer.wishlist,
      };
    } catch (err) {
      throw err;
    }
  }
  async AddToWishList({ _id, productId }) {
    try {
      const existingCustomer = await CustomerModel.findById(_id);
      if (existingCustomer) {
        if (
          existingCustomer.wishlist.findIndex(
            (el) => el.toString() == productId
          ) !== -1
        ) {
          return {
            message: "Product already added to wishlist",
          };
        }
        existingCustomer.wishlist.push(productId);
        await existingCustomer.save();
        return { message: "Product added to wishlist" };
      }
      return {
        message: "Customer Not Found !!",
      };
    } catch (err) {
      throw err;
    }
  }
  async RemoveFromWishList({ _id, productId }) {
    try {
      const existingCustomer = await CustomerModel.findById(_id);
      if (existingCustomer) {
        existingCustomer.wishlist = existingCustomer.wishlist.filter((el) => {
          return el.toString() !== productId.toString();
        });
        await existingCustomer.save();
        return {
          message: "Product removed to wishlist",
        };
      }
      return {
        message: "Customer Not Found !!",
      };
    } catch (err) {
      throw err;
    }
  }
  async GetCart({ _id }) {
    try {
      const existingCustomer = await CustomerModel.findById(_id).populate(
        "cart.product"
      );
      return {
        products: existingCustomer.cart,
      };
    } catch (err) {
      throw err;
    }
  }
  async GetCustomerOrders({ _id }) {
    try {
      const existingCustomer = await CustomerModel.findById(_id).populate(
        "orders"
      );
      return {
        orders: existingCustomer.orders,
      };
    } catch (err) {
      throw err;
    }
  }
  async AddToCart({ _id, productId, unit }) {
    try {
      const existingCustomer = await CustomerModel.findById(_id);
      if (existingCustomer) {
        if (
          existingCustomer.cart.findIndex(
            (el) => el.product.toString() == productId
          ) !== -1
        ) {
          return {
            message: "Product already added to wishlist",
          };
        }
        existingCustomer.cart.push({ product: productId, unit });
        await existingCustomer.save();
        return { message: "Product added to wishlist" };
      }
      return {
        message: "Customer Not Found !!",
      };
    } catch (err) {
      throw err;
    }
  }
  async RemoveFromCart({ _id, productId }) {
    try {
      const existingCustomer = await CustomerModel.findById(_id);
      if (existingCustomer) {
        existingCustomer.cart = existingCustomer.cart.filter((el) => {
          return el.product.toString() !== productId.toString();
        });
        await existingCustomer.save();
        return {
          message: "Product removed to wishlist",
        };
      }
      return {
        message: "Customer Not Found !!",
      };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CustomerRepository;
