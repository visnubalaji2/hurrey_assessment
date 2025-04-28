
const FaceDetection = require('../models/faceDetection');

const saveDetectionData=async (req,res)=>{

    res.send("Success")
  
    const detectionEntry = new FaceDetection({
      videoSessionId: "session_123",
      detectedAt: new Date(),
      faces:JSON.stringify(req.body.detections),
      landmarks:JSON.stringify(req.body.landmarks)
    });
  
   await detectionEntry.save();
  

}
  
module.exports={saveDetectionData}