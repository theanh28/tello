const {checkHw, checkBoard} = require('../controller/trello');
const webhook = require('./webhook');

const router = require('express').Router();

router.use('/check', checkHw);
router.get('/checkBoard', checkBoard);

router.use('/webhook', webhook);

module.exports = router;
