const User = require('../models/user')

const addTask = (req, res) => {
  const { googleId } = req.user
  const { taskText } = req.body

  User.findOne({ googleId }).then((user) => {
    user.tasks.push({ text: taskText, complete: false })
    user.save().then(() => res.redirect('/'))
  })
}

const deleteTask = (req, res) => {
  const { googleId } = req.user
  const { id } = req.body

  User.findOneAndUpdate(
    { googleId },
    {
      $pull: {
        tasks: { _id: id },
      },
    },
    (err, foundList) => {
      if (!err) {
        res.redirect('/')
      }
    }
  )
}

const updateTask = (req, res) => {
  const { googleId } = req.user
  const { id, isComplete } = req.body

  User.findOneAndUpdate(
    { googleId, tasks: { $elemMatch: { _id: id } } },
    {
      $set: {
        'tasks.$.complete': isComplete,
      },
    },
    (err, foundList) => {
      if (!err) {
        res.redirect('/')
      }
    }
  )
}
module.exports = { addTask, deleteTask, updateTask }
