const express = require('express')
const router = express.Router();
const Message = require("../models/Message.model")

router.post('/save', (req, res)=> {
  const {message, from } = req.body

  Message.create({message, from})
  .then((createdMessage) =>{
    console.log(createdMessage)
  })
  .catch(err=> console.log(err))

})
router.get('/messages', (req, res)=> {
  Message.find()
  .then(messages => res.json(messages))
  .catch(err=> console.log(err))
})

module.exports = router;