const { getHelpRequests, getResourceRequests } = require('../controllers/actionResponseController');

const router = require('express').Router();

router.get('/get-help-requests/:userid', getHelpRequests)
router.get('/get-resource-requests/:userid', getResourceRequests)

module.exports = router;