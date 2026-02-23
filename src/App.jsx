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

          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu
          </button>

          <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#packages" onClick={closeMenu}>Packages</a>
            <a href="#process" onClick={closeMenu}>Process</a>
            <a href="#contact" className="btn btn-small" onClick={closeMenu}>Get a Quote</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="section hero">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">Sydney-Based Digital Partner</p>
              <h1>Websites and small business tools that bring in better leads.</h1>
              <p className="lead">
                Lumero Digital helps small businesses look credible online with clean websites, practical branding,
                and simple web apps that remove manual admin work.
              </p>

              <div className="hero-cta">
                <a href="#contact" className="btn">Book a Free Discovery Call</a>
                <a href="#packages" className="btn btn-ghost">See Packages</a>
              </div>

              <ul className="hero-trust" aria-label="Trust points">
                <li>Clear scope and fixed deliverables</li>
                <li>Built for mobile and conversion</li>
                <li>Fast communication and turnaround</li>
              </ul>
            </div>

            <aside className="hero-panel" aria-label="Who this is for">
              <h2>Best Fit Clients</h2>
              <ul>
                <li>Trades, clinics, and local services</li>
                <li>Consultants and solo operators</li>
                <li>Growing teams needing cleaner systems</li>
              </ul>
              <p>
                If your business relies on enquiries, reputation, and trust, this is built for you.
              </p>
            </aside>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Services</p>
              <h2>Focused offers that solve real business problems</h2>
              <p>No fluff. Every deliverable is tied to trust, clarity, and lead generation.</p>
            </div>

            <div className="cards three-col">
              <article className="card">
                <h3>Website Design + Development</h3>
                <p>Modern business sites that explain your offer fast and convert visitors into enquiries.</p>
                <ul>
                  <li>Landing pages or multi-page sites</li>
                  <li>Mobile-first responsive layouts</li>
                  <li>Conversion-focused structure</li>
                </ul>
              </article>

              <article className="card">
                <h3>Logo + Basic Branding</h3>
                <p>Simple and professional identity kits so your business looks consistent everywhere.</p>
                <ul>
                  <li>Primary logo + alternate mark</li>
                  <li>Brand colours and font pairing</li>
                  <li>Social-ready export files</li>
                </ul>
              </article>

              <article className="card">
                <h3>Simple Web Apps</h3>
                <p>Custom mini-tools such as booking forms, quote calculators, and internal dashboards.</p>
                <ul>
                  <li>Quote and estimate calculators</li>
                  <li>Booking and enquiry workflows</li>
                  <li>Light admin dashboards</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-soft" id="packages">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Pricing</p>
              <h2>Competitive Sydney pricing for solo-agency delivery</h2>
              <p>Transparent ranges so you can plan budget before we scope in detail.</p>
            </div>

            <div className="cards three-col pricing-grid">
              <article className="card package">
                <p className="package-label">Starter</p>
                <h3>Launch Website</h3>
                <p className="price">AUD $1,500 - $2,500</p>
                <ul>
                  <li>1-3 page business website</li>
                  <li>Contact form setup</li>
                  <li>Basic SEO setup</li>
                  <li>One revision round</li>
                </ul>
                <p className="meta">Typical timeline: 1-2 weeks</p>
              </article>

              <article className="card package featured">
                <p className="package-label">Business</p>
                <h3>Growth Website</h3>
                <p className="price">AUD $3,000 - $5,500</p>
                <ul>
                  <li>5-8 page site architecture</li>
                  <li>Lead funnel page structure</li>
                  <li>Analytics and tracking setup</li>
                  <li>Two revision rounds</li>
                </ul>
                <p className="meta">Typical timeline: 2-4 weeks</p>
              </article>

              <article className="card package">
                <p className="package-label">Pro</p>
                <h3>Website + App Toolkit</h3>
                <p className="price">AUD $6,000 - $10,000+</p>
                <ul>
                  <li>Custom website build</li>
                  <li>One business web-app feature</li>
                  <li>Branding pack included</li>
                  <li>Three revision rounds</li>
                </ul>
                <p className="meta">Typical timeline: 4-8 weeks</p>
              </article>
            </div>

            <div className="addons">
              <p>
                <strong>Common add-ons:</strong> branding-only package (AUD $600-$1,500), extra pages (AUD $250-$500 each),
                and monthly care plans (AUD $120-$450/month).
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Process</p>
              <h2>A clear process from brief to launch</h2>
            </div>

            <div className="cards three-col">
              <article className="card process-card">
                <p className="step">Step 1</p>
                <h3>Strategy Call</h3>
                <p>We define your goals, audience, and the exact pages or features needed.</p>
              </article>

              <article className="card process-card">
                <p className="step">Step 2</p>
                <h3>Design + Build</h3>
                <p>I design the layout and build your site or tool with regular check-ins.</p>
              </article>

              <article className="card process-card">
                <p className="step">Step 3</p>
                <h3>Launch + Improve</h3>
                <p>After launch, we refine based on real user behaviour and enquiries.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-soft" id="contact">
          <div className="container contact-wrap">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Tell me what you need and get a clear quote</h2>
              <p>
                Share your business details and goals. I will reply with scope, timeline, and the best-fit package.
              </p>
              <ul className="contact-points">
                <li>Response within 1 business day</li>
                <li>No-pressure consultation</li>
                <li>Practical options, no jargon</li>
              </ul>
            </div>

            <form className="contact-form" action="https://formspree.io/f/xkogprok" method="POST">
              <input type="hidden" name="_subject" value="New enquiry - Lumero Digital" />
              <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="honeypot" />

              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required placeholder="Your name" />

              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required placeholder="you@business.com" />

              <label htmlFor="service">Service needed</label>
              <select id="service" name="service" required>
                <option value="Website">Website</option>
                <option value="Branding">Branding</option>
                <option value="Web App">Web App</option>
                <option value="Not Sure">Not sure yet</option>
              </select>

              <label htmlFor="details">Project details</label>
              <textarea
                id="details"
                name="details"
                required
                placeholder="What do you need, and your target launch date?"
              />

              <button className="btn" type="submit">Request Quote</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <p>&copy; {year} Lumero Digital. All rights reserved.</p>
          <p className="footer-note">Sydney, Australia</p>
        </div>
      </footer>
    </>
  )
}

export default App
