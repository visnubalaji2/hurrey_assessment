const mongoose = require('mongoose');

const faceDetectionSchema = new mongoose.Schema({
  videoSessionId: String,
  detectedAt: Date,
  faces: String,
  landmarks:String
});

module.exports = mongoose.model('FaceDetection', faceDetectionSchema);