const HotelOffers = require('../models/HotelOffers');

module.exports.getHotelOffers = async() => {
    try {
        const Offers = await HotelOffers.find();
        return Offers;
    } catch (error){
        throw new Error('Error finding hotel offers');
    }
};

module.exports.addHotelOffer = async(data) => {
    try {
        const newOffer = new HotelOffers(data);
        return await newOffer.save();
    } catch (error) {
        throw new Error('Error adding hotel offer');
    }
};

module.exports.removeHotelOffer = async(hotelId) => {
    try{
        const removedOffer = await HotelOffers.findOneAndDelete({ hotelId });
        if (!removedOffer) {
            throw new Error('Hotel offer not found');
        }
        return removedOffer;
    } catch (error) {
        throw new Error('Error removing hotel offer');
    }
}

