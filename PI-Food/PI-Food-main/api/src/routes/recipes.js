const {Router}= require("express")
const{getAllByName, getRecipeById, createRecipe }= require("./controllers/recipes.js")


const router= Router()

router.get('/',  getAllByName);// searches the api and the db for recipes with said name

router.get('/:id' ,getRecipeById ) //searches the api or the bd for the recipe with the ID

router.post('/',createRecipe ) // creates a new recipe in the db

    


module.exports=router;