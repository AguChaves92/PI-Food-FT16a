
const { DataTypes, UUIDV1 } = require('sequelize');
var Sequelize= require('sequelize');


module.exports = (sequelize) => {
	sequelize.define("Type", {
    name:{
      type: DataTypes.STRING, 
      allowNull: false
    }
  }
  )    
  };