import { Category } from "../models/category.js";
import { Product } from "../models/product.js";

export const getAllProducts = async (request, response) => {
  const products = await Product.find().populate("category", "categoryName");

  response.status(200).send(products);
};

export const getProduct = async (request, response) => {
  const { id } = request.params;

  try {
    const product = await Product.findById(id).populate("category");
    if (!product)
      return response.status(404).json({ message: "Product not found" });

    response.status(200).send(product);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const createProduct = async (request, response) => {
  try {
    const { productName, price, description, category } = request.body;

    const findCategory = await Category.findById(category);

    //console.log("category id", category)

    //console.log(findCategory)

    if (!findCategory)
      return response.status(404).json({ message: "Category not found" });

    const newProduct = Product({ productName, price, description, category });

    await newProduct.save();

    return response.sendStatus(201);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (request, response) => {
  const { id } = request.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      { $set: request.body }
    );

    if (!updatedProduct)
      return response.status(404).json({ message: "Product not found" });

    return response
      .status(200)
      .json({ message: "Product successfully updated" });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const editProduct = async (request, response) => {
  const { id } = request.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      { $set: request.body },
      { $new: true }
    );

    if (!updatedProduct)
      return response.status(404).json({ message: "Product not found" });

    return response
      .status(200)
      .json({ message: "Product successfully updated" });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (request, response) => {
  const { id } = request.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct)
      return response.status(404).json({ message: "Product not found" });

    return response.status(200).json(deletedProduct);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const getProductsByCategory = async (request, response) => {
  const { categoryId } = request.params;

  try {
    const productPerCategory = await Product.find({
      category: categoryId,
    }).populate("category", "categoryName");

    response.status(200).send(productPerCategory);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const searchProducts = async (request, response) => {
  try {
    const { name, description, minPrice, maxPrice } = request.query;

    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (description) {
      filter.name = { $regex: description, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = parseFloat(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = parseFloat(maxPrice);
      }
    }

    console.log("filters: ", filter)

    const products = await Product.find(filter);

    if(products.length === 0) {
        return response.status(404).json({message: "No items found"})
    }

    response.status(200).send(products);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
