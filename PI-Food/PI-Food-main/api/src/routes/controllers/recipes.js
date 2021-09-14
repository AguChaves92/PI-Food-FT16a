const { Recipe, Type } = require("../../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Op, NUMBER } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

async function getAllByName(req, res, next) { //searches for 100 recipes in the api and then concats them with the db recipes
  console.log(req.query.name);
  let name = req.query.name;

  if (!name) {
    res
      .status(400)
      .json({ msg: "Se debe ingresar el nombre de la receta para buscar" });
  }

  try {
    // search in bd
    let dbrecipes = await Recipe.findAll({
      where: { title: { [Op.iLike]: `%${name}%` } },
      include: [
        { model: Type, attributes: ["name"], through: { attributes: [] } },
      ],
    });

    console.log(dbrecipes);

    // search in api

    let apiRecipe = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );

    let recipes = await apiRecipe.data.results.map((r) => {
      return {
        id: r.id,
        title: r.title,
        summary: r.summary,
        score: r.spoonacularScore,
        level: r.healthScore,
        image: r.image,
        Types: r.diets.map((diet) => {
          return { name: diet };
        }),
        instructions:
          r.analyzedInstructions[0] &&
          r.analyzedInstructions[0].steps &&
          r.analyzedInstructions[0].steps.map((step) => step.step),
        type: r.dishTypes,
      };
    });

    recipes.map((r) => {
      console.log("Recetas: " + r);
    });

    return res.send(dbrecipes.concat(recipes)); // concats  recipes from bd with recipes from api
  } catch (error) {
    next(error);
  }
}

async function getRecipeById(req, res, next) { //searches by id
  id = req.params.id;
  console.log(id);
  if (typeof id === "number") {
    console.log("its a number");
  } else if (typeof id === "string") {
    console.log("its a string");
  }

  if (!id) {
    res.status(400).json(console.log("An ID in needed"));
  }
  let recipe = {};
  console.log(id.length);
  try {
    if (id.length > 10) {
      console.log("bd");
      
      let DbRecipe = await Recipe.findOne({
        where: { id: id },
        include: [
          { model: Type, attributes: ["name"], through: { attributes: [] } },
        ],
      }); // si es larga es xq es de la bd
      return res.json(DbRecipe);
    } else {
      let apiRecipe = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      recipe = {
        id: apiRecipe.data.id,
        title: apiRecipe.data.title,
        summary: apiRecipe.data.summary,
        score: apiRecipe.data.spoonacularScore,
        level: apiRecipe.data.healthScore,
        image: apiRecipe.data.image,
        diets: apiRecipe.data.diets,
        instructions: //method based on the structure from the api
          apiRecipe.data.analyzedInstructions[0] &&
          apiRecipe.data.analyzedInstructions[0].steps &&
          apiRecipe.data.analyzedInstructions[0].steps.map((step) => step.step),
        dishTypes: apiRecipe.data.dishTypes,
      };

      
    }
    res.send(recipe);
  } catch (error) {
    next(error);
  }
}

async function createRecipe(req, res, next) { //creates a recipe in the bd
  console.log("this is the body: ", req.body);

  try {
    let { title, summary, score, level, instructions, Types } = req.body;

    if (!title || !summary) {
      return res.status(404).send("We need a diet and a summary");
    }
    let newRecipe = await Recipe.create({
      id: uuidv4(),
      title,
      summary,
      score,
      level,
      instructions,
    });

    const dietas = await Type.findAll({ //searches the type db to find types matching the ones passed
      where: {
        name: {
          [Op.in]: Types,
        },
      },
    });

    dietas.map((c) => { //makes the relation
      newRecipe.addType(c);
    });
    res.status(201).send(newRecipe);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllByName,
  getRecipeById,
  createRecipe,
};
