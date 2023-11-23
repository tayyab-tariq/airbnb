import asyncHandler from "express-async-handler";
import Booking from '../models/Booking.js'

const addBooking = asyncHandler(async (req, res) => {
    const userData = req.user;
    const {
        place,checkIn,checkOut,numberOfGuests,name,phone,price,
    } = req.body;
    Booking.create({
        place,checkIn,checkOut,numberOfGuests,name,phone,price,
        user:userData._id,
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
});

const getBookings = asyncHandler(async (req, res) => {
    const userData = req.user;
    res.json( await Booking.find({user:userData._id}).populate('place') );
});

export {
    addBooking, 
    getBookings,
};