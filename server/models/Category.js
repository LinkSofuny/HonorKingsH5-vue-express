const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
})

schema.virtual('children', {
  foreignField: 'parent',
  localField: '_id',
  justOne: false,
  ref: 'Category'
})


schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})



module.exports = mongoose.model('Category', schema)