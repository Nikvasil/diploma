const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  registrationPlate: {type: String, required: true, unique: true},
  mark: {type: String, required: true},
  model: {type: String, required: true},
  owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Vehicle', schema)
