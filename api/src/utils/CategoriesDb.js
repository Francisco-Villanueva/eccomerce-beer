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
    const arrCategories = [
      "Computers",
      "Algorithms",
      "Theory",
      "Engineering",
      "Software",
      "Business & Economics",
      "Collectibles",
      "Robotics",
      "Databases",
      "Education",
      "Games",
      "Accouting",
    ];

    const check = await Category.findOne({
      where: {
        category: arrCategories[0],
      },
    });

    const data = arrCategories.map((m) => ({ category: m }));

    if (!check) {
      await Category.bulkCreate(data, { returning: true });
    }
    const allCategories = await Category.findAll();
    return allCategories;
  } catch (error) {
    console.log(error);
  }
};
const deleteCategory = async (category) => {
  try {
    const cat = await Category.findOne({
      where: {
        category,
      },
    });

    if (!cat) return "this category not exist!";

    const deletedCategory = await Category.destroy({
      where: {
        category,
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
