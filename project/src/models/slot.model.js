// const mongoose = require('mongoose');

// const slotSchema = new mongoose.Schema ({
//     slot_time: {type:String,req:true},
//     slot_date: {type:String,req:true},
//     coach:{type: mongoose.Schema.Types.ObjectId, ref: 'coach'},

//     created_at: {type:Date,req:true}

//   },
//   {
//     versionKey: false,
//     timestamps: true
// });
// module.exports = mongoose.model("slot", slotSchema); // slots
const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coach'
  },
  total: {
    type: Number,
    required: true
  },
  time: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports =mongoose.model('slot', SlotSchema);