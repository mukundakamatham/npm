// const mongoose = require('mongoose');
// const appointmentSchema = new mongoose.Schema({
//  user:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
//  coach:{type: mongoose.Schema.Types.ObjectId, ref: 'coach'},
//   slots:[{type:mongoose.Schema.Types.ObjectId, ref: 'Slot'}],
//   created_at: {type:Date,req:true},
// },{
//   versionKey: false,
//   timestamps: true
// }
// );
// module.exports = mongoose.model("Appointment", appointmentSchema); // appointment
const mongoose = require('mongoose');
const config = require('config');

const AppointmentSchema = mongoose.Schema({
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coach'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  time: {
    type: String
  },
  status: {
    type: String,
    enum: "accepted",
    default: 'accepted'//'requested'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports =  mongoose.model('appointment', AppointmentSchema);