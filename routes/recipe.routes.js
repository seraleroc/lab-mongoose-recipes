import express from "express";
import recipeModel from "../models/Recipe.model.js";

const recipeRoute = express.Router();

recipeRoute.get("/all-recipes", async (req, res) => {
  try {
    const recipes = await recipeModel.find();
    return res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Erro na consulta por todas as receitas" });
  }
});

// POST - create
recipeRoute.post("/new-recipe", async (req, res) => {
  try {
    const newRecipe = await recipeModel.create(req.body);
    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Erro na criação de uma nova receita" });
  }
});

// POST - insert many
recipeRoute.post("/many-recipes", async (req, res) => {
  try {
    const newRecipe = await recipeModel.insertMany(req.body);
    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Erro na criação de novas receitas" });
  }
});

// PUT - edit
recipeRoute.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecipe = await recipeModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    return res.status(200).json(updatedRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Erro na alteração de uma receita" });
  }
});

//DELETE
recipeRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRecipe = await recipeModel.findByIdAndDelete(id);
    return res.status(200).json(deleteRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Erro para apagar uma receita" });
  }
});

export default recipeRoute;
