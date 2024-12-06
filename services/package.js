const PackageModel = require('../models/package'); // Import the Package model

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
        const deletedPackage = await PackageModel.findByIdAndDelete(packageId); // Delete the package
        if (!deletedPackage) {
            throw new Error('Package not found');
        }
        return deletedPackage;
    } catch (err) {
        throw new Error(`Could not delete package: ${err.message}`);
    }
};
