const { getOverview } = require('../controllers/overviewController');

const router = require('express').Router();

router.get('/get-overview/:userid', getOverview)

module.exports = router;