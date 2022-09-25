const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    trip: { type: Types.ObjectId, ref: 'Trip' },
    author: { type: Types.ObjectId, ref: 'User' },
    whom: { type: Types.ObjectId, ref: 'User' },
    mark: { type: Boolean, required: true },
    feedbackText: { type: String }
})

module.exports = model('Feedback', schema);