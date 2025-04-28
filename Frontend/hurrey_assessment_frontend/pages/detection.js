
'use client';
import { useEffect, useRef, useState,useCallback } from 'react';
import { FilesetResolver, FaceDetector, FaceLandmarker } from '@mediapipe/tasks-vision';

import FaceCanvas from '../pages/components/FaceCanvas';
import Transcript from './components/Transcript';
import ButtonControls from './components/ButtonControls';
import UserContext from "@/context/UserContext";
import React, { useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // usePathname helps
export default function FaceDetectionComponent() {


 

  const videoRef = useRef(null);
  const [faceDetector, setFaceDetector] = useState(null);
  const [faceMesh, setFaceMesh] = useState(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [transcript, setTranscript] = useState('');

  const [isAudioOn, setIsAudioOn] = useState(true);
  useEffect(() => {
  
    async function initModels() {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
      );
      
      const detector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite',
        },
        runningMode: 'VIDEO',
      });

      const mesh = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
        },
        runningMode: 'VIDEO',
        numFaces: 1,
      });

      setFaceDetector(detector);
      setFaceMesh(mesh);
    }

    initModels();
  }, []);

  // Initialize Video
  useEffect(() => {
   
    if (videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch(err => {
          console.error('Error accessing webcam: ', err);
        });
    }
  }, []);
 


  useEffect(() => {
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('SpeechRecognition API not supported.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = async (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript);
 
    };


    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, []);

  const toggleVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOn(prev => !prev);
    }
  };
  const toggleAudio = () => {
    setIsAudioOn(prev => !prev);
  };

  return (
    <div style={{ width: '100%', height: '980px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <FaceCanvas faceDetector={faceDetector} faceMesh={faceMesh} videoRef={videoRef} />
      <Transcript transcript={transcript} isAudioOn={isAudioOn}/>
      <ButtonControls isVideoOn={isVideoOn} toggleVideo={toggleVideo}  isAudioOn={isAudioOn} toggleAudio={toggleAudio}/>
    </div>
  );
}
