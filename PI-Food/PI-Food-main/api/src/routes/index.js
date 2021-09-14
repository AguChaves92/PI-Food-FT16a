const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Recipes = require('./recipes.js')
const Types= require ('./foodType.js')

const router = Router();

//methods defined in recipes and foodType

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipe', Recipes)
router.use('/type', Types)


module.exports = router;
