const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    owner: { type: Types.ObjectId, ref: 'User' },
    joiner: { type: Types.ObjectId, ref: 'User' },
    from: { type: String, required: true },
    to: { type: String, required: true },
    depDate: { type: Date, required: true },
    price: { type: Number, required: true },
    vehicle: { type: Types.ObjectId, ref: 'Vehicle' },
    regDate: { type: Date, required: true },
    isDone: { type: Boolean, required: true }
})

module.exports = model('Trip', schema);