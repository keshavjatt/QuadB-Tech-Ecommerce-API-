const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: `
        ## User Authentication:
        ### POST /register
        **Summary:** Register a new user.
        
        **Description:** This endpoint allows a new user to register by providing their name, mobile number, address, username, password, and role (either 'user' or 'admin'). On successful registration, a confirmation message is returned.
        
        **Responses:**
        - 200: User registered successfully.
        - 400: Bad request.
        
        ### POST /login
        **Summary:** Authenticate a user and return a JWT.
        
        **Description:** This endpoint allows a registered user to log in by providing their username and password. On successful authentication, a JWT (JSON Web Token) is returned which must be used to access protected routes.
        
        **Responses:**
        - 200: User logged in successfully.
        - 400: Invalid credentials.
        
        ## Product Management:
        ### GET /products
        **Summary:** Retrieve a list of products.
        
        **Description:** This endpoint fetches a list of all available products. No authentication is required.
        
        **Responses:**
        - 200: List of all products.
        
        ### GET /products/{id}
        **Summary:** Retrieve details of a specific product.
        
        **Description:** This endpoint fetches details of a specific product by its ID. No authentication is required.
        
        **Responses:**
        - 200: Product details.
        - 404: Product not found.
        
        ### POST /products
        **Summary:** Add a new product (admin only).
        
        **Description:** This endpoint allows an admin to add a new product by providing its name, description, and price. Authentication with a JWT token is required, and only users with the 'admin' role can access this endpoint.
        
        **Responses:**
        - 201: Product added successfully.
        - 401: Unauthorized.
        
        ### PUT /products/{id}
        **Summary:** Update an existing product (admin only).
        
        **Description:** This endpoint allows an admin to update the details of an existing product by its ID. Authentication with a JWT token is required, and only users with the 'admin' role can access this endpoint.
        
        **Responses:**
        - 200: Product updated successfully.
        - 401: Unauthorized.
        - 404: Product not found.
        
        ### DELETE /products/{id}
        **Summary:** Delete a product (admin only).
        
        **Description:** This endpoint allows an admin to delete a product by its ID. Authentication with a JWT token is required, and only users with the 'admin' role can access this endpoint.
        
        **Responses:**
        - 200: Product deleted successfully.
        - 401: Unauthorized.
        - 404: Product not found.
        
        ## Shopping Cart:
        ### GET /cart
        **Summary:** Retrieve the user's shopping cart.
        
        **Description:** This endpoint retrieves the contents of the authenticated user's shopping cart. A JWT token is required to access this endpoint.
        
        **Responses:**
        - 200: User cart retrieved successfully.
        - 401: Unauthorized.
        
        ### POST /cart
        **Summary:** Add an item to the cart.
        
        **Description:** This endpoint allows the authenticated user to add an item to their shopping cart by providing the product ID and quantity. A JWT token is required to access this endpoint.
        
        **Responses:**
        - 200: Item added to cart.
        - 401: Unauthorized.
        
        ### DELETE /cart/{id}
        **Summary:** Remove an item from the cart.
        
        **Description:** This endpoint allows the authenticated user to remove an item from their shopping cart by providing the product ID. A JWT token is required to access this endpoint.
        
        **Responses:**
        - 200: Item removed from cart.
        - 401: Unauthorized.
      `,
    },
    servers: [
      {
        url: "https://quadb-tech-ecommerce-api.onrender.com/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};