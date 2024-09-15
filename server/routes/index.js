const { Router } = require('express');
const brandsRouter = require('./brandsRouter');
const phonesRouter = require('./phonesRouter');

const router = Router();

router.use('/brands', brandsRouter);
router.use('/phones', phonesRouter);

module.exports = router;
