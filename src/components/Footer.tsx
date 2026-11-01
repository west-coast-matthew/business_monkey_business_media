import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-mark">Monkey Business</span>
              <span className="footer-logo-text">MEDIA</span>
            </div>
            <p className="footer-tagline">
              Premium themed apparel for every lifestyle and passion.
              Neutrally curated. Boldly worn.
            </p>
          </div>

          {/* Shop */}
          <div className="footer-col">
            <p className="footer-heading">Shop</p>
            <nav className="footer-nav">
              <Link href="/themes">All Themes</Link>
              <Link href="/whats-new">What&apos;s New</Link>
              <Link href="/themes/grace-in-chaos">Grace in Chaos</Link>
              <Link href="/themes/mud-sweat-gears">Mud, Sweat & Gears</Link>
            </nav>
          </div>

          {/* Help */}
          <div className="footer-col">
            <p className="footer-heading">Help</p>
            <nav className="footer-nav">
              <Link href="/faq">FAQ</Link>
              <Link href="/size-guide">Size Guide</Link>
              <Link href="/clothing-brands">Our Blanks</Link>
              <Link href="/about">Contact Us</Link>
            </nav>
          </div>

          {/* Account */}
          <div className="footer-col">
            <p className="footer-heading">Account</p>
            <nav className="footer-nav">
              <Link href="/account">My Account</Link>
              <Link href="/account">Order Status</Link>
              <Link href="/account">Sign Up</Link>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Monkey Business Media. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--text);
          color: var(--bg);
          padding: 3.5rem 0 2rem;
          margin-top: auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        @media (min-width: 640px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr 1fr;
          }
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-logo {
          display: flex;
          align-items: baseline;
          gap: 0.375rem;
        }

        .footer-logo-mark {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #fff;
        }

        .footer-logo-text {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.5);
        }

        .footer-tagline {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
          max-width: 280px;
        }

        .footer-heading {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 1rem;
        }

        .footer-nav {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .footer-nav a {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.65);
          transition: color var(--transition);
        }

        .footer-nav a:hover {
          color: #fff;
        }

        .footer-bottom {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-top: 2rem;
        }

        @media (min-width: 640px) {
          .footer-bottom {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .footer-copy {
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.35);
        }

        .footer-legal {
          display: flex;
          gap: 1.5rem;
        }

        .footer-legal a {
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.35);
          transition: color var(--transition);
        }

        .footer-legal a:hover {
          color: rgba(255,255,255,0.7);
        }
      `}</style>
    </footer>
  );
}
