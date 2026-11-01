'use client';

import { useState } from 'react';
import { Mail, MapPin, Clock } from 'lucide-react';

export default function AboutPage() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <p className="page-hero-eyebrow">Our Story</p>
          <h1 className="heading-display">About Monkey Business Media</h1>
        </div>
      </div>

      <section className="section">
        <div className="container about-grid">
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Who We Are</p>
            <h2 className="heading-xl" style={{ marginBottom: '1.25rem' }}>Apparel built around your passion.</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '1rem' }}>
              Monkey Business Media was founded on one simple belief: the things you love define who you are.
              Whether you&apos;re tearing up trails on a dirtbike, leading with grace in your everyday life,
              or something else entirely — your wardrobe should reflect that.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '1rem' }}>
              We curate premium themed collections across dozens of lifestyle categories and print them on
              high-quality blanks from the best brands in the industry.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1rem' }}>
              We&apos;re a neutral platform. Our job is to create the canvas; your identity provides the context.
            </p>
          </div>

          <div>
            <div className="about-stats">
              {[
                { label: 'Themes', value: '30+' },
                { label: 'Products', value: '200+' },
                { label: 'Happy Customers', value: '10K+' },
              ].map((stat) => (
                <div key={stat.label} className="about-stat">
                  <p className="about-stat-value">{stat.value}</p>
                  <p className="about-stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Contact */}
      <section className="section">
        <div className="container about-grid">
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Get In Touch</p>
            <h2 className="heading-xl" style={{ marginBottom: '2rem' }}>Contact Us</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                <Mail size={18} color="var(--text-muted)" style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Email</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>hello@monkeybusinessmedia.com</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                <Clock size={18} color="var(--text-muted)" style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Response Time</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Within 24 business hours</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                <MapPin size={18} color="var(--text-muted)" style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Based In</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>United States · Ships Worldwide</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="about-success">
                <p className="heading-md">Message received!</p>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  We&apos;ll get back to you within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="label" htmlFor="c-name">Name</label>
                  <input id="c-name" type="text" className="input" required value={contactForm.name} onChange={(e) => setContactForm((p) => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <label className="label" htmlFor="c-email">Email</label>
                  <input id="c-email" type="email" className="input" required value={contactForm.email} onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))} />
                </div>
                <div>
                  <label className="label" htmlFor="c-subject">Subject</label>
                  <input id="c-subject" type="text" className="input" required value={contactForm.subject} onChange={(e) => setContactForm((p) => ({ ...p, subject: e.target.value }))} />
                </div>
                <div>
                  <label className="label" htmlFor="c-message">Message</label>
                  <textarea
                    id="c-message"
                    className="input"
                    rows={5}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm((p) => ({ ...p, message: e.target.value }))}
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }

        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
        }

        .about-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .about-stat {
          background: var(--bg-white);
          padding: 2rem 1.5rem;
          text-align: center;
        }

        .about-stat-value {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text);
        }

        .about-stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        .about-success {
          padding: 2rem;
          background: var(--bg-white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
        }
      `}</style>
    </div>
  );
}
