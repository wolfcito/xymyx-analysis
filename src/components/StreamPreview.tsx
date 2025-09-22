'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const bgUrl = '/stream/overlay-bg.png';
const placeholderUrl = '/stream/placeholder.png';
const fallbackBgUrl = '/pieces/png/xymyx/stream.png';
const fallbackPlaceholderUrl = '/pieces/png/profile/PERFIL-CONTRINCANTE-01.png';

const StreamPreview: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isOn, setIsOn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [stream]);

  // Attach stream to the video and play once available
  useEffect(() => {
    if (!isOn || !stream || !videoRef.current) return;
    const v = videoRef.current;
    v.srcObject = stream;
    const tryPlay = () => v.play().catch(() => undefined);
    if ('onloadedmetadata' in v) {
      v.onloadedmetadata = tryPlay;
    }
    tryPlay();
  }, [isOn, stream]);

  const enableCamera = async () => {
    try {
      setError(null);
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('getUserMedia no soportado');
      }
      const media = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      setStream(media);
    } catch {
      setError('No se pudo acceder a la cámara');
      setIsOn(false);
    }
  };

  const disableCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleToggle = async () => {
    const next = !isOn;
    setIsOn(next);
    if (next) await enableCamera();
    else disableCamera();
  };

  const sectionBgStyle = {
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${bgUrl}), url(${fallbackBgUrl})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  } as const;

  return (
    <div className="w-full">
      {/* Frame with fixed aspect ratio to preserve border integrity */}
      <div className="relative w-full aspect-[1024/578]" style={sectionBgStyle}>
        {/* Safe area inside the frame (percentages tuned to avoid cutting the border) */}
        <div
          className="absolute inset-0"
          style={{ top: '7%', right: '4.5%', bottom: '9%', left: '4.5%' }}
        >
          <div className="relative h-full">
            {/* Video / Placeholder layer */}
            <div className="absolute inset-0" aria-label="stream-preview">
              {isOn && stream ? (
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  muted
                  playsInline
                  autoPlay
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Image
                    src={placeholderUrl}
                    alt="camera-off"
                    width={784}
                    height={886}
                    className="max-h-full w-auto object-contain"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.src = fallbackPlaceholderUrl;
                    }}
                  />
                </div>
              )}
            </div>

            {/* Top overlay bar for title and button */}
            <div className="absolute inset-x-0 top-0 z-20 pointer-events-none">
              <div className="h-12 bg-gradient-to-b from-black/50 to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 p-2 sm:p-3 flex items-center justify-between">
                <h3 className="text-white text-sm tracking-wide">Live Stream</h3>
                <button
                  onClick={handleToggle}
                  className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors pointer-events-auto ${
                    isOn
                      ? 'bg-[var(--neon-green)] text-black border-[var(--neon-green)]'
                      : 'bg-[var(--medium-gray)] text-white border-[var(--light-gray)] hover:border-[var(--neon-green)]'
                  }`}
                >
                  {isOn ? 'Apagar cámara' : 'Encender cámara'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default StreamPreview;
