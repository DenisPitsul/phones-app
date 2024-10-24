const { Router } = require('express');
const { phonesController } = require('../controllers');
const { validate, paginate, upload } = require('../middleware');

const phonesRouter = Router();

phonesRouter
  .route('/')
  .post(
    upload.uploadPhoneImage,
    validate.validatePhoneOnCreate,
    phonesController.createPhone
  )
  .get(paginate.paginatePhones, phonesController.getPhones);

phonesRouter
  .route('/:id')
  .get(phonesController.getPhoneById)
  .patch(
    upload.uploadPhoneImage,
    validate.validatePhoneOnUpdate,
    phonesController.updatePhoneById
  )
  .delete(phonesController.deletePhoneById);

phonesRouter
  .route('/:id/preorders')
  .post(phonesController.addPhonePreorder)
  .get(phonesController.getPhonePreorders);

module.exports = phonesRouter;
