'use client';

import { useState } from 'react';
import { Mail, Clock, MessageSquare, Send } from 'lucide-react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState('submitting');
    // Simulate submission — swap for a real endpoint when ready
    await new Promise((r) => setTimeout(r, 1200));
    setFormState('success');
  }

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <p className="page-hero-eyebrow">Get In Touch</p>
          <h1 className="heading-display">Contact Us</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', maxWidth: '480px' }}>
            Questions, bulk orders, or just want to say hi — we&apos;re here for it.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container contact-grid">

          {/* Form */}
          <div className="contact-form-wrap">
            {formState === 'success' ? (
              <div className="contact-success">
                <MessageSquare size={32} strokeWidth={1.5} />
                <h2 className="heading-lg" style={{ marginTop: '1rem' }}>Message Sent</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Thanks for reaching out! We&apos;ll get back to you within 1–2 business days.
                </p>
                <button
                  className="btn btn-outline"
                  style={{ marginTop: '1.5rem' }}
                  onClick={() => { setFormState('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label className="label" htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="label" htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="input"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    className="select"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a topic…</option>
                    <option value="order">Order Question</option>
                    <option value="return">Return / Exchange</option>
                    <option value="bulk">Bulk / Wholesale</option>
                    <option value="custom">Custom Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="textarea"
                    placeholder="Tell us what's on your mind…"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {formState === 'error' && (
                  <p className="form-error">Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={formState === 'submitting'}
                  style={{ alignSelf: 'flex-start' }}
                >
                  <Send size={15} />
                  {formState === 'submitting' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Info panel */}
          <aside className="contact-info">
            <div className="contact-info-card">
              <div className="contact-info-item">
                <Mail size={18} strokeWidth={1.5} />
                <div>
                  <p className="label">Email</p>
                  <a href="mailto:hello@monkeybusinessmedia.com" className="contact-link">
                    hello@monkeybusinessmedia.com
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <Clock size={18} strokeWidth={1.5} />
                <div>
                  <p className="label">Response Time</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Within 1–2 business days<br />Mon – Fri, 9am – 5pm PT
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-info-card">
              <p className="label" style={{ marginBottom: '0.75rem' }}>Quick Links</p>
              <ul className="contact-quick-links">
                <li><a href="/faq">Frequently Asked Questions</a></li>
                <li><a href="/size-guide">Size Guide</a></li>
                <li><a href="/apparel-guide">Apparel Guide</a></li>
                <li><a href="/account/guest">Track My Order</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: start;
        }

        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 340px;
            gap: 4rem;
          }
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        @media (min-width: 560px) {
          .form-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .input,
        .textarea {
          width: 100%;
          padding: 0.65rem 0.875rem;
          font-size: 0.9rem;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--bg-white);
          color: var(--text);
          transition: border-color var(--transition);
          resize: vertical;
        }

        .input:focus,
        .textarea:focus {
          outline: none;
          border-color: var(--text);
        }

        .input::placeholder,
        .textarea::placeholder {
          color: var(--text-light);
        }

        .form-error {
          font-size: 0.85rem;
          color: #c0392b;
        }

        .contact-success {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 3rem 0;
          color: var(--text);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .contact-info-card {
          padding: 1.5rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--bg-white);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .contact-info-item {
          display: flex;
          gap: 0.875rem;
          align-items: flex-start;
          color: var(--text-muted);
        }

        .contact-info-item svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .contact-link {
          font-size: 0.9rem;
          color: var(--text);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .contact-link:hover {
          color: var(--text-muted);
        }

        .contact-quick-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .contact-quick-links a {
          font-size: 0.875rem;
          color: var(--text-muted);
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color var(--transition);
        }

        .contact-quick-links a:hover {
          color: var(--text);
        }
      `}</style>
    </div>
  );
}
