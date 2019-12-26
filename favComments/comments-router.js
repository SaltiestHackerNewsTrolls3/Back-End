const router = require('express').Router();
const Trolls = require('./comments-model.js');
const Users = require('../users/users-model.js');

router.get('/topsalt', (req, res) => {
    Trolls.getTopSaltyComments()
      .then(comment => {
        res.status(200).json(comment);
      })
      .catch(error => {
        console.log(error.message);
        res.status(500).json({ message: 'Problem getting the comments you requested' });
      });
  });

  router.get('/:id/fav', validateUserId, (req, res) => {
    const id = req.params.id;
    Trolls.getCommentsByUserID(id)
      .then(comments => {
        console.log(comments);
        res.status(200).json(comments);
      })
      .catch(error => {
        res
          .status(401)
          .json({ message: 'Comments dont exist with that user_id' });
      });
  });

  router.get('/favorites', (req, res) => {
    const id = req.user.id;
    Trolls.getCommentsByUserID(id)
      .then(comments => {
        console.log(comments);
        res.status(200).json(comments);
      })
      .catch(error => {
        res
          .status(401)
          .json({ message: 'Comments dont exist with that user_id' });
      });
  });
  
  router.get('/:id/fav/HackerSalt', validateUserId, (req, res) => {
    const id = req.params.id;
    Trolls.getCommentsByUserID(id)
      .then(saltyIDs => {
        const commentIDs = saltyIDs.map(id => id.comment_id);
        console.log(commentIDs);
        Trolls.getSaltyCommentsByID(commentIDs).then(comments => {
          res.status(200).json(comments);
        });
      })
      .catch(err => {
        console.log('error in second catch', err);
        res.status(500).json({ message: "user saved comments don't exist" });
      });
  });

  router.get('/allfavsalt', (req, res) => {
    const id = req.user.id;
    Trolls.getCommentsByUserID(id)
      .then(saltyIDs => {
        const commentIDs = saltyIDs.map(id => id.comment_id);
        console.log(commentIDs);
        Trolls.getSaltyCommentsByID(commentIDs).then(comments => {
          res.status(200).json(comments);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "user saved comments don't exist" });
      });
  });

  router.delete('/deletefav', (req, res) => {
    const id = req.body.id;
    const comment_id = parseInt(req.body.comment, 10);
    Trolls.removeComment(id, comment_id)
      .then(comments => {
        res.status(200).json({ message: 'comment deleted' });
      })
      .catch(err => {
        console.log(err.message);
        res.status(500).json({ message: 'trouble deleting comment' });
      });
  });

  router.delete('/:comment_id/deletefav', (req, res) => {
    const id = req.user.id;
    const comment_id = parseInt(req.params.comment_id, 10);
    Trolls.removeComment(id, comment_id)
      .then(comments => {
        res.status(200).json({ message: 'comment deleted' });
      })
      .catch(err => {
        console.log(err.message);
        res.status(500).json({ message: 'trouble deleting comment' });
      });
  });


  router.delete('/:id/fav', validateUserId, (req, res) => {
    const user_id = parseInt(req.params.id, 10);
    const comment_id = parseInt(req.body.comment, 10);
    Trolls.removeCommentByUserID({ user_id, comment_id })
      .then(removed => {
        console.log(res);
        res.status(200).json({ message: 'comment deleted' });
      })
      .catch(err => {
        console.log(err.message);
        res.status(500).json({ message: 'error deleting comment' });
      });
  });

  router.post('/:id/fav', validateUserId, (req, res) => {
    const comment_id = parseInt(req.body.comment, 10);
    const user_id = parseInt(req.params.id, 10);
    Trolls.savedComment({ comment_id, user_id })
      .then(comment => {
        console.log(comment);
        res.status(201).json({ message: 'comment successfully saved' });
      })
      .catch(error => {
        console.log('this is error', error.message);
        res.status(500).json({ message: 'error saving comment to the database' });
      });
  });
  
  router.post('/newfav', (req, res) => {
    const user_id = req.user.id;
    const comment_id = parseInt(req.body.comment, 10);
    Trolls.savedComment({ comment_id, user_id })
      .then(comment => {
        console.log(comment);
        res.status(201).json({ message: 'comment successfully saved' });
      })
      .catch(error => {
        console.log('this is error', error.message);
        res.status(500).json({ message: 'error saving comment to the database' });
      });
  });

  router.get('/HackerSalt', (req, res) => {
    Trolls.getTop25Saltiest()
      .then(salt => {
        res.status(200).json(salt);
      })
      .catch(error => {
        console.log('error', error.message);
        res.status(500).json({ message: 'error getting top 25 saltiness' });
      });
  });

  router.get('/:id/saltiest', (req, res) => {
    const id = req.params.id;
    Trolls.saltiestComment(id)
      .then(comment => {
        res.status(200).json(comment);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: 'error in getting users saltiness comment' });
      });
  });

  function validateUserId(req, res, next) {
    const { id } = req.params;
    Users.findById(id).then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: 'User with id does not exit' });
      }
    });
  }
  
  module.exports = router;