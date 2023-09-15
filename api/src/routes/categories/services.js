const { getAllCategories } = require("../../utils/CategoriesDb");

const getCategories = async (req, res) => {
  try {
    const cat = await getAllCategories();

    res.status(200).json(cat);
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = {
  getCategories,
};
