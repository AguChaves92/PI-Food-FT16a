const { Recipe, Type } = require("../../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Op } = require("sequelize");

async function getAllByName(req, res, next) {
  console.log(req.query);
  let name = req.query.name;

  if (!name) {
    res
      .status(400)
      .json({ msg: "Se debe ingresar el nombre de la receta para buscar" });
  }

  try {
    // buscar en la bd
    let dbrecipes = await Recipe.findAll({
      where: { title: { [Op.iLike]: `%${name}%` } },
      include: [
        { model: Type, attributes: ["name"], through: { attributes: [] } },
      ],
    });

    let dbFormated = [];

    dbResult.map((e) => {
      let diets = e["diets"];
      let formated = [];
      diets.map((d) => formated.push(d["name"]));
      let obj = RecipeFormater(e.id, e.name, e.score, e.image, formated);
      dbFormated.push(obj);
    });

    // buscar en api

    let apiRecipe = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );

    let recipes = [];
    //si tiene resultados mapea los resultados y genera objetos con propiedades que manda a un array
    if (apiRecipe.data.results) {
      apiRecipe.data.results.map((r) => {
        let elem = {
          id: r.id,
          title: r.title,
          summary: r.summary,
          score: r.spoonacularScore,
          level: r.healthScore,
          image: r.image,
          diets: r.diets,
          instructions:
            r.analyzedInstructions[0] &&
            r.analyzedInstructions[0].steps &&
            r.analyzedInstructions[0].steps.map((step) => step.step),
          type: r.dishTypes,
        };
        console.log(elem);
        recipes.push(elem);
      });
    }
    res.send(dbrecipes.concat(recipes)); // concatena las recetas de la bd con los de la api
  } catch (error) {
    next(error);
  }
}

async function getRecipeById(req, res, next) {
  id = req.params.id;
  id = parseInt(id);

  if (!id) {
    res.status(400).json(console.log("An ID in needed"));
  }
  let recipe = {};

  try {
    if (id.length >= 10) {
      let DbRecipe = await Recipe.findByPK(id, { include: Type }); // si es larga es xq es de la bd
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
        instructions:
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

async function createRecipe(req, res, next) {
  try {
    const {
      title,
      summary,
      score,
      level,
      ingredients,
      instructions,
      image,
      type,
    } = req.body;
    const recipe = await Recipe.create({
      title,
      summary,
      score: score || 0,
      level: level || 0,
      ingredients,
      instructions,
      image,
    });

    const dietsDB = await Type.findAll({
      where: { name: type },
    });
    await recipe.addType(dietsDB);

    res.status(200).json({ message: "Receta creada con exito" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllByName,
  getRecipeById,
  createRecipe,
};