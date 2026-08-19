import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../../data/communityContent";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 border-b border-outline-variant/30 backdrop-blur-md transition-colors ${
        scrolled ? "bg-white shadow-md" : "bg-surface/80"
      }`}
    >
      <nav className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto">
        <Link
          to="/"
          className="font-headline-md text-xl sm:text-headline-md font-extrabold text-primary"
        >
          Kulawise
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={
                pathname === link.href
                  ? "text-primary font-bold border-b-2 border-primary pb-1 font-body-md"
                  : "text-on-surface-variant hover:text-primary transition-colors font-body-md"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
        <a
          href="https://kulawise.com"
          className="bg-primary text-on-primary px-4 py-2 text-sm sm:px-6 sm:py-2.5 sm:text-base rounded-full font-label-bold active:scale-95 transition-all inline-block"
        >
          Download App
        </a>
      </nav>
    </header>
  );
}
