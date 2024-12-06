const hotelOffersService = require('../services/hotelOffers');


module.exports.getOffers = async (req, res) => {
    try {
        const offers = await hotelOffersService.getHotelOffers();
          return res.send({offers});
    } catch (err) {
        // this denotes a server error, therefore status code should be 500.
        res.status(500);
        return res.send({
          error: err.message
        });
    }
};

module.exports.createOffer = async (req, res) => {
    try {
        const offer = await hotelOffersService.addHotelOffer(req.body);
        res.status(201).json(offer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.removeOffer = async (req, res) => {
    try{
        const hotelId = req.params.hotelId;
        const removedOffer = await hotelOffersService.removeHotelOffer(hotelId);
        if (!removedOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        return res.status(200).json({ message: 'Offer successfully removed', offer: removedOffer });
    
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
};