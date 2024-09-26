const HelpRequest = require('../models/HelpRequests');
const UserActivity = require('../models/UserActivity');
const Resource = require('../models/Resource');
const Event = require('../models/Event');
const User = require('../models/Users');
const mongoose = require('mongoose');

exports.createHelpRequest = async (req, res) => {
    try{
        var {title, description, userid, location, contact} = req.body

        console.log(userid)

        if(description.length < 20){
            return res.status(400).json({message: 'Description should be at least 20 characters long'});
        }

        if(!location){
            const user = await User.findById(userid);
            location = user.city
        }

        if(!contact){
            const user = await User.findById(userid);
            contact = user.phone
        }

        const newHelpRequest = new HelpRequest({
            title, description, userid, location, contact
        })
        const newUserActivity = new UserActivity({
            userid,
            activity: 'HelpRequest',
            title
        })

        await newHelpRequest.save();
        await newUserActivity.save();

        res.status(200).json({ message: "Help Request Posted Successfully"});
    }catch(error){
        console.error(error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.shareResource = async (req, res) => {
    try{
        var {title, description, userid, category, location, contact} = req.body;
        
        if(!location){
            const user = await User.findById(userid);
            location = user.city
        }

        if(!contact){
            const user = await User.findById(userid);
            contact = user.phone
        }

        if(!category){
            return res.status(400).json({message: 'Please select a category'});
        }
        
        const newResource = new Resource({
            title, description, userid, category, location, contact
        })
        const newUserActivity = new UserActivity({
            userid,
            activity: 'RequestedResource',
            title
        })

        await newResource.save();
        await newUserActivity.save();

        res.status(200).json({ message: "Resource Shared Successfully"});

    } catch(error){
        console.error(error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.scheduleEvent = async (req, res) => {
    try{
        var {title, description, userid, date, location, contact} = req.body;

        if(description.length < 20){
            return res.status(400).json({message: 'Description should be at least 20 characters long'});
        }
        
        if(!location){
            const user = await User.findById(userid);
            location = user.city
        }

        if(!contact){
            const user = await User.findById(userid);
            contact = user.phone
        }
        
        const newEvent = new Event({
            title, description, userid, date, location, contact
        })
        const newUserActivity = new UserActivity({
            userid,
            activity: 'ScheduledEvent',
            title
        })

        await newEvent.save();
        await newUserActivity.save();

        res.status(200).json({ message: "Event Scheduled Successfully"});
    } catch(error){
        console.error(error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.getUserActivity = async (req, res) => {
    try{
        const userid = req.params.userid;

        const userActivity = await UserActivity.find({ userid }).sort({ createdAt: -1 }).limit(6);
        
        res.status(200).json(userActivity);
    } catch(error){
        console.error(error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.getUpcomingEvents = async (req, res) => {
    try{
        const currentDate = new Date();

        const upcomingEvents = await Event.find({date: {$gt: currentDate}}).sort({date: 1}).limit(11)

        res.status(200).json(upcomingEvents);
    } catch(error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.deleteHelp = async (req, res) => {
    try{
        const id = req.params.id
        
        await HelpRequest.findByIdAndDelete(id);
        res.status(200).json({ message: 'Help Request deleted successfully' });
    } catch(error){
        console.error(error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.deleteResource = async (req, res) => {
    try{
        const id = req.params.id
        
        await Resource.findByIdAndDelete(id);
        res.status(200).json({ message: 'Resource Request deleted successfully' });
    } catch(error){
        console.error(error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.helpResponse = async (req, res) => {
    try {
        const { id, userid } = req.body;

        if (!id || !userid) {
            return res.status(400).json({ message: 'Missing required fields: id or userid' });
        }

        const helpRequest = await HelpRequest.findById(id);

        if (!helpRequest) {
            return res.status(404).json({ message: 'Help Request not found' });
        }

        if (helpRequest.responders.includes(userid)) {
            return res.status(400).json({ message: 'You have already responded to this request.' });
        }

        const newUserActivity = new UserActivity({
            userid,
            activity: 'HelpResponse',
            title: helpRequest.title
        })

        helpRequest.responders.push(userid);

        await helpRequest.save();
        await newUserActivity.save();

        res.json(helpRequest);
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.resourceResponse = async (req, res) => {
    try {
        const { id, userid } = req.body;

        if (!id || !userid) {
            return res.status(400).json({ message: 'Missing required fields: id or userid' });
        }

        const resourceRequest = await Resource.findById(id);

        if (!resourceRequest) {
            return res.status(404).json({ message: 'Help Request not found' });
        }

        if (resourceRequest.responders.includes(userid)) {
            return res.status(400).json({ message: 'You have already responded to this request.' });
        }

        const newUserActivity = new UserActivity({
            userid,
            activity: 'SharedResource',
            title: resourceRequest.title
        })

        resourceRequest.responders.push(userid);

        await resourceRequest.save();
        await newUserActivity.save();

        res.json(resourceRequest);
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.getResponders = async(req, res) => {
    try{
        const id = req.params.id

        const helpRequest = await HelpRequest.findById(id);
        
        if(!helpRequest){
            return res.status(404).json({message: 'Help Request not found'});
        }

        const responders = await User.find(
            {_id:  {$in: helpRequest.responders}},
            {name: 1 ,phone: 1}
        )
        if(!responders) return res.status(400).send({message: 'No Responders yet'})

        res.status(200).json(responders);
    } catch(error){
        console.error(error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}