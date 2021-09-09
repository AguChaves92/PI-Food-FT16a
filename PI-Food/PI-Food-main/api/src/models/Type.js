
const { DataTypes} = require('sequelize');
var Sequelize= require('sequelize');


module.exports = (Sequelize) => {
	Sequelize.define("Type", {
    name:{
      type: DataTypes.STRING, 
      allowNull: false
    }
  }
  )    
  };