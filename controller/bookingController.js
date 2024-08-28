
const booktab = require('../modules/bookModule');
const moment = require('moment');
const cartab = require('../modules/carMoodule');

exports.addbook = async (req, res) => {

    try {
        const booking = req.body;

        const bookingData = {
            ...booking,
            startDate: booking.startDate ? moment(booking.startDate, 'YYYY-MM-DD').toDate() : undefined,
            endDate: booking.endDate ? moment(booking.endDate, 'YYYY-MM-DD').toDate() : undefined,
            startTime: booking.startTime ? moment(booking.startTime, 'hh:mm:ss A').toDate() : undefined,
            endTime: booking.endTime ? moment(booking.endTime, 'hh:mm:ss A').toDate() : undefined,
            status: booking.status || 'Pending', // Default to 'Pending' if status is not provided
            paymentStatus: booking.paymentStatus || 'Unpaid', // Default to 'Unpaid' if paymentStatus is not provided
            totalTime: booking.totalTime || "0",
            advanceAmount: booking.advanceAmount || 0,
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

exports.updateBook = async (req, res) => {

    try {
        const bookingId = req.params.id; // Extract booking ID from request parameters
        const updates = req.body; // Get the updated data from the request body

        const updatedData = {
            ...updates,
            startDate: updates.startDate ? moment(updates.startDate, 'YYYY-MM-DD').toDate() : undefined,
            endDate: updates.endDate ? moment(updates.endDate, 'YYYY-MM-DD').toDate() : undefined,
            startTime: updates.startTime ? moment(updates.startTime, 'hh:mm:ss A').toDate() : undefined,
            endTime: updates.endTime ? moment(updates.endTime, 'hh:mm:ss A').toDate() : undefined,
            status: updates.status || 'Pending', // Default to 'Pending' if status is not provided
            paymentStatus: updates.paymentStatus || 'Unpaid', // Default to 'Unpaid' if paymentStatus is not provided

        };

        // Find the booking by ID and update it
        const updatedBooking = await booktab.findByIdAndUpdate(bookingId, updatedData, { new: true });

        // If the booking is not found, return a 404 response
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Return the updated booking
        return res.status(200).json(updatedBooking);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred while updating the booking", error });
    }
};

// exports.bookFilter = async (req, res) => {

//     try {
//         const { startDate, endDate } = req.body;

//         if (!startDate || !endDate) {
//             return res.status(400).json({ message: 'startDate and endDate are required ' });
//         }

//         const startDateObj = new Date(startDate);
//         const endDateObj = new Date(endDate);   

//         // Define filter criteria based on dates
//         const filterCriteria = {
//             $or: [
//                 { startDate: { $ne: startDateObj } },
//                 { endDate: { $ne: endDateObj } }
//             ]
//         };

//         // Lookup cars related to bookings
//         const filteredResults = await booktab.aggregate([
//             { $match: filterCriteria },
//             {
//                 $lookup: {
//                     from: 'carstabs', // Collection name in MongoDB
//                     localField: 'carNumber',
//                     foreignField: 'registrationNumber',
//                     as: 'availableCar'
//                 }
//             }
//         ]);

//         return res.status(200).json(filteredResults);
//     } catch (error) {
//         console.error('Error while filtering bookings:', error);
//         return res.status(500).json({ message: 'An error occurred while filtering bookings', error });
//     }
// }

exports.bookFilter = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'startDate and endDate are required' });
        }

        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        // Define filter criteria for overlapping bookings
        const overlappingFilter = {
            $or: [
                { startDate: { $lt: endDateObj }, endDate: { $gt: startDateObj } }
            ]
        };

        // Find all car numbers that are booked within the specified date range
        const bookedCars = await booktab.find(overlappingFilter).distinct('carNumber');
        
        // Filter to exclude booked cars from the results
        const filterCriteria = {
            registrationNumber: { $nin: bookedCars }
        };

        // Lookup available cars that are not booked within the specified date range
        const availableCars = await cartab.find(filterCriteria);
        return res.status(200).json(availableCars);

    } catch (error) {
        console.error('Error while filtering bookings:', error);
        return res.status(500).json({ message: 'An error occurred while filtering bookings', error });
    }
};
