import express from "express";
import { productModel } from "../models/product.js";
import mongoose from "mongoose";

const productRouter = express.Router();

productRouter.get("/", async function (req, resp) {
  const products = await productModel.find();
  resp.send(products).status(200);
});

productRouter.post("/", async function (req, resp) {
  const product = new productModel();
  product.ID = req?.body?.ID;
  product.name = req?.body?.name;
  product.description = req?.body?.description || " ";
  product.price = req?.body?.price;
  await productModel.create(product);
  resp.json({ msg: "product added", product: product }).status(200);
});

productRouter.get("/:id", async function (req, resp) {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    resp.json({ msg: `Invalid object ID ${id}` }).status(400);
  } else {
    const product = await productModel.findById(id);
    if (!product) {
      resp.json({ msg: `product with id ${id} not found` }).status(404);
    } else {
      resp
        .json({ msg: `product with id ${id} found`, product: product })
        .status(200);
    }
  }
});

productRouter.put("/:id", async function (req, resp) {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    resp.json({ msg: `Invalid object ID ${id}` }).status(400);
  } else {
    const product = new productModel();
    product.ID = req?.body?.ID;
    product.name = req?.body?.name;
    product.description = req?.body?.description || " ";
    product.price = req?.body?.price;
    const newProduct = await productModel.findByIdAndUpdate(id, product);
    if (!newProduct) {
      resp.json({ msg: `product with id ${id} not found` }).status(404);
    } else {
      resp
        .json({ msg: `product with id ${id} updated`, newProduct: newProduct })
        .status(200);
    }
  }
});

productRouter.delete("/:id", async function (req, resp) {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    resp.json({ msg: `Invalid object ID ${id}` }).status(400);
  } else {
    const deleted = await productModel.findByIdAndDelete(id);
    if (!deleted) {
      resp.json({ msg: `product with id ${id} not found` }).status(404);
    } else {
      resp.json({ msg: `product with id ${id} deleted` }).status(200);
    }
  }
});

export { productRouter };
