const { Router } = require('express');
const brandsRouter = require('./brandsRouter');
const phonesRouter = require('./phonesRouter');
const preordersRouter = require('./preordersRouter');

const router = Router();

router.use('/brands', brandsRouter);
router.use('/phones', phonesRouter);
router.use('/preorders', preordersRouter);

module.exports = router;
