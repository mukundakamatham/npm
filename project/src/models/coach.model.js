const mongoose = require('mongoose');
const coachSchema = new mongoose.Schema({
 user:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
 appointments:{type: mongoose.Schema.Types.ObjectId, ref: 'appointment'},
 Name:{type: String, required: true},
 type:{type: String, required: true},
 experience:{type: String, required: true},
 Image:{type: String, required: true},
  slots:[{type:mongoose.Schema.Types.ObjectId, ref: 'Slot'}],
  created_at: {type:Date,required:true ,default: Date.now},
},{
  versionKey: false,
  timestamps: true
}
);
module.exports = mongoose.model("coach", coachSchema); // appointment
