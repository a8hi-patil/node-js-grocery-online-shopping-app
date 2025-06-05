const { CustomerRepository } = require("../database/repository");
const {
  createSalt,
  hashPassword,
  validatePassword,
  generateToken,
} = require("../utils");
class CustomerService {
  constructor() {
    this.repository = new CustomerRepository();
  }

  async SignIn({ email, password }) {
    try {
      const existingCustomer = await this.repository.FindCustomer({ email });
      if (existingCustomer) {
        const isValidPassword = await validatePassword(
          password,
          existingCustomer.password,
          existingCustomer.salt
        );
        if (isValidPassword) {
          const token = await generateToken({
            email: existingCustomer.email,
            _id: existingCustomer._id,
          });
          return { _id: existingCustomer._id, token };
        } else {
          return { message: "Wrong Password !!" };
        }
      } else {
        return { message: "Email not exist!!" };
      }
    } catch (err) {
      throw err;
    }
  }
  async SignUp({ email, password, phone }) {
    try {
      let salt = await createSalt();
      let hashedPassword = await hashPassword(password, salt);
      let newCustomer = await this.repository.CreateCustomer({
        email,
        password: hashedPassword,
        phone,
        salt,
      });
      return newCustomer;
    } catch (err) {
      throw err;
    }
  }
  async AddNewAddress({ _id, street, postalCode, country, city }) {
    try {
      let result = await this.repository.CreateAddress({
        _id,
        street,
        postalCode,
        country,
        city,
      });
      return result;
    } catch (err) {
      throw err;
    }
  }
  async GetCustomerByEmail({ email }) {
    try {
      let result = await this.repository.FindCustomer({ email });
      return result;
    } catch (err) {
      throw err;
    }
  }
  async GetCustomerByID({ _id }) {
    try {
      let result = await this.repository.FindCustomerById({ _id });
      return result;
    } catch (err) {
      throw err;
    }
  }
  async GetCustomerWishlist({ _id }) {
    try {
      let result = await this.repository.GetWishList({ _id });
      return result;
    } catch (err) {
      throw err;
    }
  }
  async AddToWishList({ _id, productId }) {
    try {
      let result = this.repository.AddToWishList({ _id, productId });
      return result;
    } catch (err) {
      throw err;
    }
  }
  async RemoveFromWishList({ _id, productId }) {
    try {
      let result = this.repository.RemoveFromWishList({ _id, productId });
      return result;
    } catch (err) {
      throw err;
    }
  }
  async GetCustomerCart({ _id }) {
    try {
      let result = await this.repository.GetCart({ _id });
      return result;
    } catch (err) {
      throw err;
    }
  }
  async GetCustomerOrders({ _id }) {
    try {
      let result = await this.repository.GetCustomerOrders({ _id });
      return result;
    } catch (err) {
      throw err;
    }
  }
  async AddToCart({ _id, productId, unit }) {
    try {
      let result = this.repository.AddToCart({ _id, productId, unit });
      return result;
    } catch (err) {
      throw err;
    }
  }
  async RemoveFromCart({ _id, productId }) {
    try {
      let result = this.repository.RemoveFromCart({ _id, productId });
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = CustomerService;
