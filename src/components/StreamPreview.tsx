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
    } catch (e) {
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
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } as const;

  return (
    <div className="space-y-3 rounded-md p-2" style={sectionBgStyle}>
      <div className="flex items-center justify-between">
        <h3 className="text-white text-sm tracking-wide">Live Stream</h3>
        <button
          onClick={handleToggle}
          className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors ${
            isOn
              ? 'bg-[var(--neon-green)] text-black border-[var(--neon-green)]'
              : 'bg-[var(--medium-gray)] text-white border-[var(--light-gray)] hover:border-[var(--neon-green)]'
          }`}
        >
          {isOn ? 'Pause' : 'Play'}
        </button>
      </div>

      <div
        className="relative h-32 sm:h-36 md:h-40 rounded overflow-hidden bg-black/20"
        aria-label="stream-preview"
      >
        {isOn && stream ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover z-10"
            muted
            playsInline
            autoPlay
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
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

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default StreamPreview;
