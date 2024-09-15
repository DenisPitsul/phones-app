const {
  CREATE_PHONE_VALIDATION_SCHEMA,
  UPDATE_PHONE_VALIDATION_SCHEMA,
} = require('../utils/validationSchemas');

module.exports.validatePhoneOnCreate = async (req, res, next) => {
  const { body } = req;

  try {
    const validatedPhone = await CREATE_PHONE_VALIDATION_SCHEMA.validate(body);
    req.body = validatedPhone;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports.validatePhoneOnUpdate = async (req, res, next) => {
  const { body } = req;

  try {
    const validatedPhone = await UPDATE_PHONE_VALIDATION_SCHEMA.validate(body);
    req.body = validatedPhone;
    next();
  } catch (err) {
    next(err);
  }
};
