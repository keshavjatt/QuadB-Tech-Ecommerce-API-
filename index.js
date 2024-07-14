const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/db.config");
const { router: authRoutes } = require("./routes/auth.routes");
const { router: productRoutes } = require("./routes/product.routes");
const { router: cartRoutes } = require("./routes/cart.routes");
const { swaggerUi, swaggerSpec } = require("./swaggerConfig");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());

// Cors setup for FrontEnd Integration process
app.use(cors());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));