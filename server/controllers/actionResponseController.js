const HelpRequest = require('../models/HelpRequests');
const Resource = require('../models/Resource');
const Event = require('../models/Event');


exports.getHelpRequests = async(req, res) => {
    try{

        const userid = req.params.userid;

        const helpRequests = await HelpRequest.find();

        var userPosts = []
        var othersPosts = []

        helpRequests.forEach(request => {
            if(request.userid == userid){
                userPosts.push(request);
            } else {
                othersPosts.push(request);
            }
        })

        res.status(200).json({userPosts, othersPosts});
    } catch(error) {
        console.error(error.message);
        res.status(500).send({message: 'Server Error', error: error.message});
    }
}

exports.getResourceRequests = async(req, res) => {
    try{

        const userid = req.params.userid;

        const resourceRequests = await Resource.find();

        var userPosts = []
        var othersPosts = []

        resourceRequests.forEach(request => {
            if(request.userid == userid){
                userPosts.push(request);
            } else {
                othersPosts.push(request);
            }
        })

        res.status(200).json({userPosts, othersPosts});
    } catch(error) {
        console.error(error.message);
        res.status(500).send({message: 'Server Error', error: error.message});
    }
}