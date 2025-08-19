// CinematicPlayer.tsx (or .jsx)
import React, { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  accentClass?: string; // e.g. "from-fuchsia-500 to-violet-500"
};

export default function CinematicPlayer({
  src,
  poster,
  className = "",
  accentClass = "from-cyan-400 to-blue-500",
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [hover, setHover] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [vol, setVol] = useState(1);
  const [previewTime, setPreviewTime] = useState<number | null>(null);

const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPreviewTime(parseFloat(e.target.value)); // slider moves smoothly
};

const handleSeekCommit = (
  e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>
) => {
  const t = parseFloat(e.currentTarget.value);
  setPreviewTime(null);
  seekTo(t); // actually move video
};

  // time/duration sync
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => {
      setDuration(v.duration || 0);
      setReady(true);
    };
    const onTime = () => setTime(v.currentTime || 0);
    const onEnd = () => setPlaying(false);

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnd);
    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnd);
    };
  }, []);

  // keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement) && document.activeElement !== document.body) return;
      if (["Space", "KeyK"].includes(e.code)) {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowRight") seekBy(5);
      else if (e.code === "ArrowLeft") seekBy(-5);
      else if (e.code === "KeyM") setMuted(m => !m);
      else if (e.code === "KeyF") toggleFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [duration]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const seekTo = (t: number) => {
    const v = videoRef.current;
    if (!v) return;
    const clamped = Math.max(0, Math.min(t, duration || 0));
    v.currentTime = clamped;
    setTime(clamped);
  };
  const seekBy = (d: number) => seekTo(time + d);

  const toggleFullscreen = async () => {
    const el: any = containerRef.current;
    if (!el) return;
    const doc: any = document;
    if (!doc.fullscreenElement && el.requestFullscreen) {
      await el.requestFullscreen();
    } else if (doc.exitFullscreen) {
      await doc.exitFullscreen();
    }
  };

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const hh = Math.floor(s / 3600);
    const mm = Math.floor((s % 3600) / 60);
    const ss = Math.floor(s % 60);
    return (hh ? `${hh}:` : "") + `${hh ? String(mm).padStart(2, "0") : mm}:${String(ss).padStart(2, "0")}`;
  };

  // const progress = duration ? (time / duration) * 100 : 0;
  const current = previewTime !== null ? previewTime : time;
  const progress = duration ? (current / duration) * 100 : 0;


  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={`relative group rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-neutral-950 ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setSeeking(false); }}
    >
      {/* Glow gradient border */}
      <div className={`pointer-events-none absolute -inset-[1px] bg-gradient-to-br ${accentClass} opacity-20 blur-xl`} />

      {/* Video */}
      <video
        ref={videoRef}
        className="relative z-10 block"
        src={src}
        poster={poster}
        playsInline
        onClick={togglePlay}
        muted={muted}
        preload="metadata"
        style={{ aspectRatio: "16/9" }}
      />

      {/* Top gradient overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-black/60 to-transparent" />

      {/* Bottom gradient overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

      {/* Big center play/pause with pulse */}
      <button
        onClick={togglePlay}
        className={`absolute inset-0 z-30 grid place-content-center transition-opacity duration-300 ${hover || !playing ? "opacity-100" : "opacity-0"}`}
      >
        <span
          className={`relative inline-grid place-items-center rounded-full backdrop-blur-md bg-white/10 ring-1 ring-white/20 w-20 h-20 
          shadow-lg transition-transform duration-300 ${playing ? "scale-90" : "scale-100"}`}
        >
          {!playing ? (
            <>
              <span className="absolute inset-0 animate-ping rounded-full bg-white/20" />
              <svg viewBox="0 0 24 24" className="w-9 h-9 fill-white drop-shadow">
                <path d="M8 5v14l11-7z" />
              </svg>
            </>
          ) : (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white drop-shadow">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
          )}
        </span>
      </button>

      {/* Controls */}
      <div
        className={`absolute inset-x-4 bottom-4 z-30 transition-all duration-300
        ${hover || !playing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      >
        {/* Progress bar */}
        <div className="mb-3">
          <div className="relative h-3 group/progress">
            <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-white/80 to-white/60"
              style={{ width: `${progress}%` }}
            />
            {/* Buffered could be added here if desired */}

            {/* Seek handle */}
            {/* <div
              className="absolute -top-1.5"
              style={{ left: `calc(${progress}% - 8px)` }}
            >
              <div className={`h-6 w-6 rounded-full bg-white/90 shadow-lg transition-all duration-200
                ${seeking ? "scale-100 opacity-100" : "scale-0 opacity-0"} group-hover/progress:scale-100 group-hover/progress:opacity-100`} />
            </div> */}

            {/* Invisible range input overlaid */}
            {/* <input
              type="range"
              min={0}
              max={duration || 0}
              step="0.1"
              value={time}
              onChange={(e) => seekTo(parseFloat(e.target.value))}
              onMouseDown={() => setSeeking(true)}
              onMouseUp={() => setSeeking(false)}
              className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer"
              style={{ WebkitTapHighlightColor: "transparent" }}
            /> */}
            <input
              type="range"
              min={0}
              max={duration || 0}
              step="0.1"
              value={previewTime !== null ? previewTime : time}
              onChange={handleSeekChange}
              onMouseUp={handleSeekCommit}
              onTouchEnd={handleSeekCommit} // mobile
              style={{ WebkitTapHighlightColor: "transparent" }}
              className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer"
            />

          </div>

          {/* Times */}
          <div className="mt-1 flex items-center justify-between text-[12px] text-white/80 px-1">
            <span>{fmt(time)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>

        {/* Buttons row */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 active:scale-95 transition
            backdrop-blur ring-1 ring-white/15 text-white text-sm"
            title="Play/Pause (Space/K)"
          >
            {playing ? "Pause" : "Play"}
          </button>

          <button
            onClick={() => setMuted(m => !m)}
            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 active:scale-95 transition
            backdrop-blur ring-1 ring-white/15 text-white text-sm"
            title="Mute (M)"
          >
            {muted || vol === 0 ? "Unmute" : "Mute"}
          </button>

          <div className="flex items-center gap-2 ml-1">
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : vol}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                setVol(v);
                const el = videoRef.current;
                if (el) {
                  el.volume = v;
                  if (v === 0) setMuted(true);
                  else setMuted(false);
                }
              }}
              className="w-28 accent-white cursor-pointer"
              title="Volume"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => seekBy(-10)}
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 active:scale-95 transition backdrop-blur ring-1 ring-white/15 text-white text-sm"
              title="Back 10s (←)"
            >
              -10s
            </button>
            <button
              onClick={() => seekBy(10)}
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 active:scale-95 transition backdrop-blur ring-1 ring-white/15 text-white text-sm"
              title="Forward 10s (→)"
            >
              +10s
            </button>
            <button
              onClick={toggleFullscreen}
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 active:scale-95 transition
              backdrop-blur ring-1 ring-white/15 text-white text-sm"
              title="Fullscreen (F)"
            >
              Fullscreen
            </button>
          </div>
        </div>
      </div>

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-white/10" />
    </div>
  );
}
