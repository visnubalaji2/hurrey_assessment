import { useEffect, useRef,useCallback } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from "@/context/UserContext";
import React, { useContext } from 'react';
export default function FaceCanvas({ faceDetector, faceMesh, videoRef }) {
  const canvasRef = useRef(null);
  const throttle = (fn, delay) => {
    let timer;
    return (...args) => {
      if (!timer) {
        fn(...args);
        timer = setTimeout(() => {
          timer = null;
        }, delay);
      }
    };
  };
const router=useRouter()
const {token}=useContext(UserContext)
  const saveDetections=async (detections,landmarks)=>{
    const res = await fetch('http://localhost:5000/api/saveData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,'Authorization':"Bearer "+ localStorage.getItem('token')},
        body: JSON.stringify({"detections":detections,"landmarks":landmarks}),
      });
     
      if(res.status==401){
        router.push('/login')
      }
  }


  const detectThrottle=useCallback(throttle(saveDetections, 6000), []);
  useEffect(() => {
    if (!faceDetector || !faceMesh) return;

    const canvasCtx = canvasRef.current.getContext('2d');

    const detectFaces = async () => {
      if (!videoRef.current || videoRef.current.readyState !== 4) {
        requestAnimationFrame(detectFaces);
        return;
      }

      const detections = await faceDetector.detectForVideo(videoRef.current, performance.now());
      const landmarks = await faceMesh.detectForVideo(videoRef.current, performance.now());
      detectThrottle(detections,landmarks)
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasCtx.drawImage(videoRef.current, 0, 0, 640, 480);

      if (detections?.detections) {
        detections.detections.forEach(detection => {
          const { originX, originY, width, height } = detection.boundingBox;
          canvasCtx.strokeStyle = 'red';
          canvasCtx.lineWidth = 4;
          canvasCtx.strokeRect(originX, originY, width, height);
        });
      }

      if (landmarks?.faceLandmarks) {
        landmarks.faceLandmarks.forEach(landmarkList => {
          canvasCtx.fillStyle = 'blue';
          landmarkList.forEach(point => {
            canvasCtx.beginPath();
            canvasCtx.arc(point.x * 640, point.y * 480, 1.5, 0, 2 * Math.PI);
            canvasCtx.fill();
          });
        });
      }

      requestAnimationFrame(detectFaces);
    };

   detectFaces()
  }, [faceDetector, faceMesh, videoRef]);

  return (
    <div style={{ position: 'relative', width: '640px', height: '480px' }}>
      <video ref={videoRef} style={{ display: 'none' }} playsInline muted></video>
      <canvas ref={canvasRef} width="640" height="480" style={{ border: '2px solid #0070f3', borderRadius: '8px' }} />
    </div>
  );
}
