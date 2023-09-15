import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCategories } from "../../contexts/CategoriesContext";

function AddCategory() {
  const { categoriesList, setCategoriesList } = useCategories();
  const [newCategory, setNewCategory] = useState("");

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategoriesList([...categoriesList, newCategory]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategoriesList(categoriesList.filter((category) => category !== categoryToDelete));
  };

  return (
    <div style={{}}>
      <TextField
        label="Add Category"
        value={newCategory}
        onChange={handleNewCategoryChange}
        sx={{ m: 1, width: 300 }}
        style={{backgroundColor: "#fff", color: "black", borderRadius: "14px", border: "none"}}
      />
      <Button variant="contained" onClick={handleAddCategory}>
        Add
      </Button>
      <div>
        {categoriesList.map((category) => (
          <div key={category}>
            {category}
            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteCategory(category)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddCategory;