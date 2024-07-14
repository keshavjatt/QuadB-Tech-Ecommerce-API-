const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cart.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Shopping Cart
 *   description: Shopping cart routes
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get user cart
 *     tags: [Shopping Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User cart retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/cart", authMiddleware, getCart);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add to cart
 *     tags: [Shopping Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item added to cart
 *       401:
 *         description: Unauthorized
 */
router.post("/cart", authMiddleware, addToCart);

/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     summary: Remove from cart
 *     tags: [Shopping Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Item removed from cart
 *       401:
 *         description: Unauthorized
 */
router.delete("/cart/:id", authMiddleware, removeFromCart);

const cartRoutes = { router };
module.exports = cartRoutes;