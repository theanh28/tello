const {createBoardWebhook, temp} = require('../../controller/webhook');

const router = require('express').Router();

router.post('/board', createBoardWebhook);
router.post('/remove', temp);
// router.get('/card', createCardWebhook);

module.exports = router;
