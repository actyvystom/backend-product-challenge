import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";
export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const products = await Product.find({});
    return response.status(200).json(products);
  }
  if (request.method === "POST") {
    try {
      const product = await Product.create(request.body);
      return response.status(201).json(product);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}
