const ToDo = require('../models/ToDo');

exports.getTodo = async (req, res) => {
    try{
        const {userid} = req.params;
        const todo = await ToDo.find({userid});
        if(!todo) return res.status(400).send({message: 'Nothing Found'})

        var pending = []
        var completed = []

        todo.forEach(element => {
            if(element.status === 'pending') pending.push(element)
            else if(element.status === 'completed') completed.push(element)
        });
        
        res.json({pending, completed});
    } catch(error){
        console.error(error.message);
        res.status(500).send({message: 'Server Error', error: error.message});
    }
}

exports.addTodo = async (req, res) => {
    try{
        const { userid, title } = req.body;

        const newTodo = new ToDo({
            userid,
            title
        })

        await newTodo.save();
        res.status(201).send({message: 'Todo Added Successfully'});
    } catch(error){
        console.error(error.message);
        res.status(500).send({message: 'Server Error', error: error.message});
    }
}

exports.updateTodo = async (req, res) => {
    try{
        const {id} = req.body;

        const receivedTodo = await ToDo.findById(id);

        const status = receivedTodo.status === 'pending' ? 'completed' : 'pending';

        const todo = await ToDo.findByIdAndUpdate(id, {status}, {new: true});
        if(!todo) return res.status(400).send({message: 'Todo not found'});

        res.json(todo);
    } catch(error){
        console.error(error.message);
        res.status(500).send({message: 'Server Error', error: error.message});
    }
}

exports.deleteTodo = async (req, res) => {
    try{
        const {id} = req.body;

        await ToDo.findByIdAndDelete(id);
        res.json({message: 'Todo deleted successfully'});
    } catch(error){
        console.error(error.message);
        res.status(500).send({message: 'Server Error', error: error.message});
    }
}