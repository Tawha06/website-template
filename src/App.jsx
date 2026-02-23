import { useState } from 'react'
import './App.css'
import logo from '../assets/logo.png'

const year = new Date().getFullYear()

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#top" aria-label="Lumero Digital home" onClick={closeMenu}>
            <img src={logo} alt="Lumero Digital logo" className="brand-logo" />
            <span>Lumero Digital</span>
          </a>

          <button className="menu-toggle" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            Menu
          </button>

          <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#packages" onClick={closeMenu}>Packages</a>
            <a href="#process" onClick={closeMenu}>Process</a>
            <a href="#contact" className="btn btn-small" onClick={closeMenu}>Get a Quote</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">For Small Business Owners</p>
              <h1>Professional websites and digital tools that win more enquiries.</h1>
              <p className="lead">Lumero Digital designs and builds clean business websites, logo systems, and simple web apps such as booking forms, quote calculators, and small dashboards.</p>
              <div className="hero-cta">
                <a href="#contact" className="btn">Book a Free 20-Min Call</a>
                <a href="#packages" className="btn btn-ghost">View Packages</a>
              </div>
            </div>

            <aside className="hero-panel">
              <h2>What You Can Hire Me For</h2>
              <ul>
                <li>Website design and development</li>
                <li>Logo design and basic branding</li>
                <li>Simple business web apps</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Services</p>
              <h2>Everything needed for a credible online presence</h2>
            </div>
            <div className="cards three-col">
              <article className="card"><h3>Websites</h3><p>Clean, responsive websites built to explain your offer and drive enquiries.</p></article>
              <article className="card"><h3>Logo and Branding</h3><p>Simple identity systems that make your business look consistent and professional.</p></article>
              <article className="card"><h3>Simple Web Apps</h3><p>Custom mini-tools that reduce manual work and improve client experience.</p></article>
            </div>
          </div>
        </section>

        <section className="section section-soft" id="packages">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Packages</p>
              <h2>Simple options for different growth stages</h2>
            </div>
            <div className="cards three-col">
              <article className="card package"><p className="package-label">Starter</p><h3>Launch Site</h3><p className="price">$900 - $1,500</p></article>
              <article className="card package featured"><p className="package-label">Business</p><h3>Growth Website</h3><p className="price">$1,800 - $3,200</p></article>
              <article className="card package"><p className="package-label">Pro</p><h3>Website + App Toolkit</h3><p className="price">$3,500 - $6,500</p></article>
            </div>
          </div>
        </section>

        <section className="section section-soft" id="contact">
          <div className="container contact-wrap">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Let&apos;s plan your next website or digital tool</h2>
            </div>
            <form className="contact-form" action="https://formspree.io/f/xkogprok" method="POST">
              <input type="hidden" name="_subject" value="New enquiry - Lumero Digital" />
              <label htmlFor="name">Name</label><input id="name" name="name" required />
              <label htmlFor="email">Email</label><input id="email" name="email" type="email" required />
              <label htmlFor="details">Project details</label><textarea id="details" name="details" required />
              <button className="btn" type="submit">Request Quote</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <p>&copy; {year} Lumero Digital. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default App
