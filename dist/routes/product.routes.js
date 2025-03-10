"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const productRouter = (0, express_1.Router)();
let products = [];
// Get products
productRouter.get("/", (req, res) => {
    console.log("start get");
    res.status(200).json(products);
});
// Add product
productRouter.post("/", (req, res) => {
    console.log("start post");
    console.log(req);
    const newProduct = {
        id: (0, uuid_1.v4)(),
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
// Get products
productRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const product = products.find((product) => product.id === id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({ message: "Product not found!" });
    }
});
// update product
productRouter.put("/:id", (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex((product) => product.id === id);
    if (!productIndex) {
        res.status(404);
    }
    products[productIndex] = Object.assign(Object.assign({}, products[productIndex]), req.body);
    res.status(200).json({ message: "Product has updated" });
});
// delete product
productRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    products = products.filter((product) => product.id !== id);
    res.status(200).json({ message: "Product has deleted" });
});
exports.default = productRouter;
