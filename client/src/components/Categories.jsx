import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

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

function Categories({ setSelectedCategories }) {
  const [selectedCategories, setSelectedCategoriesLocal] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedCategoriesLocal(value);

    setSelectedCategories(value);
  };


  return (
    <div style={{ backgroundColor: "#535353" }}>
      <FormControl
        sx={{ m: 0, width: 200 }}
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
          input={<OutlinedInput label="Categories" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          style={{ 
            backgroundColor: "#535353",
            alignItems: "center",
            padding: 0,
            margin: 0,
            marginLeft: 5,
            maxHeight: "8vh",
            zIndex: 1,
          }}
        >
          {/* <InputLabel style={{color: "#fff"}}>
          Categories
          </InputLabel> */}
          {arrCategories.map((name) => (
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
