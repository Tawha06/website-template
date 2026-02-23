import { useEffect, useMemo, useState } from 'react'
import './App.css'
import logo from '../assets/logo.png'
import workWebsite from '../assets/work-website.mp4'
import workLogo from '../assets/work-logo.mp4'
import workApp from '../assets/work-app.mp4'

const year = new Date().getFullYear()

const demoCopy = {
  web: {
    title: 'Website Demo',
    heading: 'Websites that feel premium',
    description: 'Smooth motion, clear spacing, and conversion-first layout inspired by modern product brands.',
    bullets: [
      'Smooth scroll reveal and transitions',
      'Brand-matched visual direction',
      'Clear structure built for enquiries',
    ],
  },
  logo: {
    title: 'Logo Demo',
    heading: 'Branding that looks credible everywhere',
    description: 'Simple logo systems that look sharp on socials, uniforms, invoices, and signage.',
    bullets: [
      'Icon and wordmark versions',
      'Social and profile-ready exports',
      'Consistent visual identity system',
    ],
  },
  app: {
    title: 'App Demo',
    heading: 'Simple tools that save time',
    description: 'Small web apps like calculators, booking flows, and internal dashboards tailored to your workflow.',
    bullets: [
      'Quote and estimate automation',
      'Simple dashboards and forms',
      'Built around your real process',
    ],
  },
}

const legalCopy = {
  privacy: {
    title: 'Privacy Policy (Summary)',
    body: [
      'We collect details you submit in the enquiry form, and may use basic analytics to improve performance.',
      'Your information is used to respond to enquiries, prepare quotes, and deliver requested services.',
      'We do not sell your data. Form submissions may be processed by Formspree as the contact provider.',
      `Last updated: ${year}`,
    ],
  },
  terms: {
    title: 'Terms of Service (Summary)',
    body: [
      'All projects are delivered to the agreed scope, timeline, and payment terms confirmed in writing.',
      'Clients provide accurate content, approvals, and feedback in time to avoid delays.',
      'Nothing on this site is legal advice. Service rights are provided in line with Australian Consumer Law.',
      `Last updated: ${year}`,
    ],
  },
  refund: {
    title: 'Refund Policy (Summary)',
    body: [
      'Deposits are generally non-refundable after project work begins because time is allocated to your build.',
      'If agreed scope is not delivered, we first remedy the issue. Where required, remedies follow Australian Consumer Law.',
      'Your statutory guarantees under Australian Consumer Law and NSW Fair Trading guidance are not excluded.',
      `Last updated: ${year}`,
    ],
  },
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDemo, setActiveDemo] = useState('web')
  const [legalKey, setLegalKey] = useState('')

  const copy = useMemo(() => demoCopy[activeDemo], [activeDemo])
  const legal = legalKey ? legalCopy[legalKey] : null

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in')
        })
      },
      { threshold: 0.14 }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label="Lumero Digital home" onClick={closeMenu}>
            <img src={logo} alt="Lumero Digital" className="brand-logo" />
          </a>

          <nav className="links" aria-label="Primary">
            <a href="#services">Services</a>
            <a href="#showroom">Showroom</a>
            <a href="#pricing">Pricing</a>
            <a href="#work">Work</a>
            <a href="#contact" className="btn small">Get a quote</a>
          </nav>

          <button className="menu" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            Menu
          </button>
        </div>
      </header>

      <div className={`drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="drawer-inner">
          <div className="drawer-top">
            <div className="drawer-title">Menu</div>
            <button className="drawer-close" type="button" onClick={closeMenu} aria-label="Close menu">
              X
            </button>
          </div>
          <a className="drawer-link" href="#services" onClick={closeMenu}>Services</a>
          <a className="drawer-link" href="#showroom" onClick={closeMenu}>Showroom</a>
          <a className="drawer-link" href="#pricing" onClick={closeMenu}>Pricing</a>
          <a className="drawer-link" href="#work" onClick={closeMenu}>Work</a>
          <div className="drawer-cta">
            <a className="btn full" href="#contact" onClick={closeMenu}>Get a quote</a>
            <p className="tiny muted drawer-note">Quick reply - clear scope - Sydney based</p>
          </div>
        </div>
      </div>

      <main id="top">
        <section className="hero reveal">
          <div className="hero-inner">
            <p className="pill">Websites · Branding · Simple Apps for Sydney businesses</p>

            <h1>
              Clear websites.<br />
              Credible branding.<br />
              Practical tools.
            </h1>

            <p className="sub">
              Lumero Digital helps small businesses explain what they do fast, build trust instantly, and convert
              more visitors into enquiries.
            </p>

            <div className="cta">
              <a className="btn" href="#pricing">See pricing</a>
              <a className="btn ghost" href="#showroom">See demos</a>
            </div>

            <div className="hero-badges">
              <div className="badge-pill"><b>Fast delivery</b><small>Optimised and responsive</small></div>
              <div className="badge-pill"><b>Simple UX</b><small>Easy to scan and navigate</small></div>
              <div className="badge-pill"><b>Lead focused</b><small>Built to drive enquiries</small></div>
            </div>
          </div>

          <div className="hero-art">
            <div className="glow" />
            <div className="card3d" aria-label="Lumero demo card">
              <div className="card-top">
                <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
                <span className="tag">Lumero Digital</span>
              </div>
              <div className="card-body">
                <p className="code-line">const website = <b>'custom'</b>;</p>
                <p className="code-line">const branding = <b>'credible'</b>;</p>
                <p className="code-line">const tools = <b>'practical'</b>;</p>
                <div className="progress"><div className="bar" /></div>
                <div className="mini-metrics">
                  <div><b>+ Speed</b><small>Fast load</small></div>
                  <div><b>+ Trust</b><small>Clear structure</small></div>
                  <div><b>+ Leads</b><small>Strong CTA</small></div>
                </div>
                <p className="tiny">website - logo - small apps - support</p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section reveal">
          <div className="section-head">
            <h2>What we build</h2>
            <p>Three focused services, delivered properly for small business growth.</p>
          </div>

          <div className="grid3">
            <article className="card reveal delay-1">
              <div className="card-topline">
                <span className="chip">Websites</span>
                <span className="chip subtle">Custom coded</span>
              </div>
              <h3>Business websites</h3>
              <p>Landing pages and multi-page sites designed to convert.</p>
              <ul>
                <li>Mobile-first layout</li>
                <li>Clear CTA and trust sections</li>
                <li>SEO-ready page structure</li>
              </ul>
            </article>

            <article className="card reveal delay-2">
              <div className="card-topline">
                <span className="chip">Branding</span>
                <span className="chip subtle">Logo systems</span>
              </div>
              <h3>Logo and identity</h3>
              <p>Simple branding that looks professional across every touchpoint.</p>
              <ul>
                <li>Primary and alternate logos</li>
                <li>Color and font guidance</li>
                <li>Social-ready exports</li>
              </ul>
            </article>

            <article className="card reveal delay-3">
              <div className="card-topline">
                <span className="chip">Small Apps</span>
                <span className="chip subtle">Automation</span>
              </div>
              <h3>Business mini tools</h3>
              <p>Quote calculators, booking flows, and lightweight dashboards.</p>
              <ul>
                <li>Custom forms and workflows</li>
                <li>Simple dashboard interfaces</li>
                <li>Admin time-saving tools</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="showroom" className="section alt reveal">
          <div className="section-head">
            <h2>Showroom</h2>
            <p>Preview the exact visual quality and interaction style used in client builds.</p>
          </div>

          <div className="showroom">
            <div className="device reveal delay-1">
              <div className="device-top">
                <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
                <span className="device-title">{copy.title}</span>
              </div>

              <div className="device-screen">
                <div className="device-frame" />

                <div className={`demo demo-web ${activeDemo === 'web' ? 'active' : ''}`}>
                  <div className="demo-hero">
                    <div className="demo-pill">Landing - Responsive - Fast</div>
                    <div className="demo-h1">Clean sections<br />with smooth reveals</div>
                    <div className="demo-sub">Premium spacing, strong hierarchy, and a clear call-to-action path.</div>
                  </div>
                  <div className="demo-cards">
                    <div className="demo-card">Services</div>
                    <div className="demo-card">Pricing</div>
                    <div className="demo-card">Contact</div>
                  </div>
                  <div className="demo-footerline">
                    <span className="tiny muted">Scroll reveal and soft shadows</span>
                    <span className="tiny muted">Built custom</span>
                  </div>
                  <div className="demo-sweep" />
                </div>

                <div className={`demo demo-logo ${activeDemo === 'logo' ? 'active' : ''}`}>
                  <div className="logo-wrap">
                    <div className="logo-glow" />
                    <img src={logo} alt="Logo demo" className="logo-big" />
                    <div className="logo-caption">Logo reveal + clean spacing</div>
                    <div className="logo-chips">
                      <span className="mini-chip">Icon</span>
                      <span className="mini-chip">Wordmark</span>
                      <span className="mini-chip">Social ready</span>
                    </div>
                  </div>
                </div>

                <div className={`demo demo-app ${activeDemo === 'app' ? 'active' : ''}`}>
                  <div className="app-ui">
                    <div className="app-head">Quote Generator</div>
                    <div className="app-grid">
                      <div className="app-row"><span>Client</span><b>Northside Glass</b></div>
                      <div className="app-row"><span>Type</span><b>Frameless</b></div>
                      <div className="app-row"><span>Qty</span><b>3</b></div>
                    </div>
                    <div className="app-total"><span>Total</span><b>$2,480</b></div>
                    <button className="app-btn" type="button">Generate PDF / Doc</button>
                    <p className="app-note">Auto-fills templates and saves admin time.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="show-info reveal delay-2">
              <h3>{copy.heading}</h3>
              <p>{copy.description}</p>

              <div className="demo-tabs" role="tablist" aria-label="Showroom demos">
                <button className={`tab ${activeDemo === 'web' ? 'active' : ''}`} onClick={() => setActiveDemo('web')} type="button">Websites</button>
                <button className={`tab ${activeDemo === 'logo' ? 'active' : ''}`} onClick={() => setActiveDemo('logo')} type="button">Logos</button>
                <button className={`tab ${activeDemo === 'app' ? 'active' : ''}`} onClick={() => setActiveDemo('app')} type="button">Small Apps</button>
              </div>

              <div className="bullets">
                {copy.bullets.map((item) => (
                  <div className="bullet" key={item}>✓ {item}</div>
                ))}
              </div>

              <div className="show-cta">
                <a className="btn full" href="#contact">Get a quote</a>
                <p className="tiny muted">Share what you need and receive a clear scope with pricing options.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="section reveal">
          <div className="section-head">
            <h2>Pricing</h2>
            <p>Competitive Sydney pricing for a solo specialist delivering premium quality.</p>
          </div>

          <div className="pricing">
            <article className="price-card reveal delay-1">
              <div className="price-head">
                <h3>Starter</h3>
                <span className="price-chip">Most popular start</span>
              </div>
              <p className="price">AUD $1,500 - $2,500</p>
              <p className="desc">1-3 page website for new or early-stage businesses.</p>
              <ul>
                <li>Mobile responsive build</li>
                <li>Contact form integration</li>
                <li>Basic SEO structure</li>
              </ul>
              <a className="btn full" href="#contact">Quote Starter</a>
            </article>

            <article className="price-card featured reveal delay-2">
              <div className="price-head">
                <h3>Business</h3>
                <span className="price-chip glow">Growth package</span>
              </div>
              <p className="price">AUD $3,000 - $5,500</p>
              <p className="desc">5-8 pages with stronger lead flow and tracking setup.</p>
              <ul>
                <li>Conversion-focused page structure</li>
                <li>Service and trust pages</li>
                <li>Analytics and event tracking</li>
              </ul>
              <a className="btn full" href="#contact">Quote Business</a>
            </article>

            <article className="price-card reveal delay-3">
              <div className="price-head">
                <h3>Pro</h3>
                <span className="price-chip">Custom scope</span>
              </div>
              <p className="price">AUD $6,000 - $10,000+</p>
              <p className="desc">Website plus one custom app feature for operational efficiency.</p>
              <ul>
                <li>Advanced page and feature set</li>
                <li>Small app workflow integration</li>
                <li>Priority support post-launch</li>
              </ul>
              <a className="btn full" href="#contact">Quote Pro</a>
            </article>
          </div>

          <div className="note reveal delay-3">
            <div className="note-box">
              <b>Add-ons:</b>
              <span className="muted">Branding pack AUD $600-$1,500 · Extra pages AUD $250-$500 · Monthly care AUD $120-$450</span>
            </div>
          </div>
        </section>

        <section id="work" className="section alt reveal">
          <div className="section-head">
            <h2>Example work</h2>
            <p>These are your original video showcases restored in the React build.</p>
          </div>

          <div className="gallery">
            <figure className="shot reveal delay-1">
              <video className="media" src={workWebsite} autoPlay muted loop playsInline />
              <figcaption>
                <b>Modern Website</b>
                <span className="muted tiny">Clean · fast · responsive</span>
              </figcaption>
            </figure>

            <figure className="shot reveal delay-2">
              <video className="media" src={workLogo} autoPlay muted loop playsInline />
              <figcaption>
                <b>Logo and Branding</b>
                <span className="muted tiny">Identity · motion · polish</span>
              </figcaption>
            </figure>

            <figure className="shot reveal delay-3">
              <video className="media" src={workApp} autoPlay muted loop playsInline />
              <figcaption>
                <b>Small App Tool</b>
                <span className="muted tiny">Automation · efficiency</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="contact" className="section reveal">
          <div className="contact">
            <div className="reveal delay-1">
              <h2>Get a quote</h2>
              <p>
                Tell me about your business and goals. I will reply with a clear scope, timeline, and recommended package.
              </p>

              <div className="trust">
                <div className="trust-item">✓ Clear pricing and scope</div>
                <div className="trust-item">✓ Professional delivery</div>
                <div className="trust-item">✓ Built custom for your workflow</div>
              </div>
            </div>

            <form className="form reveal delay-2" action="https://formspree.io/f/xkogprok" method="POST">
              <input type="hidden" name="_subject" value="New enquiry - Lumero Digital" />
              <input type="text" name="_gotcha" style={{ display: 'none' }} />

              <label>
                Name
                <input name="name" placeholder="Your name" required />
              </label>

              <label>
                Email
                <input name="email" type="email" placeholder="you@business.com" required />
              </label>

              <label>
                What do you need?
                <select name="service" required>
                  <option value="Website">Website</option>
                  <option value="Logo and Branding">Logo and Branding</option>
                  <option value="Small App / Automation">Small App / Automation</option>
                  <option value="Website + Branding">Website + Branding</option>
                </select>
              </label>

              <label>
                Details
                <textarea name="details" placeholder="Business name + pages/features/style" required />
              </label>

              <button className="btn full" type="submit">Send enquiry</button>
              <p className="tiny muted">Typical reply: within 24 hours.</p>
            </form>
          </div>
        </section>

        <footer className="footer reveal">
          <div className="footer-inner">
            <p>© {year} Lumero Digital</p>
            <div className="footer-links">
              <button className="legal-link" type="button" onClick={() => setLegalKey('privacy')}>Privacy</button>
              <button className="legal-link" type="button" onClick={() => setLegalKey('terms')}>Terms</button>
              <button className="legal-link" type="button" onClick={() => setLegalKey('refund')}>Refunds</button>
            </div>
            <p className="tiny muted">Australian sole trader · Rights provided under Australian Consumer Law and NSW Fair Trading guidance.</p>
          </div>
        </footer>
      </main>

      {legal && (
        <dialog className="legal" open onClick={(e) => { if (e.target === e.currentTarget) setLegalKey('') }}>
          <div className="legal-card">
            <div className="legal-top">
              <div className="legal-title">{legal.title}</div>
              <button className="legal-close" type="button" onClick={() => setLegalKey('')} aria-label="Close">X</button>
            </div>

            <div className="legal-body">
              {legal.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div className="legal-actions">
              <button className="btn ghost" type="button" onClick={() => setLegalKey('')}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </>
  )
}

export default App
