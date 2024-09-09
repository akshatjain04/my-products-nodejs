import express from "express";
import mongoose from "mongoose";
import { productRouter } from "./routers/router.js";

const app = express();
app.use(express.json());
const mongoConnectionString = "mongodb://localhost:27017/my-products-nodejs-db";

await mongoose
  .connect(mongoConnectionString)
  .then(() => {
    console.log("Successfully connected to mongo db");
  })
  .catch((err) => {
    console.log(`Error connecting to mongodb: ${err}`);
  });

app.use("/api/products", productRouter);

app.listen(3000, () => {
  console.log("server is listening at port 3000");
});

// productRouter.put("/:id", async function (req, resp) {
//   const id = req.params.id;
//   if (!mongoose.isValidObjectId(id)) {
//     resp.json({ msg: `Invalid object ID ${id}` }).status(400);
//   } else {
//     const product = await productModel.findById(id);
//     if (!product) {
//       resp.json({ msg: `product with id ${id} not found` }).status(404);
//     } else {
//       product.id = req?.body?.id;
//       product.name = req?.body?.name;
//       product.description = req?.body?.description || " ";
//       product.price = req?.body?.price;
//       resp
//         .json({ msg: `product with id ${id} updated`, newProduct: product })
//         .status(200);
//     }
//   }
// });
