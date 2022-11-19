const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const ParkingSlot = require('./ParkingSlot');
const User = require('./User');

class SlotBooking extends Model{}

SlotBooking.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        parkingslotId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ParkingSlot,
                key: 'id'
            }    
        },
        bookedBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        dateTimeFrom: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dateTimeTo: {
            type: DataTypes.DATE,
            allowNull:false,
        },
        price: {
            type: DataTypes.DECIMAL(10,2), 
            allowNull: false,
        },
    },
    {
        hooks:
        {
            beforeCreate: async (newSlotBookingData) => {

            }, 
            beforeUpdate: async (updatedSlotBookingData) => {

            },
        },
        sequelize,
        timestamps: false, 
        freezeTableName: true,
        underscored: true,
        modelName: 'slotbooking',
    }
);

module.exports = SlotBooking;
