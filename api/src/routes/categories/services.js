const { getAllCategories } = require("../../utils/CategoriesDb");

const getCategories = async (req, res) => {
  try {
    // const arrCategories = [
    //   "Computers",
    //   "Algorithms",
    //   "Theory",
    //   "Engineering",
    //   "Software",
    //   "Business & Economics",
    //   "Collectibles",
    //   "Robotics",
    //   "Databases",
    //   "Education",
    //   "Games",
    //   "Accouting",
    // ];

    const cat = await getAllCategories();

    res.status(200).json(cat);
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = {
  getCategories,
};
