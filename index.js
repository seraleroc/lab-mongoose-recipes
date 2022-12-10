// Iteration 2 - Create a recipe
// In the index.js, we first connect to the database using mongoose.connect() and following the connection we call the method Recipe.deleteMany() to remove any existing documents from the recipes collection:

// // ...

// mongoose
//   .connect(MONGODB_URI)
//   .then(x => {
//     console.log(`Connected to the database: "${x.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     return Recipe.deleteMany();
//   })
// // ...
// Then, you should add a new recipe document to the database by calling the Model.create method and passing it the recipe details as an object. After inserting the recipe, you should console.log the title of the recipe.

// You can use MongoDB Compass to double-check that everything is working as intended.

// To run your code, remember you should use:

// node index.js
// ==================================================

import express from "express";
import * as dotenv from "dotenv";

import connect from "./config/db.config.js";
import recipeRoute from "./routes/recipe.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

connect();

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "lab-mongoose-recipes" });
});

app.use("/recipe", recipeRoute);

app.listen(process.env.PORT, () => {
  console.log(
    `App up and running on port http://localhost:${process.env.PORT}`
  );
});
