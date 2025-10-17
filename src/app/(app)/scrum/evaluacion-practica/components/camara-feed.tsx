"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function CameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        const constraints = { video: true };
        stream = await navigator.mediaDevices.getUserMedia(constraints);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraOn(true);
        }
      } catch (err) {
        toast.error("No se pudo acceder a la cámara. Verifica los permisos.");
        setError("No se pudo acceder a la cámara. Verifica los permisos.");
      }
    };

    startCamera();

    // Limpieza: detener la cámara al desmontar el componente
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setIsCameraOn(false);
      }
    };
  }, []);

  return (
    <div className="fixed top-24 right-5 z-20">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="rounded-xl shadow-md border border-gray-300 w-60 h-36 object-cover bg-black"
      />
    </div>
  );
}
