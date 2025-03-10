import express from "express";
import productRouter from "./routes/product.routes";

// Create server
const app = express();
app.use(express.json());
// Routes
app.use("/products", productRouter);

// Fallback
app.use((req, res, next) => {
  res.status(404).send("Cannot find what you are looking for :(");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
