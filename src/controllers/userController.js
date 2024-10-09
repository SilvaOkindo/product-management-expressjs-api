import jsonwebtoken from "jsonwebtoken";
import { comparePassword } from "../helpers/compare-password.js";
import { hashPassword } from "../helpers/hash-password.js";
import { User } from "../models/user.js";

export const registerUser = async (request, response) => {
  console.log(request.body);

  try {
    const newUser = User(request.body);
    //if(!newUser) return response.status(400).json({message: "Cannot save empty user"})
    newUser.password = hashPassword(newUser.password);
    await newUser.save();
    return response.sendStatus(200);
  } catch (err) {
    response.status(400).json({ message: err.message });
  }
};

export const login = async (request, response) => {
  const { username, password } = request.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    const isMatch = comparePassword(password, user.password);

    if (!isMatch) {
      return response.status(400).json({ message: "Wrong password" });
    }

    const token = jsonwebtoken.sign(
      {
        id: user._id,
        role: user.role,
      },
      "my-secret-key",
      {
        expiresIn: "1h",
      }
    );

    return response.status(200).json({ token });
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (request, response) => {
  const users = await User.find()

  response.status(200).send(users)
};

export const getUserById = async (request, response) => {
  const {id} = request.params
  try {

    const user = await User.findById(id)

    if(!user) {
      return response.status(404).json({message: "User not found"})
    }

    user.password = undefined

    return response.status(200).json(user)
    
  } catch (error) {
    response.status(400).json({message: error.message})
  }
};

export const deleteUser = (request, response) => {
  
};

export const updateUser = (request, response) => {};
