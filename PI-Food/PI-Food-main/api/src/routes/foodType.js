const {Router}= require("express")
const {getTypes} = require ("./controllers/foodTypes")


const router= Router()

router.get('/', getTypes)

module.exports=router;