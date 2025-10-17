"use client";

import React, { useEffect, useRef } from "react";
import {
  useFaceDetection,
  FaceDetection,
  Camera,
  Webcam,
  FaceDetectionResults,
} from "react-face-detection-hook";
import { toast } from "sonner";

export default function FaceMonitor() {
  const camWidth = 147;
  const camHeight = 110;
  const lastDetectionTime = useRef<number>(Date.now());
  const lastStatus = useRef<string>("");

  const { webcamRef } = useFaceDetection({
    handleOnFaceDetected,
    faceDetectionOptions: { model: "short" },
    faceDetection: new FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame }) =>
      new Camera(mediaSrc, {
        onFrame,
        width: camWidth,
        height: camHeight,
      }),
  });

  /** Maneja los resultados de detección de rostros */
  function handleOnFaceDetected({ detections }: FaceDetectionResults) {
    const count = detections?.length || 0;
    const now = Date.now();

    if (count === 0) {
      // No hay rostros detectados
      if (lastStatus.current !== "no-face") {
        toast.warning("No se detecta ninguna persona en cámara.");
        lastStatus.current = "no-face";
      }
    } else if (count > 1) {
      // Más de una persona
      if (lastStatus.current !== "multiple") {
        toast.error("Se detectan múltiples personas en cámara.");
        lastStatus.current = "multiple";
      }
    } else {
      // Todo bien, una sola cara
      if (lastStatus.current !== "ok") {
        toast.success("Persona detectada correctamente.");
        lastStatus.current = "ok";
      }
    }

    lastDetectionTime.current = now;
  }

  /** Si pasan más de 5s sin detección, lanza alerta */
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastDetectionTime.current > 5000) {
        if (lastStatus.current !== "no-detection") {
          toast.warning("No se detecta actividad en la cámara.");
          lastStatus.current = "no-detection";
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="
    fixed top-22 right-5 z-50
    ">
      <Webcam
        ref={webcamRef}
        style={{
          width: camWidth,
          height: camHeight,
          borderRadius: 10,
        }}
      />
    {/*   <p className="text-sm text-gray-500">
        Supervisión activa: detección de presencia y número de rostros.
      </p> */}
    </div>
  );
}
