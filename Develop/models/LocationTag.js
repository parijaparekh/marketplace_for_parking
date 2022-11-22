const sequelize = require("../config/connection");
const { Model, DataTypes, Sequelize } = require('sequelize');
const ParkingSlot =require('./ParkingSlot');

class LocationTag extends Model{

}

LocationTag.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }, 
        locationTag: {
            type: Sequelize.ENUM("Airport", "City", "Leederville", "Subiacco", "Elizabeth Quay", "Royal Perth Show", "WACA", "Optus", "CGH", "PCH", "HPH"),
            allowNull: false,
            default: "Airport",  
        }, 
        parkingSlotId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ParkingSlot,
                key: 'id',
            },
        },
    },//end of attributes
    {
        hooks:
        {
            beforeCreate: async (newLocationTagData) => {

            }, 
            beforeUpdate: async (updatedLocationTagData) => {

            },
        },
        sequelize,
        timestamps: false, 
        freezeTableName: true,
        underscored: true,
        modelName: 'locationTag',
    }// other sequelize things
);//end of address.init()

module.exports = LocationTag;