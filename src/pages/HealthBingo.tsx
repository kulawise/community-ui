import { useState, useEffect, useRef } from "react";
import BingoIntro from "../components/bingo/BingoIntro";
import BingoChecklist from "../components/bingo/BingoChecklist";
import PhotoUpload from "../components/bingo/PhotoUpload";
import BingoCardGenerator from "../components/bingo/BingoCardGenerator";

type BingoStep = "intro" | "checklist" | "photo" | "card";

export default function HealthBingo() {
  const [step, setStep] = useState<BingoStep>("intro");
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [photo, setPhoto] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sound/sandbreaker-379630.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    const playAudio = async () => {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
      } catch {
        // Error playing audio
      }
    };

    playAudio();

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleStart = () => {
    setStep("checklist");
  };

  const handleChecklistComplete = (items: Set<number>) => {
    setCheckedItems(items);
    setStep("photo");
  };

  const handlePhotoUploaded = (photoData: string) => {
    setPhoto(photoData);
    setStep("card");
  };

  const handleReset = () => {
    setCheckedItems(new Set());
    setPhoto(null);
    setStep("intro");
  };

  return (
    <div className="min-h-screen bg-white relative">
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full border-2 border-white shadow-brutal-sm transition-all duration-150"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      {step === "intro" && <BingoIntro onStart={handleStart} />}
      {step === "checklist" && (
        <BingoChecklist
          onComplete={handleChecklistComplete}
          initialChecked={checkedItems}
        />
      )}
      {step === "photo" && <PhotoUpload onUpload={handlePhotoUploaded} />}
      {step === "card" && (
        <BingoCardGenerator
          checkedItems={checkedItems}
          photo={photo}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
