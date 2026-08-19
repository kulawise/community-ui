import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../../data/communityContent";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      <nav className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto relative">
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
        
        <div className="flex items-center space-x-4">
          <a
            href="https://kulawise.com"
            className="hidden sm:inline-block bg-primary text-on-primary px-4 py-2 text-sm sm:px-6 sm:py-2.5 sm:text-base rounded-full font-label-bold active:scale-95 transition-all"
          >
            Download App
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-on-surface-variant hover:text-primary p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-outline-variant/30 shadow-lg px-gutter py-4 flex flex-col space-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={
                pathname === link.href
                  ? "text-primary font-bold border-l-4 border-primary pl-3 py-3 bg-primary/5 rounded-r-lg font-body-md"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-variant/20 pl-4 py-3 transition-colors font-body-md rounded-r-lg"
              }
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 mt-2 border-t border-outline-variant/30">
            <a
              href="https://kulawise.com"
              className="sm:hidden block w-full text-center bg-primary text-on-primary px-4 py-3 rounded-full font-label-bold active:scale-95 transition-all"
            >
              Download App
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
