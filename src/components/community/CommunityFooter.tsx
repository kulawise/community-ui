import { Link } from "react-router-dom";

export default function CommunityFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20 pt-20 pb-8 px-gutter">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="md:col-span-1">
          <div className="font-headline-md text-headline-md font-extrabold text-primary mb-4">
            Kulawise
          </div>
          <p className="font-body-md text-on-surface-variant mb-6">
            Empowering individuals and communities through AI-guided habits.
          </p>
          <div className="flex gap-4">
            <a
              href="https://x.com/getKulawise"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">
                tag
              </span>
            </a>
            <a
              href="https://instagram.com/kulawise"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">
                photo_camera
              </span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-label-bold text-on-surface mb-4">Platform</h4>
          <ul className="space-y-3">
            <li>
              <a
                href="https://kulawise.com/about"
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
              >
                Kula Circles
              </a>
            </li>
            <li>
              <a
                href="https://kulawise.com"
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
              >
                AI Insights
              </a>
            </li>
            <li>
              <Link
                to="/"
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
              >
                Community Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-label-bold text-on-surface mb-4">Impact</h4>
          <ul className="space-y-3">
            <li>
              <Link
                to="/impact"
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
              >
                SDG Commitments
              </Link>
            </li>
            <li>
              <Link
                to="/#partners"
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
              >
                Partner Ecosystem
              </Link>
            </li>
            <li>
              <Link
                to="/#stories"
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
              >
                Stories
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-label-bold text-on-surface mb-4">Company</h4>
          <ul className="space-y-3">
            <li>
              <a
                href="https://kulawise.com/about"
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="https://kulawise.com/privacy-policy"
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://kulawise.com/terms-of-service"
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="https://kulawise.com/data-handling"
                className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
              >
                Data Handling
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-container-max mx-auto mt-12 pt-8 border-t border-outline-variant/10 text-center space-y-2">
        <p className="font-body-md text-on-surface-variant/70 text-sm">
          &copy; {year} Kulawise. All rights reserved.
        </p>
        <p className="text-xs text-on-surface-variant/60 uppercase tracking-[0.2em]">
          Behaviour change infrastructure for health
        </p>
      </div>
    </footer>
  );
}
