import React from 'react'
import { Mono } from '@/components/primitives/Mono'
import { TREATMENT_LIST, WHATSAPP_HREF } from '@/content/seed'

export const Footer: React.FC = () => (
  <footer className="site-footer" style={{ backgroundColor: 'rgb(30, 26, 20)' }}>
    <div className="footer-top">
      <div className="footer-brand">
        <a href="/" className="logo logo-dark">
          <img src="/assets/logo-light.png" alt="BIMC CosMedic" />
        </a>
        <p>
          BIMC Hospital Nusa Dua
          <br />
          Kawasan ITDC Blok D
          <br />
          Nusa Dua 80363, Bali, Indonesia
        </p>
        <p className="footer-newsletter-label">Receive our quarterly journal</p>
        <form className="footer-newsletter" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Your email address" />
          <button type="submit">→</button>
        </form>
      </div>

      <div className="footer-col">
        <Mono>Treatments</Mono>
        <ul>
          {TREATMENT_LIST.map((t) => (
            <li key={t.slug}>
              <a href={`/treatment-${t.slug}`}>{t.t}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-col">
        <Mono>About</Mono>
        <ul>
          <li>
            <a href="/surgeons">Doctors</a>
          </li>
          <li>
            <a href="/journey">Your Journey</a>
          </li>
          <li>
            <a href="/results">Results</a>
          </li>
          <li>
            <a href="/pricing">Pricing</a>
          </li>
          <li>
            <a href="/press">Press</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li>
            <a href="/privacy">Privacy &amp; Terms</a>
          </li>
        </ul>
      </div>
      <div className="footer-col">
        <Mono>Connect</Mono>
        <ul>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener">
              WhatsApp
            </a>
          </li>
          <li>
            <a href="#">Instagram</a>
          </li>
          <li>
            <a href="#">Facebook</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <Mono>© MMXXVI BIMC CosMedic Centre</Mono>
      <Mono>PT Trisaka Reksa Waluya</Mono>
      <Mono>Designed in Bali</Mono>
    </div>
  </footer>
)
