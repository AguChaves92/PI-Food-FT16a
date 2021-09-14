const { DataTypes, UUIDV1 } = require('sequelize');
var Sequelize= require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// Recipe model. UUIDV4 used for diferentiatiopn between api and db recipes


module.exports = (sequelize) => {
	sequelize.define("Recipe", {
    
    id:{
        primaryKey:true,
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false
      },

    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: false
    },
    score:{
      type: DataTypes.INTEGER
    },
    level:{
      type: DataTypes.INTEGER
    },
    instructions:{
      type: DataTypes.TEXT
    },
  })
};
  

  
  

