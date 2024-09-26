const { getTodo, addTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

const router = require('express').Router();

router.get('/get-todo/:userid', getTodo)
router.post('/add-todo', addTodo)
router.post('/update-todo', updateTodo)
router.post('/delete-todo', deleteTodo)

module.exports = router;