//MODEL FOLDER
const {Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs'); // Importing the "bcrypt" library for the password hashing

const userSchema = new Schema({
    fname: {
        type: String,
        required: true,
        trim: true // Removes extra spaces
    },
    lname: {
        type: String,
        required: true,
        trim: true // Removes extra spaces
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Converts to lowercase
        validate: {
            validator: function (v) {
                // Regex to validate email format
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    phone: {
        type: String, // String is preferred for phone numbers (to handle country codes, etc.)
        required: true,
        unique: true,
        trim: true, // Removes extra spaces
        validate: {
            validator: function (v) {
                // Validates the phone number formats including the optional country codes
                return /^\+?[1-9]\d{1,14}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'admin'], // Optional, to distinguish roles
        default: 'customer' // Default to customer
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Pre-save middleware to hash the password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if the password is modified
    try {
        const saltRounds = 10; // Number of hashing rounds
        this.password = await bcrypt.hash(this.password, saltRounds); // Hash the password
        next();
    } catch (error) {
        next(error); // Pass error to the next middleware
    }
});


const userModel=model('user', userSchema);

module.exports=userModel;