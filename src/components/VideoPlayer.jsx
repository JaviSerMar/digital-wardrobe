import { useEffect, useRef, useState } from "react";

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.5 18 12 8 18.5V5.5Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
    </svg>
  );
}

function BackwardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11 7 4 12l7 5V7ZM20 7l-7 5 7 5V7Z" />
    </svg>
  );
}

function ForwardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m13 7 7 5-7 5V7ZM4 7l7 5-7 5V7Z" />
    </svg>
  );
}

function VolumeIcon({ muted }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9.5h4l5-4v13l-5-4H4v-5Z" />
      {muted ? (
        <>
          <path d="m16 9 5 6" />
          <path d="m21 9-5 6" />
        </>
      ) : (
        <>
          <path d="M16 9a5 5 0 0 1 0 6" />
          <path d="M18.5 6.5a8.5 8.5 0 0 1 0 11" />
        </>
      )}
    </svg>
  );
}

function LoopIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17 17H8a4 4 0 0 1 0-8h10" />
      <path d="m15 7 3-3 3 3" />
      <path d="M7 7h9a4 4 0 0 1 0 8H6" />
      <path d="m9 17-3 3-3-3" />
    </svg>
  );
}

function RestartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 3H3v5" />
      <path d="M3 3l6 6" />
      <path d="M16 3h5v5" />
      <path d="m21 3-6 6" />
      <path d="M8 21H3v-5" />
      <path d="m3 21 6-6" />
      <path d="M16 21h5v-5" />
      <path d="m21 21-6-6" />
    </svg>
  );
}

function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const previousVolumeRef = useRef(0.8);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.volume = volume;
  }, [volume]);

  function stopWindowDrag(event) {
    event.stopPropagation();
  }

  async function togglePlay(event) {
    event?.stopPropagation();

    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        console.error("No se pudo reproducir el vídeo:", error);
      }
    } else {
      video.pause();
    }
  }

  function skipBackward(event) {
    event.stopPropagation();

    const video = videoRef.current;

    if (!video) return;

    video.currentTime = Math.max(0, video.currentTime - 5);
  }

  function skipForward(event) {
    event.stopPropagation();

    const video = videoRef.current;

    if (!video || !Number.isFinite(video.duration)) return;

    video.currentTime = Math.min(video.duration, video.currentTime + 5);
  }

  function handleSeek(event) {
    event.stopPropagation();

    const video = videoRef.current;
    const nextTime = Number(event.target.value);

    if (!video) return;

    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  function handleVolumeChange(event) {
    event.stopPropagation();

    const video = videoRef.current;
    const nextVolume = Number(event.target.value);

    if (!video) return;

    video.volume = nextVolume;
    video.muted = nextVolume === 0;

    if (nextVolume > 0) {
      previousVolumeRef.current = nextVolume;
    }

    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);
  }

  function toggleMute(event) {
    event.stopPropagation();

    const video = videoRef.current;

    if (!video) return;

    if (video.muted || volume === 0) {
      const restoredVolume = previousVolumeRef.current || 0.8;

      video.muted = false;
      video.volume = restoredVolume;
      setVolume(restoredVolume);
      setIsMuted(false);
    } else {
      previousVolumeRef.current = volume;
      video.muted = true;
      setIsMuted(true);
    }
  }

  return (
    <div className="video-file-viewer">
      <video
        ref={videoRef}
        className="video-file-player"
        src={src}
        playsInline
        preload="metadata"
        onPointerDown={stopWindowDrag}
        onClick={togglePlay}
        onLoadedMetadata={() => {
          const video = videoRef.current;

          if (!video) return;

          setDuration(video.duration);
          video.volume = volume;
        }}
        onTimeUpdate={() => {
          const video = videoRef.current;

          if (!video) return;

          setCurrentTime(video.currentTime);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <div
        className="video-custom-controls"
        onPointerDown={stopWindowDrag}
        onDoubleClick={stopWindowDrag}
      >
        <div className="video-controls-top">
          <div className="video-top-box video-volume-box">
            <button
              className="video-icon-button"
              type="button"
              onPointerDown={stopWindowDrag}
              onClick={toggleMute}
              aria-label={isMuted ? "Activar sonido" : "Silenciar"}
            >
              <VolumeIcon muted={isMuted} />
            </button>

            <input
              className="video-range video-volume-range"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              onPointerDown={stopWindowDrag}
              aria-label="Volumen"
            />
          </div>

          <div className="video-center-buttons">
            <button
              className="video-main-button"
              type="button"
              onPointerDown={stopWindowDrag}
              onClick={skipBackward}
              aria-label="Retroceder 5 segundos"
            >
              <BackwardIcon />
            </button>

            <button
              className="video-main-button video-main-play-button"
              type="button"
              onPointerDown={stopWindowDrag}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            <button
              className="video-main-button"
              type="button"
              onPointerDown={stopWindowDrag}
              onClick={skipForward}
              aria-label="Avanzar 5 segundos"
            >
              <ForwardIcon />
            </button>
          </div>

          <div className="video-top-box video-extra-box" aria-hidden="true">
            <button className="video-icon-button video-static-button" type="button" tabIndex="-1">
              <LoopIcon />
            </button>

            <button className="video-icon-button video-static-button" type="button" tabIndex="-1">
              <RestartIcon />
            </button>

            <button className="video-icon-button video-static-button" type="button" tabIndex="-1">
              <ExpandIcon />
            </button>
          </div>
        </div>

        <div className="video-controls-divider" />

        <div className="video-progress-row">
          <span className="video-time">{formatTime(currentTime)}</span>

          <input
            className="video-range video-progress-range"
            type="range"
            min="0"
            max={duration || 0}
            step="0.01"
            value={currentTime}
            onChange={handleSeek}
            onPointerDown={stopWindowDrag}
            aria-label="Progreso del vídeo"
          />

          <span className="video-time video-time-right">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;