const router = require('express').Router()
const {
  addTask,
  deleteTask,
  updateTask,
} = require('../controllers/taskController')

router.post('/', addTask)
router.delete('/', deleteTask)
router.patch('/', updateTask)

module.exports = router
