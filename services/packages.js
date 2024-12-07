const PackageModel = require('../models/packages');
const FlightModel = require('../models/flights');  // Import the Flight model
const HotelModel = require('../models/HotelOffers');    // Import the Hotel model

// Create a new travel package
module.exports.createPackage = async (packageData) => {
    try {
        const newPackage = new PackageModel(packageData); // Create new package
        await newPackage.save(); // Save the package to the database
        return newPackage;
    } catch (err) {
        throw new Error(`Could not create package: ${err.message}`);
    }
};

// Update a travel package
module.exports.updatePackage = async (packageId, updateData) => {
    try {
        const updatedPackage = await PackageModel.findByIdAndUpdate(packageId, updateData, { new: true }); // Update the package using the "findByIdAndUpdate()" builtin function
        if (!updatedPackage) {
            throw new Error('Package not found');
        }
        return updatedPackage;
    } catch (err) {
        throw new Error(`Could not update package: ${err.message}`);
    }
};

// Delete a travel package
module.exports.deletePackage = async (packageId) => {
    try {
        const deletedPackage = await PackageModel.findOneAndDelete({ packageId }); // Delete by packageId
        if (!deletedPackage) {
            throw new Error('Package not found');
        }
        return deletedPackage;
    } catch (err) {
        throw new Error(`Could not delete package: ${err.message}`);
    }
};


// Service to view all packages with flight and hotel details
module.exports.viewAllPackages = async () => {
    try {
        const packages = await PackageModel.find();

        // Fetch related flight and hotel details for each package
        const packagesWithDetails = await Promise.all(
            packages.map(async (pkg) => {
                const flight = await FlightModel.findOne({ flightId: pkg.flightId });  // Fetch flight details using flightId
                const hotel = await HotelModel.findOne({ hotelId: pkg.hotelId });      // Fetch hotel details using hotelId

                return {
                    ...pkg.toObject(),  // Convert package to plain object
                    flight,  // Add flight details
                    hotel,   // Add hotel details
                };
            })
        );

        return packagesWithDetails;
    } catch (err) {
        throw new Error('Could not retrieve packages: ' + err.message);
    }
};

// Service to view a specific package by ID with flight and hotel details
module.exports.viewPackageById = async (packageId) => {
    try {
        const pkg = await PackageModel.findById(packageId);
        if (!pkg) {
            throw new Error('Package not found');
        }

        // Fetch related flight and hotel details
        const flight = await FlightModel.findOne({ flightId: pkg.flightId });
        const hotel = await HotelModel.findOne({ hotelId: pkg.hotelId });

        return {
            ...pkg.toObject(),
            flight, // Attach flight details
            hotel,  // Attach hotel details
        };
    } catch (err) {
        throw new Error('Could not retrieve the package: ' + err.message);
    }
};
