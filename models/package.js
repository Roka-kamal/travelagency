const { Schema, model } = require('mongoose');

// Package schema
const packageSchema = new Schema({
    packageId: { 
        type: Number, 
        required: true 
    },
    packageType: { 
        type: String, 
        enum: ["Business", "Group ", "individual"], 
        required: true 
    },
    destination: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    availableSeats: { // The admin will use this to specify how many seats/ rooms available
        type: Number, 
        required: true 
    },
    flight:{
        type: Schema.Types.ObjectId, 
        ref: 'Flight',  // Reference to the Flight model
    },
    hotels:{
        type: Schema.Types.ObjectId, 
        ref: 'Hotel',  // Reference to the Hotel model
    }
}, {
    timestamps: true, 
});

// Model for the package
const PackageModel = model('Package', packageSchema);

module.exports = PackageModel;