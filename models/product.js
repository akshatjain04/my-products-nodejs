import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  ID: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const productModel = mongoose.model("product", productSchema);

export { productModel };
