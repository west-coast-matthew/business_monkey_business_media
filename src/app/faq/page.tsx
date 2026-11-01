'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'What are your products printed on?',
    a: 'We use premium blanks from industry-leading brands including Bella+Canvas, Gildan Softstyle, Champion, and Next Level Apparel. Each product page specifies the blank brand and style used.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Orders typically ship within 3–5 business days. Standard shipping then takes an additional 3–7 business days within the US. Expedited options are available at checkout.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes! We ship worldwide. International orders typically take 7–21 business days depending on the destination. Import duties and taxes may apply and are the responsibility of the recipient.',
  },
  {
    q: 'What is your return policy?',
    a: 'Since every item is made to order, we accept returns and exchanges only for items that arrive damaged or with a print defect. Please contact us within 14 days of delivery with a photo of the issue.',
  },
  {
    q: 'Can I change or cancel my order?',
    a: 'Orders can be modified or cancelled within 1 hour of placement. After that, production begins and we are unable to make changes. Please contact us immediately at hello@monkeybusinessmedia.com if you need to make a change.',
  },
  {
    q: 'How do I know what size to order?',
    a: 'We recommend checking our Size Guide page, which includes detailed measurements for every blank brand we use. When in doubt, size up — our tees tend to run true to size on Bella+Canvas blanks.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover). We also support Apple Pay and Google Pay at checkout.',
  },
  {
    q: 'Are the colors accurate to what I see on screen?',
    a: 'We do our best to display accurate colors, but monitor calibration and screen settings can affect how colors appear. There may be slight variations between what you see and the printed result.',
  },
  {
    q: 'Do you offer bulk or wholesale pricing?',
    a: 'Yes! For orders of 12+ units of the same design, we offer bulk pricing. Please contact us at hello@monkeybusinessmedia.com for a custom quote.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order ships, you\'ll receive a tracking number via email. You can also check order status in your account under "Order History".',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <ChevronDown
          size={18}
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease' }}
        />
      </button>
      {open && (
        <div className="faq-answer">
          <p>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <p className="page-hero-eyebrow">Help Center</p>
          <h1 className="heading-display">FAQ</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', maxWidth: '480px' }}>
            Quick answers to common questions. Can&apos;t find what you need?{' '}
            <a href="/about" style={{ textDecoration: 'underline', color: 'var(--text)' }}>Contact us</a>.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '720px' }}>
          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .faq-list {
          display: flex;
          flex-direction: column;
        }

        .faq-item {
          border-bottom: 1px solid var(--border);
        }

        .faq-item:first-child {
          border-top: 1px solid var(--border);
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 1.25rem 0;
          text-align: left;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text);
          transition: color var(--transition);
        }

        .faq-question:hover {
          color: var(--text-muted);
        }

        .faq-answer {
          padding-bottom: 1.25rem;
          font-size: 0.9375rem;
          color: var(--text-muted);
          line-height: 1.75;
        }
      `}</style>
    </div>
  );
}
