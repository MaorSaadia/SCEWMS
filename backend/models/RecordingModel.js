const mongoose = require('mongoose');

const recordingSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  studentID: {
    type: String,
    required: true,
  },
});

const RecordingModel = mongoose.model('recording', recordingSchema);

exports.RecordingModel = RecordingModel;
