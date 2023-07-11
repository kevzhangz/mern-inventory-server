import User from '../models/user.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'
import extend from 'lodash/extend.js'

const userProjections = {
  '_id': false,
  '__v': false,
  'hashed_password': false,
  'salt': false
}

const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save()
    return res.status(200).json({
      message: 'Successfully signed up'
    })
  } catch (err){
    return res.status(500).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const read = async (req, res) => {
  const user = await User.findOne({username : req.params.username}, userProjections)

  return res.status(200).json(user)
}

const update = async (req, res) => {
  try {
    let user = req.profile
    user = extend(user, req.body)
    user.updated = Date.now()
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}



export default {
  create,
  read,
  update
}