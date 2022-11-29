const sequelize = require("../config/connection");
const { Model, DataTypes } = require('sequelize');
const ParkingSlot = require('./ParkingSlot');

class ParkingSlotDates extends Model{

}

ParkingSlotDates.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        parkingSlotId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ParkingSlot,
                key: 'id',
            },
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        }, 
        rate:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            defaultValue: 20.00,   
        }, 
    },//end of attributes
    {
        hooks:
        {
            beforeCreate: async (newParkingSlotDatesData) => {

            }, 
            beforeUpdate: async (updatedParkingSlotDatesData) => {

            },
        },
        sequelize,
        timestamps: false, 
        freezeTableName: true,
        underscored: true,
        modelName: 'parkingSlotDates',
    }// other sequelize things
);//end of parkingSlotDates.init()

module.exports = ParkingSlotDates;