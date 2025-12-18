import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t-4 border-kulagreen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-300 text-lg mb-4">
            Powered by{" "}
            <a
              href="https://kulawise.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kulagreen hover:text-kulayellow font-bold transition-colors border-b-2 border-kulagreen hover:border-kulayellow"
            >
              Kulawise
            </a>
          </p>
          <div className="mb-4">
            <Link
              to="/2025-bingo"
              className="text-kulayellow hover:text-kulagreen font-bold transition-colors border-b-2 border-kulayellow hover:border-kulagreen text-lg"
            >
              Play 2025 Health Bingo →
            </Link>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-3 h-3 bg-kulagreen border-2 border-white"></div>
            <div className="w-3 h-3 bg-kulayellow border-2 border-white"></div>
            <div className="w-3 h-3 bg-kulapurple border-2 border-white"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
