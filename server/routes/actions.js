const router = require('express').Router();
const { createHelpRequest, shareResource, resourceResponse, deleteResource, getUpcomingEvents, scheduleEvent, getUserActivity, deleteHelp, helpResponse, getResponders } = require('../controllers/actionsController')

router.post('/create-help-request', createHelpRequest)
router.post('/help-response', helpResponse)
router.post('/resource-response', resourceResponse)
router.post('/share-resource', shareResource)
router.post('/schedule-event', scheduleEvent)
router.get('/get-activity/:userid', getUserActivity)
router.get('/get-upcoming-events', getUpcomingEvents)
router.delete('/delete-help/:id', deleteHelp)
router.delete('/delete-resource/:id', deleteResource)
router.get('/get-responders/:id', getResponders)

module.exports = router;