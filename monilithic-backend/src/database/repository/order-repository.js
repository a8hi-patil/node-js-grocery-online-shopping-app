const { CustomerModel, OrderModel } = require("../models");
class OrderRepository {
  async PlaceOrder({ _id }) {
    const existingCustomer = await CustomerModel.findById(_id).populate(
      "cart.product"
    );
    if (!existingCustomer) {
      return { message: "Customer not found !" };
    }

    const cartItems = existingCustomer.cart;
    if (cartItems.length == 0) {
      return { message: "Cart is empty" };
    }
    const newOrder = new OrderModel({
      userId: _id,
      items: cartItems.map((el) => {
        return {
          productId: el.product._id,
          name: el.product.name,
          quantity: el.unit,
          price: el.product.price,
        };
      }),
      totalAmount: cartItems.reduce((p, el) => el.product.price * el.unit, 0),
    });
    const orderResult = await newOrder.save();
    existingCustomer.cart = [];
    existingCustomer.orders.push(orderResult._id);
    await existingCustomer.save();
    return orderResult;
  }
}
module.exports = OrderRepository;
