'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { ShoppingBag, Menu, X, Search, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchThemes } from '@/services/catalog.service';
import { useCart } from '@/providers/CartProvider';

const dropdownVariants = {
  hidden:  { opacity: 0, y: -6, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.18, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -6, scale: 0.97,  transition: { duration: 0.13, ease: 'easeIn'  } },
};

const accordionVariants = {
  hidden:  { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { height: 0, opacity: 0,      transition: { duration: 0.16, ease: 'easeIn'  } },
};

const mobileMenuVariants = {
  hidden:  { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.2, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' } },
};

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { itemCount, openCart } = useCart();

  const { data: themes = [] } = useQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });

  const sortedThemes = [...themes].sort((a, b) => a.name.localeCompare(b.name));

  const toggleMobileSection = (name: string) =>
    setMobileExpanded((prev) => (prev === name ? null : name));

  return (
    <>
      <div className="announcement-bar">
        Free shipping on orders over $75 — Use code FIRSTORDER for 15% off
      </div>

      <header className="navbar">
        <div className="container navbar-inner">
          {/* Mobile: hamburger */}
          <button
            className="navbar-icon-btn mobile-only"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <Image src="/monkey-icon.png" alt="Monkey Business" width={32} height={32} className="navbar-logo-icon" />
            <span className="navbar-logo-mark">Monkey Business</span>
            <span className="navbar-logo-text">MEDIA</span>
          </Link>

          {/* Desktop nav */}
          <nav className="navbar-nav desktop-only">
            {/* Shop by Brand */}
            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setActiveDropdown('shop')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="navbar-link nav-dropdown-trigger">
                Shop by Brand <ChevronDown size={11} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'shop' && (
                  <motion.div
                    className="nav-dropdown-menu nav-dropdown-menu--wide"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {sortedThemes.map((t) => (
                      <Link key={t.slug} href={`/themes/${t.slug}`} className="nav-dropdown-item">
                        <span className="nav-dropdown-item-name">{t.name}</span>
                        <span className="nav-dropdown-item-summary">{t.summary}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Browse */}
            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setActiveDropdown('browse')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="navbar-link nav-dropdown-trigger">
                Browse <ChevronDown size={11} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'browse' && (
                  <motion.div
                    className="nav-dropdown-menu"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link href="/best-sellers" className="nav-dropdown-item">Best Sellers</Link>
                    <Link href="/whats-new" className="nav-dropdown-item">New Additions</Link>
                    <Link href="/favorites" className="nav-dropdown-item">My Favorites</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About Us */}
            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="navbar-link nav-dropdown-trigger">
                About Us <ChevronDown size={11} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'about' && (
                  <motion.div
                    className="nav-dropdown-menu"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link href="/about" className="nav-dropdown-item">Our Company</Link>
                    <Link href="/apparel-guide" className="nav-dropdown-item">Apparel Guide</Link>
                    <Link href="/faq" className="nav-dropdown-item">FAQ</Link>
                    <Link href="/contact" className="nav-dropdown-item">Contact</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </nav>

          {/* Right actions */}
          <div className="navbar-actions">
            <button className="navbar-icon-btn desktop-only" aria-label="Search">
              <Search size={18} />
            </button>

            {/* Account dropdown */}
            <div
              className="nav-dropdown-wrapper desktop-only"
              onMouseEnter={() => setActiveDropdown('account')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="navbar-icon-btn" aria-label="Account">
                <User size={18} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'account' && (
                  <motion.div
                    className="nav-dropdown-menu nav-dropdown-menu--right"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link href="/account" className="nav-dropdown-item">Customer Login</Link>
                    <Link href="/account/guest" className="nav-dropdown-item">Guest Login</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className="navbar-icon-btn navbar-cart-btn"
              onClick={openCart}
              aria-label={`Cart (${itemCount} items)`}
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span className="navbar-cart-count">{itemCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="navbar-mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <nav className="navbar-mobile-nav">
                {/* Shop by Brand */}
                <button
                  className="navbar-mobile-section-btn"
                  onClick={() => toggleMobileSection('shop')}
                >
                  Shop by Brand
                  <motion.span animate={{ rotate: mobileExpanded === 'shop' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileExpanded === 'shop' && (
                    <motion.div
                      className="navbar-mobile-subsection"
                      variants={accordionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{ overflow: 'hidden' }}
                    >
                      {sortedThemes.map((t) => (
                        <Link
                          key={t.slug}
                          href={`/themes/${t.slug}`}
                          className="navbar-mobile-sublink"
                          onClick={() => setMobileOpen(false)}
                        >
                          {t.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Browse */}
                <button
                  className="navbar-mobile-section-btn"
                  onClick={() => toggleMobileSection('browse')}
                >
                  Browse
                  <motion.span animate={{ rotate: mobileExpanded === 'browse' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileExpanded === 'browse' && (
                    <motion.div
                      className="navbar-mobile-subsection"
                      variants={accordionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{ overflow: 'hidden' }}
                    >
                      <Link href="/best-sellers" className="navbar-mobile-sublink" onClick={() => setMobileOpen(false)}>Best Sellers</Link>
                      <Link href="/whats-new" className="navbar-mobile-sublink" onClick={() => setMobileOpen(false)}>New Additions</Link>
                      <Link href="/favorites" className="navbar-mobile-sublink" onClick={() => setMobileOpen(false)}>My Favorites</Link>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* About Us */}
                <button
                  className="navbar-mobile-section-btn"
                  onClick={() => toggleMobileSection('about')}
                >
                  About Us
                  <motion.span animate={{ rotate: mobileExpanded === 'about' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileExpanded === 'about' && (
                    <motion.div
                      className="navbar-mobile-subsection"
                      variants={accordionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{ overflow: 'hidden' }}
                    >
                      <Link href="/about" className="navbar-mobile-sublink" onClick={() => setMobileOpen(false)}>Our Company</Link>
                      <Link href="/apparel-guide" className="navbar-mobile-sublink" onClick={() => setMobileOpen(false)}>Apparel Guide</Link>
                      <Link href="/faq" className="navbar-mobile-sublink" onClick={() => setMobileOpen(false)}>FAQ</Link>
                      <Link href="/contact" className="navbar-mobile-sublink" onClick={() => setMobileOpen(false)}>Contact</Link>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Account */}
                <button
                  className="navbar-mobile-section-btn"
                  onClick={() => toggleMobileSection('account')}
                >
                  Account
                  <motion.span animate={{ rotate: mobileExpanded === 'account' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileExpanded === 'account' && (
                    <motion.div
                      className="navbar-mobile-subsection"
                      variants={accordionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{ overflow: 'hidden' }}
                    >
                      <Link href="/account" className="navbar-mobile-sublink" onClick={() => setMobileOpen(false)}>Customer Login</Link>
                      <Link href="/account/guest" className="navbar-mobile-sublink" onClick={() => setMobileOpen(false)}>Guest Login</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <style>{`
        .announcement-bar {
          background: var(--text);
          color: var(--bg);
          text-align: center;
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          height: 60px;
        }

        @media (min-width: 768px) {
          .navbar-inner {
            height: 68px;
          }
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          flex-shrink: 0;
        }

        .navbar-logo-icon {
          display: block;
          flex-shrink: 0;
        }

        .navbar-logo-mark {
          font-size: 1.125rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text);
          white-space: nowrap;
        }

        .navbar-logo-text {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--text-muted);
        }

        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          flex: 1;
          justify-content: center;
        }

        .navbar-link {
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          transition: color var(--transition);
          position: relative;
        }

        .navbar-link:hover {
          color: var(--text);
        }

        /* Dropdown */
        .nav-dropdown-wrapper {
          position: relative;
        }

        .nav-dropdown-trigger {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          transition: color var(--transition);
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }

        .nav-dropdown-trigger:hover {
          color: var(--text);
        }

        .nav-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          min-width: 180px;
          padding: 0.5rem 0;
          z-index: 200;
          transform-origin: top center;
        }

        .nav-dropdown-menu--right {
          left: auto;
          right: 0;
        }

        .nav-dropdown-menu--wide {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-width: 420px;
        }

        .nav-dropdown-item {
          display: block;
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          font-weight: 400;
          color: var(--text-muted);
          transition: background var(--transition), color var(--transition);
        }

        .nav-dropdown-item:hover {
          background: var(--border);
          color: var(--text);
        }

        .nav-dropdown-item-name {
          display: block;
        }

        .nav-dropdown-item-summary {
          display: block;
          font-size: 0.72rem;
          font-weight: 400;
          color: var(--text-muted);
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.2s ease, opacity 0.15s ease;
        }

        .nav-dropdown-item:hover .nav-dropdown-item-summary {
          max-height: 3rem;
          opacity: 1;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-left: auto;
        }

        .navbar-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          color: var(--text);
          transition: background var(--transition);
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
        }

        .navbar-icon-btn:hover {
          background: var(--border);
        }

        .navbar-cart-count {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 16px;
          height: 16px;
          background: var(--text);
          color: var(--bg);
          border-radius: 50%;
          font-size: 0.6rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Mobile menu */
        .navbar-mobile-menu {
          border-top: 1px solid var(--border);
          background: var(--bg);
          padding: 0.5rem 0 1rem;
        }

        .navbar-mobile-nav {
          display: flex;
          flex-direction: column;
          padding: 0 1.25rem;
        }

        .navbar-mobile-link {
          display: block;
          padding: 0.75rem 0;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text);
          border-bottom: 1px solid var(--border);
        }

        .navbar-mobile-section-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.75rem 0;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text);
          border: none;
          border-bottom: 1px solid var(--border);
          background: none;
          cursor: pointer;
          text-align: left;
        }

        .navbar-mobile-subsection {
          display: flex;
          flex-direction: column;
          padding-left: 1rem;
          border-bottom: 1px solid var(--border);
        }

        .navbar-mobile-sublink {
          display: block;
          padding: 0.6rem 0;
          font-size: 0.9rem;
          font-weight: 400;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
        }

        .navbar-mobile-sublink:last-child {
          border-bottom: none;
        }

        .desktop-only {
          display: none !important;
        }

        @media (min-width: 768px) {
          .desktop-only {
            display: flex !important;
          }
          .mobile-only {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
