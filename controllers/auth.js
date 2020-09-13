const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.getUsers = (req, res, next) => {
  let totalItems;
  User.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return User.find()
    })
    .then(users => {
      res
        .status(200)
        .json({
          message: 'Fetched users successfully.',
          users: users,
          totalItems: totalItems
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.loginUser = (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const userId = req.body._id;
  const imageUrl = req.body.imageUrl
  let loadedUser;
  User.findOne({ _id: userId })
    .then(user => {
      if (!user) {
        loadedUser = new User({
          _id: userId,
          name: name,
          email: email,
          imageUrl: imageUrl,
        });
        return loadedUser.save()
      }
      else {
      user.email = email
      user.name =  name
      user.imageurl = imageUrl
      return user.save()
      }
    })
    .then(result => {
      const token = jwt.sign(
        {
          email: result.email,
          userId: result._id
        },
        'deleteusersecretkey',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: result._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
  }

    exports.deleteUser = (req, res, next) => {
      let totalItems;
      const userId = req.body.userId;
      User.findById(userId)
        .then(result => {
          if (!result) {
            const error = new Error('Could not find user.');
            error.statusCode = 404;
            throw error;
          }
          return User.findByIdAndRemove(userId);
        })
        .then(result => {
          return User.find().countDocuments()
        }).then(count => {
          totalItems = count;
          return User.find()
        })
        .then(users => {
          res
            .status(200)
            .json({
              message: 'Fetched users after deleting successfully.',
              users: users,
              totalItems: totalItems
            });
        })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    };
