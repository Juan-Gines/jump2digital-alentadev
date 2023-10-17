import mongoose from 'mongoose'
const { Schema } = mongoose

// * Schema de SkinModel

const skinSchema = new Schema({
  skinId: { type: Number, require: true },
  userId: { type: Number, require: true },
  skinName: { type: String, trim: true, require: true },
  category: { type: String, trim: true, require: true },
  class: { type: String, trim: true, require: true },
  color: [{ type: String, trim: true }],
  price: { type: Number }
},
{
  timestamps: true
})
