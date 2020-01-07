const express = require('express');


const users = require('./users-model');
const router = express.Router();

router.get('/list', (req, res) => {
    users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: 'There is an Error on the server on our End'})
      });
  });

  module.exports = router;