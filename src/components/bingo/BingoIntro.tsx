interface BingoIntroProps {
  onStart: () => void;
}

export default function BingoIntro({ onStart }: BingoIntroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-kulagreen/10 to-kulayellow/20 px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Your 2025 Health Bingo
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-12 max-w-xl mx-auto">
          Tick what applied to you. No judgment. Just awareness.
        </p>
        <button
          onClick={onStart}
          className="bg-kulagreen text-white font-bold px-8 sm:px-12 py-4 sm:py-6 rounded-sm shadow-brutal active:shadow-brutal-sm active:translate-x-1 active:translate-y-1 transition-all duration-150 text-lg sm:text-xl border-4 border-black touch-manipulation w-full sm:w-auto"
        >
          Start Bingo
        </button>
      </div>
    </section>
  );
}
