import mongoose from 'mongoose';

// Define a schema for individual product items within the cart
const productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 1, // Default to 1 if no quantity is specified
    required: true
  }
});

// Define the Cart schema
const cartSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  products: [productSchema], // Array of product items
  totalPrice: {
    type: Number,
    default: 0, // Calculate total price dynamically
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Cart model from the schema
const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
