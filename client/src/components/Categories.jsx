import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { useCategories } from "../contexts/CategoriesContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Categories({setSelectedCategories}) {
  const { categoriesList } = useCategories();
  const [selectedCategories, setSelectedCategoriesLocal] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedCategories(value);

    setSelectedCategoriesLocal(value)
    console.log(selectedCategories);
  };

  return (
    <div style={{ backgroundColor: "#535353" }}>
      <FormControl
        sx={{ m: 0, width: 300 }}
        style={{ backgroundColor: "#535353", padding: 0, display: "flex"}}
      >
        <InputLabel
          id="demo-multiple-checkbox-label"
          style={{
            backgroundColor: "transparent",
            color: "#fff",
            fontFamily: "'Hanken Grotesk', sans-serif",
            padding: 0,
            margin: 0,
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            lineHeight: "normal",
            zIndex: 2,
            // maxHeight: "6vh",
            // bottom: "20%", 
            // position: "absolute"
          }}
        >
          Categories
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedCategories}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {categoriesList.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedCategories.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Categories;