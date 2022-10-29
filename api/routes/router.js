const licenseController = require('../controllers/controller.license');


module.exports = function(router){

    //Routes
    router.post('/license/create', licenseController.createLicense);
    router.get('/licenses', licenseController.getLicenses);
    router.get('/license/:serial', licenseController.getLicenseBySerial);
    router.put('/license/:serial', licenseController.updateLicense);
    router.delete('/license/:serial', licenseController.deleteLicense);

    //User management routes
    //router.post('/login', login);
    //Just once to add default admin
    //router.post('/SUPER-ADMIN-TEMP/create', ctrlUser.createUser);

}