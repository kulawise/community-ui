import { Link } from "react-router-dom";

export default function CommunityFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/10 py-12 px-gutter">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:items-start items-center">
          <div className="font-headline-md text-headline-md font-extrabold text-primary mb-1">
            Kulawise
          </div>
          <p className="text-xs text-on-surface-variant/60 uppercase tracking-[0.2em]">
            Behaviour change infrastructure for health
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/impact" className="text-on-surface-variant hover:text-primary transition-colors">
            Impact
          </Link>
          <a href="https://kulawise.com/privacy-policy" className="text-on-surface-variant hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="https://kulawise.com/terms-of-service" className="text-on-surface-variant hover:text-primary transition-colors">
            Terms of Service
          </a>
        </div>

        <div className="flex gap-4">
          <a
            href="https://x.com/getKulawise"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="w-8 h-8 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">tag</span>
          </a>
          <a
            href="https://instagram.com/kulawise"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-8 h-8 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
          </a>
          <a
            href="https://linkedin.com/company/kulawise"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-8 h-8 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="max-w-container-max mx-auto mt-6 pt-4 border-t border-outline-variant/10 text-center text-xs text-on-surface-variant/55">
        &copy; {year} Kulawise. All rights reserved.
      </div>
    </footer>
  );
}
