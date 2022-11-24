const {Model, DataTypes, Op} = require('sequelize');
const sequelize = require('../config/connection');
const ParkingSlot = require('./ParkingSlot');
const ParkingSlotDates = require('./ParkingSlotDates');
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
        parkingSlotId: {
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
            afterCreate: async (newSlotBookingData) => {
                // delete the entry for this date from the parkingSlotDates table
                console.log(newSlotBookingData.dateTimeFrom);
                const rows = await ParkingSlotDates.destroy({where: {
                                            parkingSlotId: newSlotBookingData.parkingSlotId, 
                                            date: {[Op.between]: [newSlotBookingData.dateTimeFrom, newSlotBookingData.dateTimeTo]}}});
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
