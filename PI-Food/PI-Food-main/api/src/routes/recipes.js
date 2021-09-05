const {Router}= require("express")
const{getAllByName, getRecipeById, createRecipe }= require("./controllers/recipes.js")


const router= Router()

router.get('/',  getAllByName);

router.get('/:id' ,getRecipeById )

router.post('/',createRecipe )

    


module.exports=router;