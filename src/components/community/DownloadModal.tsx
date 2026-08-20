import { motion, AnimatePresence } from "framer-motion";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl overflow-hidden z-10 flex flex-col md:flex-row border border-outline-variant/20"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all p-2 rounded-full"
              aria-label="Close download modal"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Column - Mockup Graphic */}
            <div className="hidden md:flex md:w-1/2 bg-surface-container-low items-center justify-center p-12 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/10 rounded-full blur-3xl" />
              <img
                src="/images/phone-mockup.png"
                alt="Kulawise app on smartphone"
                className="w-full max-w-[280px] h-auto object-contain relative z-10 drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)] hover:scale-[1.03] transition-transform duration-500"
              />
            </div>

            {/* Right Column - Text & Downloads */}
            <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center text-center md:text-left bg-white">
              <span className="text-xs font-bold tracking-wider text-primary uppercase mb-3">
                Get the Kulawise App
              </span>
              <h2 className="text-3xl sm:text-4xl font-headline-xl text-on-surface leading-tight mb-4">
                Behavioral intelligence, <br className="hidden sm:block"/> right in your pocket.
              </h2>
              <p className="text-base text-on-surface-variant leading-relaxed mb-8 max-w-md">
                Download the Kulawise app to start tracking habits, joining Circles, and accessing your continuous health insights today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center md:items-start md:justify-start">
                <a
                  href="https://apps.apple.com/ng/app/kulawise/id6761377214"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all"
                  aria-label="Download on the App Store"
                >
                  <img
                    src="/images/app-store-badge.webp"
                    alt="Download on the App Store"
                    className="h-12 w-auto object-contain"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.kulawise.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all"
                  aria-label="Get it on Google Play"
                >
                  <img
                    src="/images/play-store-badge.png"
                    alt="Get it on Google Play"
                    className="h-12 w-auto object-contain"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
