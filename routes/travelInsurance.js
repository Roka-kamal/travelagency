const { Router } = require('express');

const travelInsuranceControllers = require('../controllers/travelInsurance');


// create an instance of Express Router.
const travelInsuranceRouter = Router();

travelInsuranceRouter.get('/', travelInsuranceControllers.getInsurances);
travelInsuranceRouter.post('/', travelInsuranceControllers.createInsurance);
travelInsuranceRouter.delete('/:providerName', travelInsuranceControllers.removeInsurance);


module.exports = travelInsuranceRouter;