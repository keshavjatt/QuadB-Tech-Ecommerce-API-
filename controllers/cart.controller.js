const Cart = require("../models/cart.model").Cart;
const Product = require("../models/product.model").Product;

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, products: [] });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    cart.products.push({ product: productId, quantity });
    await cart.save();
    res.status(201).json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    cart.products = cart.products.filter(
      (product) => product._id.toString() !== req.params.id
    );
    await cart.save();
    res.json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cartController = { getCart, addToCart, removeFromCart };
module.exports = cartController;