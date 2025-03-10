import { Router, Request, Response } from "express";
import { Product } from "../types/product";
import { v4 as uuidv4 } from "uuid";

const productRouter = Router();

let products: Product[] = [];

// Get products
productRouter.get("/", (req: Request, res: Response) => {
  console.log("start get");
  res.status(200).json(products);
});

// Add product
productRouter.post("/", (req: Request, res: Response) => {
  console.log("start post");
  console.log(req);

  const newProduct: Product = {
    id: uuidv4(),
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_price: req.body.product_price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Get products
productRouter.get("/:id", (req: Request<{ id: string }>, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found!" });
  }
});

// update product
productRouter.put("/:id", (req: Request<{ id: string }>, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((product) => product.id === id);
  if (!productIndex) {
    res.status(404);
  }
  products[productIndex] = { ...products[productIndex], ...req.body };
  res.status(200).json({ message: "Product has updated" });
});

// delete product
productRouter.delete("/:id", (req: Request<{ id: string }>, res) => {
  const { id } = req.params;
  products = products.filter((product) => product.id !== id);
  res.status(200).json({ message: "Product has deleted" });
});

export default productRouter;
