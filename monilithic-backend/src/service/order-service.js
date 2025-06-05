const { OrderRepository } = require("../database/repository");

class OrderService {
  constructor() {
    this.repository = new OrderRepository();
  }
  async PlaceOrder({ _id }) {
    try {
      const result = await this.repository.PlaceOrder({ _id });
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = OrderService;
