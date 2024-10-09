import { Category } from "../models/category.js";

export const getCategories = async (request, response) => {
  const categories = await Category.find();
  response.status(200).send(categories);
};

export const getCategory = async (request, response) => {
  const { id } = request.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return response.sendStatus(404);
    }

    return response.status(200).send(category);
  } catch (error) {
    response.json(400).json({ message: error.message });
  }
};

// protected route

export const createCategory = async (request, response) => {
  try {
    const newCategory = Category(request.body);

    console.log(newCategory)


    if(!newCategory) return response.sendStatus(400)

    await newCategory.save();
    return response.sendStatus(201);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
};

export const updateCategory = async (request, response) => {

    const {id} = request.params

    try {

        const updatedCategory = await Category.findByIdAndUpdate(
            {_id: id},
            {$set: request.body}
        )

        if(updatedCategory.matchCount === 0) {
            return response.status(404).json({message: "Category not found"})
        }

        return response.status(200).json({message: "Category updated"})
        
    } catch (error) {

        return response.status(500).json({message: error.message})
        
    }

};

export const editCategory = async (request, response) => {

    const {id} = request.params

    try {

        const updatedCategory = await Category.findByIdAndUpdate(
            {_id: id},
            {$set: request.body},
            {new: true}
        )

        if(updatedCategory.matchCount === 0) {
            return response.status(404).json({message: "Category not found"})
        }

        return response.status(200).json({message: "Category updated"})
        
    } catch (error) {

        return response.status(500).json({message: error.message})
        
    }

};

export const deleteCategory = async (request, response) => {
    const {id} = request.params

    try {
        
         const deletedCategory = await Category.findByIdAndDelete(id)
         if(!deletedCategory) {
            return response.sendStatus(404)
         }

         return response.status(200).json({message: "Category deleted"})

    } catch (error) {
        return response.status(500).json({message: error.message})
    }
};
