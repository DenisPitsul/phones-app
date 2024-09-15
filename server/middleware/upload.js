const path = require('path');
const multer = require('multer');
const createHttpError = require('http-errors');
const { STATIC_PATH } = require('../constants');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(STATIC_PATH, 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

function fileFilter (req, file, cb) {
  const MIMETYPE_REG_EXP = /^image\/(gif|jpeg|png)$/;

  if (MIMETYPE_REG_EXP.test(file.mimetype)) {
    return cb(null, true);
  }

  cb(createHttpError(415, 'Support only jpeg/png/gif mimetypes'));
}

const upload = multer({ storage, fileFilter });

module.exports.uploadPhoneImage = upload.single('phoneImage');
