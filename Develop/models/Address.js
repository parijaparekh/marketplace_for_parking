const sequelize = require("../config/connection");
const { Model, DataTypes } = require('sequelize');

class Address extends Model{

}

Address.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }, 
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            default: "Western Australia",  
        }, 
        street_number:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        street_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        postcode:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        suburb:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        premisesName:{
            type: DataTypes.STRING,
            allowNull: true,
        }, 
        slotNo:{
            type: DataTypes.INTEGER, 
            allowNull:false,
        }       
    },//end of attributes
    {
        hooks:
        {
            beforeCreate: async (newAddressData) => {

            }, 
            beforeUpdate: async (updatedAddressData) => {

            },
        },
        sequelize,
        timestamps: false, 
        freezeTableName: true,
        underscored: true,
        modelName: 'address',
    }// other sequelize things
);//end of address.init()

module.exports = Address;