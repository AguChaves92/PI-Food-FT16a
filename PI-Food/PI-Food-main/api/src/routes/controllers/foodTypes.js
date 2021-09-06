const{ Type } = require('../../db')
const axios = require('axios')
require('dotenv').config();
const {API_KEY}= process.env;






async function getTypes(req, res, next){
    
    try{
    const dietTypesDb= await Type.findAll() // busca en la bd y si no encuentra fetchea
    if(dietTypesDb.length===0){
        let allTypes= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
        
        allTypes=allTypes.data.results.map((elem)=>{ //saca solo las dietas
            return elem.diets 
        })

        allTypes=allTypes.flat()// aplana el array

        orderedTypes=allTypes.filter((diet, index) => { 
            return allTypes.indexOf(diet) === index   
        }) // saca repetidos

        await orderedTypes.forEach(element => {
            Type.create({
                name:element
            })
        }); // crea en la bd

    } else if (dietTypesDb >0){
       return res.status(200).send(dietTypesDb)
    }

    


    const map = dietTypesDb.map((e) => {
        return e.dataValues.name
    })
    res.status(200).send(map); //devuelve el mapa

} catch(error){next(error)}


}

module.exports={getTypes}