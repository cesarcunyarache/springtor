/* "use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import * as FaceDetection  from "@mediapipe/face_detection";
import { type Camera}  from "@mediapipe/camera_utils";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

export default function ProctoringCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);

  useEffect(() => {
    let camera: Camera | null = null;
    let lastToastTime = 0; // evita spam de toasts
    const toastCooldown = 5000; // 5 segundos entre alertas similares

    const showToast = (message: string, type: "warning" | "error" = "warning") => {
      const now = Date.now();
      if (now - lastToastTime < toastCooldown) return; // evita alertas seguidas
      lastToastTime = now;

      if (type === "error") {
        toast.error(message, { duration: 4000 });
      } else {
        toast.warning(message, { duration: 4000 });
      }
    };

    const init = async () => {
      try {
        // 1️⃣ Cargar modelo de objetos
        const objectModel = await cocoSsd.load();
        setModel(objectModel);

        // 2️⃣ Configurar modelo de detección facial de MediaPipe
        const faceDetection = new FaceDetection({
          locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
        });

        faceDetection.setOptions({
          model: "short",
          minDetectionConfidence: 0.5,
        });

        // 3️⃣ Función al detectar resultados
        faceDetection.onResults(async (results) => {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext("2d");
          if (!canvas || !ctx || !videoRef.current) return;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

          const faces = results.detections?.length || 0;

          // 🚨 Detectar rostros
          if (faces === 0) {
            showToast("No se detecta ninguna persona frente a la cámara.", "warning");
          } else if (faces > 1) {
            showToast("Se detectaron múltiples personas.", "error");
          }

          // 📱 Detectar objetos sospechosos (como celular)
          if (model && videoRef.current) {
            const predictions = await model.detect(videoRef.current);
            const cellPhone = predictions.find((p) => p.class === "cell phone");

            if (cellPhone) {
              showToast("Se detectó un celular cerca del estudiante.", "error");
              // Dibujar el rectángulo del objeto
              ctx.strokeStyle = "red";
              ctx.lineWidth = 3;
              ctx.strokeRect(
                cellPhone.bbox[0],
                cellPhone.bbox[1],
                cellPhone.bbox[2],
                cellPhone.bbox[3]
              );
              ctx.font = "14px Arial";
              ctx.fillStyle = "red";
              ctx.fillText(
                cellPhone.class,
                cellPhone.bbox[0],
                cellPhone.bbox[1] > 20 ? cellPhone.bbox[1] - 5 : 10
              );
            }
          }
        });

        // 4️⃣ Iniciar cámara
        if (videoRef.current) {
          camera = new Camera(videoRef.current, {
            onFrame: async () => {
              await faceDetection.send({ image: videoRef.current! });
            },
            width: 480,
            height: 360,
          });
          await camera.start();
        }
      } catch (error) {
        console.error("Error inicializando detección:", error);
        toast.error("No se pudo iniciar la detección o acceder a la cámara.");
      }
    };

    init();

    return () => {
      if (camera) camera.stop();
    };
  }, []);

  return (
    <div className="fixed top-20 right-5 z-50">
      <div className="relative w-96 h-64 border border-gray-400 rounded-xl overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute top-0 left-0 w-full h-full object-cover bg-black rounded-xl"
        />
        <canvas
          ref={canvasRef}
          width={480}
          height={360}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      </div>
    </div>
  );
}
 */