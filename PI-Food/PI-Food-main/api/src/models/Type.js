
const { DataTypes} = require('sequelize');
var Sequelize= require('sequelize');

//Diet Type model. ID is self generated

module.exports = (Sequelize) => {
	Sequelize.define("Type", {
    name:{
      type: DataTypes.STRING, 
      allowNull: false
    }
  }
  )    
  };