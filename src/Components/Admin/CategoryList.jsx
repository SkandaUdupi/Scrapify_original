import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CategoryCard from "./CategoryCard";
import { v4 as uuidv4 } from "uuid";
const CategoryList = ({ onClick }) => {
  // const category = [
  //   {
  //     id: uuidv4(),
  //     cat: "Ferrous",
  //     subcategories: [
  //       { subcat: "Steel", subCatPrice: 15.5 },
  //       { subcat: "Iron", subCatPrice: 10.25 },
  //       // Add more subcategories as needed
  //     ],
  //   },
  //   {
  //     id: uuidv4(),
  //     cat: "Non-Ferrous",
  //     subcategories: [
  //       { subcat: "Aluminum", subCatPrice: 20.75 },
  //       { subcat: "Copper", subCatPrice: 30.0 },
  //     ],
  //   },
  //   {
  //     id: uuidv4(),
  //     cat: "E-Scrap",
  //     subcategories: [
  //       { subcat: "Circuit Boards", subCatPrice: 5.5 },
  //       { subcat: "Hard Drives", subCatPrice: 8.75 },
  //       // Add more subcategories as needed
  //     ],
  //   },
  //   // Add more categories as needed
  // ];

  const [categories, setCategories] = useState(category); //managing data from/to category object
  const [input, setInput] = useState(""); //managing user input of materials

  const onMaterialInput = (e) => {
    //data from user input is fed into state using onChange
    setInput(e.target.value);
  };

  const onAddCategory = (e) => {
    //add data to object when clicked on + button
    //input - has data which user inputs

    // setCategories((prevState) => {
    //   return [...prevState, { id: uuidv4(), cat: input, subcategories: null }];
    // });
    setInput("");
  };

  const onSelectCategory = (id, subCat) => {
    //when user clicks on a category,the category is sent to Info.jsx through manin.jsx
    onClick(id, subCat);
  };
  return (
    <Grid container sx={{ marginBottom: "3vh" }} spacing={4}>
      <Grid item>
        <Card elevation={1}>
          <CardHeader title="Add Category" />

          <CardContent>
            <Stack direction="row" alignItems="bottom" spacing={2}>
              <FormControl>
                <FormLabel sx={{ fontWeight: "bold" }}>Material:</FormLabel>
                <Input
                  placeholder="Type in here…"
                  variant="outlined"
                  onChange={onMaterialInput}
                  value={input}
                />
              </FormControl>
              <CardActions>
                <IconButton onClick={onAddCategory}>
                  <AddIcon />
                </IconButton>
              </CardActions>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <CategoryCard category={categories} onClick={onSelectCategory} />
    </Grid>
  );
};

export default CategoryList;
