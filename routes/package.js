// Import Express Router
const { Router } = require('express');

// Import the packagesController
const packagesController = require('../controllers/package');

// Create an instance of Express Router
const packageRouter = Router();

// Export the router instance
module.exports = packageRouter;

// GET all packages
//packageRouter.get('/', packagesController.getPackages);

// POST (create) a new package
packageRouter.post('/', packagesController.createPackage);

// PUT (update) an existing package
packageRouter.put('/:id', packagesController.updatePackage);

// DELETE a package
packageRouter.delete('/:id', packagesController.deletePackage);






// // Import Express Router
// const { Router } = require('express');

// // Import the packagesController
// const packagesController = require('../controllers/packages');

// // Create an instance of Express Router
// const packagesRouter = Router();

// // Define routes for packages
// // Whenever we receive a GET request on the packages route '/', invoke the getPackages method
// packagesRouter.get('/', packagesController.getPackages);

// // Export the router instance
// module.exports = packagesRouter;
