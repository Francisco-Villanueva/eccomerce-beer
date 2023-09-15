const { Category } = require("../db/models");

const createCategory = async (category) => {
  try {
    const newCategory = await Category.findOrCreate({
      where: {
        category,
      },
    });

    return { msg: "new category created!", newCategory };
  } catch (error) {
    console.log(error);
  }
};
const getAllCategories = async () => {
  try {
    const allCategories = await Category.findAll();
    return allCategories;
  } catch (error) {
    console.log(error);
  }
};
const deleteCategory = async (categoryId) => {
  try {
    const category = await Category.findByPk(categoryId);

    if (!category) return "this category not exist!";

    const deletedCategory = await Category.destroy({
      where: {
        id: categoryId,
      },
    });

    return { msg: "Category deleted!", deletedCategory };
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
};
