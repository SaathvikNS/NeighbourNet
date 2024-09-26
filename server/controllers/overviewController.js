const UserActivity = require('../models/UserActivity');

exports.getOverview = async (req, res) => {
    try{
        const userid = req.params.userid;

        const userActivity = await UserActivity.find({ userid });
        if(!userActivity) return res.status(400).send({ message: "Nothing found"})

        var helprequest = 0, requestedresource = 0, scheduledevent = 0, helpresponse = 0, sharedresource = 0, enrolledevent = 0;

        userActivity.forEach(activity => {
            if(activity.activity === 'HelpRequest'){
                helprequest++;
            } else if(activity.activity === 'RequestedResource'){
                requestedresource++;
            } else if(activity.activity === 'ScheduledEvent'){
                scheduledevent++;
            } else if(activity.activity === 'HelpResponse'){
                helpresponse++;
            } else if(activity.activity === 'SharedResource'){
                sharedresource++;
            } else if(activity.activity === 'EnrolledToEvent'){
                enrolledevent++;
            }
        })

        res.status(200).json({helprequest, requestedresource, scheduledevent, helpresponse, sharedresource, enrolledevent})
    } catch(error){
        console.error(error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });        
    }
}