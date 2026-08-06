import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MUSIC_URL = "/audio/sangit.mp3";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const createAudio = () => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.8;
    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));
    audio.addEventListener("ended", () => setIsPlaying(false));
    audioRef.current = audio;
    return audio;
  };

  useEffect(() => {
    const audio = createAudio();

    audio.play().catch(() => {
      setIsPlaying(false);
    });

    const handleFirstInteraction = () => {
      if (audioRef.current?.paused) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    const currentAudio = audioRef.current;

    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      setIsPlaying(false);
      return;
    }

    if (currentAudio) {
      currentAudio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      return;
    }

    const audio = createAudio();
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
      title={isPlaying ? "Pause music" : "Play music"}
      className="fixed bottom-24 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-card transition-transform hover:scale-105"
    >
      {isPlaying ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
    </button>
  );
};

export default BackgroundMusic;
