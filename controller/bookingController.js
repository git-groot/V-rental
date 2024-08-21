
const booktab = require('../modules/bookModule');
const moment = require('moment');

exports.addbook = async (req, res) => {

    try {
        const booking = req.body;

        const bookingData = {
            ...booking,
            startDate: booking.startDate ? moment(booking.startDate, 'DD-MM-YYYY').toDate() : undefined,
            endDate: booking.endDate ? moment(booking.endDate, 'DD-MM-YYYY').toDate() : undefined,
            startTime: booking.startTime ? moment(booking.startTime, 'hh:mm:ss A').toDate() : undefined,
            endTime: booking.endTime ? moment(booking.endTime, 'hh:mm:ss A').toDate() : undefined,
            status: booking.status || 'Pending', // Default to 'Pending' if status is not provided
            paymentStatus: booking.paymentStatus || 'Unpaid', // Default to 'Unpaid' if paymentStatus is not provided
        };

        const newBooking = new booktab(bookingData);
        console.log(newBooking);
        const savBooking = await newBooking.save();
        return res.status(200).json(savBooking);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred while saving the booking", error });
    }
};

exports.getallbooking = async (req, res) => {
    try {
        const getallbooking = await booktab.find();
        res.status(200).json(getallbooking);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getsinglebook = async (req, res) => {
    try {
        const getsinglebook = await booktab.findById(req.params.id);
        if (!getsinglebook) {
            return res.status(404).json({ mes: 'invalide id' });
        }
        return res.status(200).json(getsinglebook);
    } catch (error) {
        return res.status(500).json(error);
    }
};
