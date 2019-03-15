// The TypeUser schema.
import User from '../models/User'

export default {
  Query: {
    user: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    users: () => {
      return new Promise((resolve, reject) => {
        User.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    }
  },
  Mutation: {
    addUser: (root, {id, name, email, password}) => {
      const bcrypt = require('bcrypt')
      const hash = bcrypt.hashSync(password, 10)
      const newUser = new User({id, name, email, password: hash})
      
      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    editUser: (root, {id, name, email, password}) => {
      return new Promise((resolve, reject) => {
        User.findOneAndUpdate(
          {id: id},
          {$set: {name, email, password}},
          {new: true},
          (err, res) => err ? reject(err) : resolve(res))
      })
    },
    editUserPassword: (root, {id, password}) => {
      return new Promise((resolve, reject) => {
        User.findOneAndUpdate(
          {id: id},
          {$set: {password}},
          {new: true},
          (err, res) => err ? reject(err) : resolve(res)
        )
      })
    },
    editUserName: (root, {id, name}) => {
      return new Promise((resolve, reject) => {
        User.findOneAndUpdate(
          {id: id},
          {$set: {name}},
          {new: true},
          (err, res) => err ? reject(err) : resolve(res)
        )
      })
    },
    editUserEmail: (root, {id, email}) => {
      return new Promise((resolve, reject) => {
        User.findOneAndUpdate(
          {id: id},
          {$set: {email}},
          {new: true},
          (err, res) => err ? reject(err) : resolve(res)
        )
      })
    },
    deleteUser: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOneAndRemove(args, (err, res) => err ? reject(err) : resolve(res))
      })
    }
  }
}