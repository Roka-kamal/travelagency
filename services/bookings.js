const BookingModel = require('../models/bookings');
const PackageModel = require('../models/packages');  // Import the Package model

// Create a new booking
module.exports.createBooking = async (bookingData) => {
    try {
        const newBooking = new BookingModel(bookingData); // Create new booking
        await newBooking.save();  // Save the booking to the database
        return newBooking;
    } catch (err) {
        throw new Error(`Could not create booking: ${err.message}`);
    }
};

// Update a booking
module.exports.updateBooking = async (bookingId, updateData) => {
    try {
        const updatedBooking = await BookingModel.findByIdAndUpdate(bookingId, updateData, { new: true });
        if (!updatedBooking) {
            throw new Error('Booking not found');
        }
        return updatedBooking;
    } catch (err) {
        throw new Error(`Could not update booking: ${err.message}`);
    }
};

// Delete a booking
module.exports.deleteBooking = async (bookingId) => {
    try {
        const deletedBooking = await BookingModel.findOneAndDelete({ bookingId }); // Delete by bookingId
        if (!deletedBooking) {
            throw new Error('Booking not found');
        }
        return deletedBooking;
    } catch (err) {
        throw new Error(`Could not delete booking: ${err.message}`);
    }
};


// // Delete a booking
// module.exports.deleteBooking = async (bookingId) => {
//     try {
//         const deletedBooking = await BookingModel.findByIdAndDelete(bookingId);
//         if (!deletedBooking) {
//             throw new Error('Booking not found');
//         }
//         return deletedBooking;
//     } catch (err) {
//         throw new Error(`Could not delete booking: ${err.message}`);
//     }
// };

// Service to view all bookings with related package details
module.exports.viewAllBookings = async () => {
    try {
        const bookings = await BookingModel.find();

        // Fetch related package details for each booking
        const bookingsWithPackageDetails = await Promise.all(
            bookings.map(async (booking) => {
                const package = await PackageModel.findOne({ packageId: booking.packageId });  // Fetch package details using packageId

                return {
                    ...booking.toObject(),  // Convert booking to plain object
                    package,  // Add package details
                };
            })
        );

        return bookingsWithPackageDetails;
    } catch (err) {
        throw new Error('Could not retrieve bookings: ' + err.message);
    }
};

//to view a specific booking by ID with its package details
module.exports.viewBookingById = async (bookingId) => {
    try {
        const booking = await BookingModel.findById(bookingId);
        if (!booking) {
            throw new Error('Booking not found');
        }

        // Fetch related package details
        const package = await PackageModel.findOne({ packageId: booking.packageId });

        return {
            ...booking.toObject(),
            package, // Attach package details
        };
    } catch (err) {
        throw new Error('Could not retrieve the booking: ' + err.message);
    }
};
