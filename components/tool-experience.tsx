"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Download, Maximize2, Pause, Play, RotateCcw, SkipForward, X } from "lucide-react";
import type { Tool } from "@/lib/tools";

type Props = { tool: Tool };
const testColours = [
  { name: "White", value: "#ffffff" }, { name: "Black", value: "#000000" },
  { name: "Red", value: "#ff0000" }, { name: "Green", value: "#00c853" },
  { name: "Blue", value: "#075bff" }, { name: "Yellow", value: "#ffe600" },
  { name: "Cyan", value: "#00e5ff" }, { name: "Magenta", value: "#ff00c8" },
  { name: "Gray", value: "#808080" }
];

function formatTime(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  return h > 0 ? `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}` : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function ToolExperience({ tool }: Props) {
  const [colour, setColour] = useState(tool.color || "#ffffff");
  const [fullscreen, setFullscreen] = useState(false);
  const [duration, setDuration] = useState(5 * 60);
  const [remaining, setRemaining] = useState(5 * 60);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [now, setNow] = useState(new Date());
  const [fakeProgress, setFakeProgress] = useState(7);
  const [hackerText, setHackerText] = useState("");
  const areaRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<number | null>(null);
  const elapsedBase = useRef(0);

  const enterFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) await areaRef.current?.requestFullscreen();
      else await document.exitFullscreen();
    } catch {
      setFullscreen(Boolean(document.fullscreenElement));
    }
  }, []);

  useEffect(() => {
    const update = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);

  useEffect(() => {
    if (!running || tool.kind !== "timer") return;
    const id = window.setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          setRunning(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, tool.kind]);

  useEffect(() => {
    if (!stopwatchRunning || tool.kind !== "stopwatch") return;
    const id = window.setInterval(() => {
      if (startedAt.current !== null) setElapsed(elapsedBase.current + (performance.now() - startedAt.current) / 1000);
    }, 50);
    return () => window.clearInterval(id);
  }, [stopwatchRunning, tool.kind]);

  useEffect(() => {
    if (tool.slug !== "flip-clock-screensaver") return;
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, [tool.slug]);

  useEffect(() => {
    if (!["fake-windows-10-update", "fake-windows-11-update", "fake-mac-update", "fake-android-update", "fake-windows-xp-update", "fake-chrome-os-update", "fake-ubuntu-update"].includes(tool.slug)) return;
    const id = window.setInterval(() => setFakeProgress((v) => v >= 99 ? 8 : v + 1), 1800);
    return () => window.clearInterval(id);
  }, [tool.slug]);

  const chooseDuration = (minutes: number) => {
    setDuration(minutes * 60);
    setRemaining(minutes * 60);
    setRunning(false);
  };

  const startStopwatch = () => {
    if (stopwatchRunning) {
      if (startedAt.current !== null) elapsedBase.current += (performance.now() - startedAt.current) / 1000;
      startedAt.current = null;
      setStopwatchRunning(false);
    } else {
      startedAt.current = performance.now();
      setStopwatchRunning(true);
    }
  };

  const resetStopwatch = () => {
    startedAt.current = null;
    elapsedBase.current = 0;
    setElapsed(0);
    setStopwatchRunning(false);
    setLaps([]);
  };

  const downloadColour = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.fillStyle = colour;
    context.fillRect(0, 0, canvas.width, canvas.height);
    const link = document.createElement("a");
    link.download = `${tool.slug}-1920x1080.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const isSolid = tool.kind === "color" || tool.kind === "image" || tool.slug === "screen-color-test" || tool.slug === "dead-pixel-test" || tool.slug === "screen-uniformity-test" || tool.slug === "monitor-test" || tool.slug === "oled-gray-test" || tool.slug === "oled-burn-in-test" || tool.slug === "screen-resolution-test";
  const showTimer = tool.kind === "timer";
  const showStopwatch = tool.kind === "stopwatch";
  const colourTools = tool.kind === "test" || tool.kind === "color" || tool.kind === "image";
  const activeColour = useMemo(() => colour, [colour]);

  const renderVisual = () => {
    if (isSolid) {
      if (tool.slug === "screen-resolution-test") return <div className="resolution-display"><span>SCREEN DIMENSIONS</span><strong>{typeof window === "undefined" ? "—" : `${window.screen.width} × ${window.screen.height}`}</strong><small>Browser viewport: {typeof window === "undefined" ? "—" : `${window.innerWidth} × ${window.innerHeight}`}</small><p>Values are provided by your browser and may not equal native panel resolution.</p></div>;
      return <div className="solid-colour" style={{ backgroundColor: activeColour }} aria-label={`${tool.title} colour field`} />;
    }
    if (tool.slug === "countdown-timer") return <div className="timer-display"><span className="timer-label">{remaining === 0 ? "TIME IS UP" : running ? "TIME REMAINING" : "READY WHEN YOU ARE"}</span><strong>{formatTime(remaining)}</strong><div className="timer-progress"><span style={{ width: `${Math.max(0, Math.min(100, (remaining / Math.max(duration, 1)) * 100))}%` }} /></div><p>{running ? "Timer running" : remaining === 0 ? "Timer complete" : "Choose a duration and press start"}</p></div>;
    if (tool.slug === "stopwatch") return <div className="timer-display"><span className="timer-label">ELAPSED TIME</span><strong>{formatTime(elapsed)}</strong><p>{stopwatchRunning ? "Stopwatch running" : "Ready to start"}</p></div>;
    if (tool.slug === "flip-clock-screensaver") return <div className="flip-clock"><strong>{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}</strong><span>{now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}</span></div>;
    if (tool.slug === "no-signal-screen") return <div className="no-signal"><div className="no-signal-box"><span className="no-signal-icon">▣</span><strong>NO SIGNAL</strong><span>SIMULATION · CHECK INPUT SOURCE</span><small>Decorative screen only</small></div></div>;
    if (tool.slug === "broken-screen") return <div className="cracked-screen"><div className="crack crack-one" /><div className="crack crack-two" /><div className="crack crack-three" /><span>SIMULATED CRACKED SCREEN</span></div>;
    if (tool.slug === "matrix-screensaver" || tool.slug === "hacker-typer") return <div className="matrix-effect" onClick={() => setHackerText((v) => (v + "\n> " + Array.from({ length: 5 }, () => Math.random().toString(16).slice(2, 8)).join("  ")).slice(-2400))} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key.length === 1) setHackerText((v) => (v + event.key).slice(-2400)); }}><pre>{(hackerText || Array.from({ length: 19 }, (_, i) => Array.from({ length: 8 }, (_, j) => ((i * 7 + j * 3) % 2 ? "01" : "A7")).join(" ")).toString().replaceAll(",", "\n"))}</pre><span>FICTIONAL VISUAL EFFECT · CLICK OR TYPE</span></div>;
    if (tool.slug === "fake-video-call" || tool.slug === "fake-zoom-call" || tool.slug === "fake-teams-call" || tool.slug === "fake-slack-huddle") return <div className="fake-call"><div className="call-top"><span>SIMULATION ONLY</span><span>00:04:32</span></div><div className="call-person"><div className="person-avatar">G</div><strong>Guest Participant</strong><span>Mock call interface — not connected</span></div><div className="call-controls"><span>Mic off</span><span>Camera off</span><span>Share</span><span className="call-end">End demo</span></div></div>;
    if (tool.slug.startsWith("fake-")) return <div className={`fake-update ${tool.slug.includes("mac") ? "fake-mac" : tool.slug.includes("android") ? "fake-android" : tool.slug.includes("ubuntu") ? "fake-linux" : ""}`}><div className="fake-update-content"><div className="fake-update-mark">{tool.slug.includes("ubuntu") ? "◉" : tool.slug.includes("mac") ? "◌" : tool.slug.includes("android") ? "◇" : "▦"}</div><h2>{tool.slug.includes("ubuntu") ? "System update simulation" : tool.slug.includes("android") ? "Installing fictional update" : "Working on updates"}</h2><p>Please wait while this demonstration progresses.</p><div className="fake-progress"><span style={{ width: `${fakeProgress}%` }} /></div><strong>{fakeProgress}%</strong><small>SIMULATION ONLY · NOT A REAL UPDATE</small></div></div>;
    if (tool.slug === "color-cycle") return <div className="cycle-effect" />;
    if (tool.slug === "gradient-screen") return <div className="gradient-effect" />;
    if (tool.slug === "snow-screen") return <div className="snow-effect"><span>❄</span><span>❅</span><span>❄</span><span>❆</span><span>❄</span><span>❅</span><span>❆</span><span>❄</span><span>❅</span><span>❄</span></div>;
    if (tool.slug === "dvd-screensaver" || tool.slug === "custom-dvd-screensaver") return <div className="dvd-effect"><span style={{ color: colour }}>SCREEN</span></div>;
    if (tool.slug === "zoom-lighting") return <div className="lighting-effect" style={{ background: `radial-gradient(circle at 50% 35%, ${colour}, #fff 80%)` }} />;
    if (tool.slug.includes("noise") || tool.slug === "static-screen" || tool.slug === "visual-noise") return <div className={`noise-effect ${tool.slug}`} />;
    return <div className="generic-effect"><div className="generic-orb" /><span>{tool.title.toUpperCase()}</span><small>ANIMATED BROWSER EFFECT</small></div>;
  };

  return (
    <section className={`tool-workspace ${fullscreen ? "workspace-fullscreen" : ""}`} ref={areaRef}>
      <div className="workspace-toolbar"><span className="workspace-title"><span className="workspace-status" /> {tool.title}</span><span className="workspace-actions"><button type="button" className="icon-button" onClick={enterFullscreen} aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}>{fullscreen ? <X size={17} /> : <Maximize2 size={17} />}<span>{fullscreen ? "Exit fullscreen" : "Fullscreen"}</span></button></span></div>
      <div className={`visual-stage ${isSolid ? "visual-stage-solid" : ""} ${tool.slug}`} style={isSolid ? { backgroundColor: colour } : undefined}>{renderVisual()}</div>
      {fullscreen && <button type="button" className="fullscreen-exit" onClick={enterFullscreen}><X size={17} /> Exit fullscreen</button>}
      <div className="workspace-controls">
        {colourTools && <div className="control-group"><label>Screen colour</label><div className="control-colours">{testColours.map((item) => <button type="button" key={item.name} title={item.name} aria-label={item.name} className={`control-swatch ${colour === item.value ? "selected" : ""}`} style={{ backgroundColor: item.value }} onClick={() => setColour(item.value)} />)}<label className="custom-colour">Custom<input type="color" value={colour} onChange={(event) => setColour(event.target.value)} /></label></div></div>}
        {showTimer && <div className="control-group"><label>Countdown duration</label><div className="preset-row">{[1, 3, 5, 10, 15, 30, 60].map((m) => <button key={m} className={`preset-button ${duration === m * 60 ? "active" : ""}`} type="button" onClick={() => chooseDuration(m)}>{m} min</button>)}</div><div className="timer-custom"><label>Custom minutes <input type="number" min="1" max="599" value={Math.max(1, Math.round(duration / 60))} onChange={(e) => chooseDuration(Math.max(1, Math.min(599, Number(e.target.value) || 1)))} /></label></div><div className="action-row"><button className="button button-primary" type="button" onClick={() => { if (remaining === 0) setRemaining(duration); setRunning((v) => !v); }}>{running ? <Pause size={16} /> : <Play size={16} />}{running ? "Pause timer" : "Start timer"}</button><button className="button button-secondary" type="button" onClick={() => { setRunning(false); setRemaining(duration); }}><RotateCcw size={16} /> Reset</button><button className="button button-secondary" type="button" onClick={enterFullscreen}><Maximize2 size={16} /> Fullscreen</button></div></div>}
        {showStopwatch && <div className="control-group"><label>Stopwatch controls</label><div className="action-row"><button className="button button-primary" type="button" onClick={startStopwatch}>{stopwatchRunning ? <Pause size={16} /> : <Play size={16} />}{stopwatchRunning ? "Pause" : "Start"}</button><button className="button button-secondary" type="button" onClick={() => setLaps((v) => [...v, elapsed])} disabled={!stopwatchRunning}><SkipForward size={16} /> Lap</button><button className="button button-secondary" type="button" onClick={resetStopwatch}><RotateCcw size={16} /> Reset</button></div>{laps.length > 0 && <div className="lap-list">{laps.map((lap, i) => <span key={`${i}-${lap}`}>Lap {i + 1}: {formatTime(lap)}</span>)}</div>}</div>}
        {tool.kind === "image" && <div className="control-group"><label>Save an image</label><div className="action-row"><button className="button button-primary" type="button" onClick={downloadColour}><Download size={16} /> Download 1920 × 1080 PNG</button></div></div>}
        {tool.kind === "effect" && tool.slug === "custom-dvd-screensaver" && <div className="control-group"><label>Shape colour</label><input type="color" value={colour} onChange={(e) => setColour(e.target.value)} /></div>}
        <p className="control-hint">Tip: use the fullscreen button for a larger view. Press Escape to exit fullscreen.</p>
      </div>
    </section>
  );
}
