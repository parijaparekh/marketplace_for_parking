const sequelize = require("../config/connection");
const { Model, DataTypes, Sequelize } = require('sequelize');
const Address = require("./Address");
const User = require("./User");

class ParkingSlot extends Model{

}

ParkingSlot.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
            autoincreament: true,
        }, 
        leaserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            } 
        }, 
        bookingTimeFrame:{
            type: Sequelize.ENUM("daily", "hourly"),
            allowNull: false,
            defaultValue: "hourly", 
        },
        addressId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Address,
                key: 'id'
            }     
        },
        rate:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,   
        }, 
    },
    {
        hooks:
        {   
            beforeCreate: async(newParkingSlotData) => {

            },
            beforeUpdate: async(updateParkingSlotData) => {

            },
        },//end of hook
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'parkingSlot',
    }//other sequalize things
);//end of ParkingSlot.init()

module.exports = ParkingSlot;