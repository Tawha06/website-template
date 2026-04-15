import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import logo from '../assets/logo.png'
import workWebsite from '../assets/work-website.mp4'
import workLogo from '../assets/work-logo.mp4'
import workApp from '../assets/work-app.mp4'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, RoundedBox } from '@react-three/drei'

const year = new Date().getFullYear()

const demoCopy = {
  web: {
    title: 'Website Demo',
    heading: 'Professional websites built fast',
    description: 'Clean, responsive sites optimized for leads. No templates. Coded from scratch with your brand and messaging.',
    bullets: [
      'Optimized for mobile and desktop',
      'Designed to get enquiries',
      'Built with your branding',
    ],
  },
  logo: {
    title: 'Logo Demo',
    heading: 'Logos that work everywhere',
    description: 'Simple, recognizable branding. Works on your website, social media, business cards, and signage.',
    bullets: [
      'Main logo + variations',
      'Color and font guidance',
      'All file formats included',
    ],
  },
  app: {
    title: 'App Demo',
    heading: 'Tools that save time',
    description: 'Quote generators, booking flows, and dashboards built to fit your workflow. Automate the repetitive work.',
    bullets: [
      'Quote generation tools',
      'Simple dashboards',
      'Tailored to your process',
    ],
  },
}

const legalCopy = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      'I collect your name and email when you submit the contact form. This is used to respond to your enquiry.',
      'I do not sell or share your information. It stays private.',
      'I use basic website analytics (Google Analytics) to understand how people use this site. No personal data is tracked.',
      'If you have questions, email me directly.',
      `Last updated: ${year}`,
    ],
  },
  terms: {
    title: 'Terms of Service',
    body: [
      'All projects include what I write and show you in the proposal. Scope changes are extra.',
      'You pay a deposit to start. The balance is due when I deliver.',
      'I deliver work that functions as described. If bugs happen, I fix them.',
      'If a project stops, you own what\'s been delivered. Unused deposits are not refunded.',
      `Last updated: ${year}`,
    ],
  },
  refund: {
    title: 'Refund Policy',
    body: [
      'Deposits are non-refundable once work starts. I hold time and resources for your project.',
      'If I can\'t deliver what we agreed on, I either fix it or you don\'t pay.',
      'If you cancel before work starts, you get your deposit back.',
      `Last updated: ${year}`,
    ],
  },
}

function HeroScene() {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.28) * 0.12
  })

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} />
      <Float floatIntensity={0.4} rotationIntensity={0.2} speed={0.9}>
        <group ref={groupRef}>
          <RoundedBox args={[2.5, 1.4, 0.18]} radius={0.16} smoothness={5}>
            <meshStandardMaterial color="#0b172e" metalness={0.34} roughness={0.28} />
          </RoundedBox>
        </group>
      </Float>
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
    </>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDemo, setActiveDemo] = useState('web')
  const [legalKey, setLegalKey] = useState('')

  const copy = useMemo(() => demoCopy[activeDemo], [activeDemo])
  const legal = legalKey ? legalCopy[legalKey] : null

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll('.reveal, .reveal-x, .reveal-up, .reveal-down, .reveal-scale')
    )
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = legalKey ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [legalKey])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'))
    const scrollEls = Array.from(document.querySelectorAll('[data-scroll]'))
    let raf = 0

    const update = () => {
      const vh = window.innerHeight || 1

      parallaxEls.forEach((el) => {
        const speed = Number(el.getAttribute('data-parallax')) || 0.2
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const delta = (center - vh / 2) / vh
        const y = -delta * speed * 120
        el.style.setProperty('--parallax-y', `${y.toFixed(2)}px`)
      })

      scrollEls.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const start = vh * 0.92
        const end = vh * 0.25
        const raw = (start - rect.top) / (start - end)
        const progress = Math.min(1, Math.max(0, raw))
        const ty = (1 - progress) * 22
        const scale = 0.965 + progress * 0.035
        const opacity = 0.45 + progress * 0.55
        const blur = (1 - progress) * 2.6

        el.style.setProperty('--scroll-ty', `${ty.toFixed(2)}px`)
        el.style.setProperty('--scroll-scale', scale.toFixed(3))
        el.style.setProperty('--scroll-opacity', opacity.toFixed(3))
        el.style.setProperty('--scroll-blur', `${blur.toFixed(2)}px`)
      })
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        update()
        raf = 0
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const cards = Array.from(document.querySelectorAll('.tilt-card'))
    if (!cards.length) return

    const handlers = cards.map((card) => {
      let raf = 0
      const onMove = (event) => {
        const rect = card.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width
        const y = (event.clientY - rect.top) / rect.height
        const rotateY = (x - 0.5) * 12
        const rotateX = (0.5 - y) * 10

        if (raf) return
        raf = window.requestAnimationFrame(() => {
          card.style.setProperty('--tilt-ry', `${rotateY.toFixed(2)}deg`)
          card.style.setProperty('--tilt-rx', `${rotateX.toFixed(2)}deg`)
          card.classList.add('tilting')
          raf = 0
        })
      }

      const onLeave = () => {
        card.style.setProperty('--tilt-ry', '0deg')
        card.style.setProperty('--tilt-rx', '0deg')
        card.classList.remove('tilting')
      }

      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)

      return { card, onMove, onLeave }
    })

    return () => {
      handlers.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label="Home" onClick={closeMenu}>
            <img src={logo} alt="Logo" className="brand-logo" />
          </a>

          <nav className="links" aria-label="Primary">
            <a href="#services">Services</a>
            <a href="#showroom">Examples</a>
            <a href="#pricing">Pricing</a>
            <a href="#work">Work</a>
            <a href="#contact" className="btn small">Get quote</a>
          </nav>

          <button className="menu" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            ☰
          </button>
        </div>
      </header>

      <div className={`drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="drawer-inner">
          <div className="drawer-top">
            <div className="drawer-title">Menu</div>
            <button className="drawer-close" type="button" onClick={closeMenu} aria-label="Close menu">
              ✕
            </button>
          </div>
          <a className="drawer-link" href="#services" onClick={closeMenu}>Services</a>
          <a className="drawer-link" href="#showroom" onClick={closeMenu}>Examples</a>
          <a className="drawer-link" href="#pricing" onClick={closeMenu}>Pricing</a>
          <a className="drawer-link" href="#work" onClick={closeMenu}>Work</a>
          <div className="drawer-cta">
            <a className="btn full" href="#contact" onClick={closeMenu}>Get quote</a>
            <p className="tiny muted drawer-note">I respond within 24 hours</p>
          </div>
        </div>
      </div>

      <main id="top">
        <section className="hero reveal">
          <div className="hero-inner">
            <p className="pill">I build websites, logos, and apps for businesses</p>

            <h1 className="hero-title">
              Custom websites & apps
              <br/>
              Built to grow your business
            </h1>

            <p className="sub">
              I code everything from scratch. No templates. Responsive sites that load fast, convert leads, and work on every device. Also logos and automation tools to run your business smoother.
            </p>

            <div className="cta">
              <a className="btn" href="#pricing">See pricing</a>
              <a className="btn ghost" href="#showroom">See examples</a>
            </div>

            <div className="hero-badges">
              <div className="badge-pill"><b>Fast to build</b><small>Get live in weeks not months</small></div>
              <div className="badge-pill"><b>Gets results</b><small>Designed for leads and conversions</small></div>
              <div className="badge-pill"><b>Built custom</b><small>Your brand, your message</small></div>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-canvas-wrap">
              <Canvas camera={{ position: [0, 0, 5], fov: 42 }} dpr={[1, 2]}>
                <HeroScene />
              </Canvas>
            </div>
            <div className="glow parallax" data-parallax="0.32" />
            <div className="card3d parallax tilt-card" data-parallax="0.18" aria-label="Lumero demo card">
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

        <section id="services" className="section reveal-x">
          <div className="section-head">
            <h2>What I build</h2>
            <p>Three core services. Each starts from scratch, tailored to your needs.</p>
          </div>

          <div className="grid3 stagger">
            <article className="card reveal-x">
              <div className="card-topline">
                <span className="chip">Websites</span>
              </div>
              <h3>Custom websites</h3>
              <p>Fast, responsive, conversion-focused. Built with clean code, optimized for Google.</p>
              <ul>
                <li>Mobile-first design</li>
                <li>Contact forms and tracking</li>
                <li>Google Analytics setup</li>
              </ul>
            </article>

            <article className="card reveal-x">
              <div className="card-topline">
                <span className="chip">Logos</span>
              </div>
              <h3>Logo & branding</h3>
              <p>Clean, simple logos that work on your website, socials, and printed materials.</p>
              <ul>
                <li>Main logo + variations</li>
                <li>Color palette & fonts</li>
                <li>All file formats</li>
              </ul>
            </article>

            <article className="card reveal-x">
              <div className="card-topline">
                <span className="chip">Apps</span>
              </div>
              <h3>Tools & automation</h3>
              <p>Quote generators, booking tools, dashboards. Whatever saves your team time.</p>
              <ul>
                <li>Custom workflows</li>
                <li>Quote/estimate tools</li>
                <li>Fits your process</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="showroom" className="section alt reveal-up">
          <div className="section-head">
            <h2>See examples</h2>
            <p>What your finished site or app will look like. These are actual builds.</p>
          </div>

          <div className="showroom">
            <div className="device reveal-up scroll-zoom" data-scroll="zoom">
              <div className="device-top">
                <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
                <span className="device-title">{copy.title}</span>
              </div>

              <div className="device-screen">
                <div className="device-frame" />

                <div className={`demo demo-web ${activeDemo === 'web' ? 'active' : ''}`}>
                  <div className="demo-hero">
                    <div className="demo-pill">Responsive • Fast • Mobile-optimized</div>
                    <div className="demo-h1">Clean sections, smooth reveals</div>
                    <div className="demo-sub">Proper spacing and hierarchy. Designed to get leads and enquiries from your visitors.</div>
                  </div>
                  <div className="demo-cards">
                    <div className="demo-card">Services</div>
                    <div className="demo-card">Pricing</div>
                    <div className="demo-card">Contact</div>
                  </div>
                  <div className="demo-footerline">
                    <span className="tiny muted">Built custom • No templates</span>
                    <span className="tiny muted">Works on all devices</span>
                  </div>
                  <div className="demo-sweep" />
                </div>

                <div className={`demo demo-logo ${activeDemo === 'logo' ? 'active' : ''}`}>
                  <div className="logo-wrap">
                    <div className="logo-glow" />
                    <img src={logo} alt="Logo demo" className="logo-big" />
                    <div className="logo-caption">Simple, memorable logos</div>
                    <div className="logo-chips">
                      <span className="mini-chip">Main logo</span>
                      <span className="mini-chip">Variations</span>
                      <span className="mini-chip">All formats</span>
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
                    <p className="app-note">Saves admin time. Generates quotes in seconds.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="show-info reveal-up scroll-zoom" data-scroll="zoom">
              <h3>{copy.heading}</h3>
              <p>{copy.description}</p>

              <div className="demo-tabs" role="tablist" aria-label="Examples">
                <button className={`tab ${activeDemo === 'web' ? 'active' : ''}`} onClick={() => setActiveDemo('web')} type="button">Websites</button>
                <button className={`tab ${activeDemo === 'logo' ? 'active' : ''}`} onClick={() => setActiveDemo('logo')} type="button">Logos</button>
                <button className={`tab ${activeDemo === 'app' ? 'active' : ''}`} onClick={() => setActiveDemo('app')} type="button">Apps</button>
              </div>

              <div className="bullets">
                {copy.bullets.map((item) => (
                  <div className="bullet" key={item}>✓ {item}</div>
                ))}
              </div>

              <div className="show-cta">
                <a className="btn full" href="#contact">Get a quote</a>
                <p className="tiny muted">Tell me what you need. I'll respond within 24 hours with a clear scope and price.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="section reveal-scale">
          <div className="section-head">
            <h2>Pricing</h2>
            <p>Competitive rates for custom work. Sydney-based. All projects start with a clear scope and timeline.</p>
          </div>

          <div className="pricing stagger">
            <article className="price-card reveal-x" style={{ '--i': 0 }}>
              <div className="price-head">
                <h3>Starter</h3>
                <span className="price-chip">Best for first site</span>
              </div>
              <p className="price">$1,500 – $2,500</p>
              <p className="desc">Simple website (1-3 pages). Perfect for getting online quickly.</p>
              <ul>
                <li>Mobile responsive</li>
                <li>Contact form</li>
                <li>Basic SEO setup</li>
              </ul>
              <a className="btn full" href="#contact">Get quote</a>
            </article>

            <article className="price-card featured reveal-x" style={{ '--i': 1 }}>
              <div className="price-head">
                <h3>Pro</h3>
                <span className="price-chip glow">Popular choice</span>
              </div>
              <p className="price">$3,000 – $5,500</p>
              <p className="desc">Full business site (5-8 pages) with email forms, tracking, and lead optimization.</p>
              <ul>
                <li>Lead capture pages</li>
                <li>Analytics tracking</li>
                <li>Conversion optimized</li>
              </ul>
              <a className="btn full" href="#contact">Get quote</a>
            </article>

            <article className="price-card reveal-x" style={{ '--i': 2 }}>
              <div className="price-head">
                <h3>Custom</h3>
                <span className="price-chip">Website + tools</span>
              </div>
              <p className="price">$6,000+</p>
              <p className="desc">Website plus custom app features (quotes, booking, dashboard). Whatever you need.</p>
              <ul>
                <li>Complex functionality</li>
                <li>Custom integrations</li>
                <li>Priority support</li>
              </ul>
              <a className="btn full" href="#contact">Get quote</a>
            </article>
          </div>

          <div className="note reveal delay-3">
            <div className="note-box">
              <b>Plus:</b>
              <span>Logo package $600-$1,500 • Extra pages $250-$500 • Monthly maintenance $120-$450</span>
            </div>
          </div>
        </section>

        <section id="work" className="section alt reveal-up">
          <div className="section-head">
            <h2>Recent work</h2>
            <p>Custom sites and apps built for real clients.</p>
          </div>

          <div className="gallery stagger">
            <figure className="shot reveal-x scroll-zoom" style={{ '--i': 0 }} data-scroll="zoom">
              <video className="media" src={workWebsite} autoPlay muted loop playsInline />
              <figcaption>
                <b>Business Website</b>
                <span className="muted tiny">Responsive • Fast • Converts leads</span>
              </figcaption>
            </figure>

            <figure className="shot reveal-x scroll-zoom" style={{ '--i': 1 }} data-scroll="zoom">
              <video className="media" src={workLogo} autoPlay muted loop playsInline />
              <figcaption>
                <b>Logo & Branding</b>
                <span className="muted tiny">Clean • Memorable • Works everywhere</span>
              </figcaption>
            </figure>

            <figure className="shot reveal-x scroll-zoom" style={{ '--i': 2 }} data-scroll="zoom">
              <video className="media" src={workApp} autoPlay muted loop playsInline />
              <figcaption>
                <b>Automation Tool</b>
                <span className="muted tiny">Quote generator • Saves time</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="contact" className="section reveal-down">
          <div className="contact">
            <div className="reveal-down">
              <h2>Get a quote</h2>
              <p>
                Tell me about your project. I'll send back a clear scope, timeline, and price within 24 hours. No meetings needed—just emails.
              </p>

              <div className="trust">
                <div className="trust-item">✓ Clear pricing</div>
                <div className="trust-item">✓ Written scope</div>
                <div className="trust-item">✓ On-time delivery</div>
              </div>
            </div>

            <form className="form reveal-down" action="https://formspree.io/f/xkogprok" method="POST">
              <input type="hidden" name="_subject" value="New project enquiry" />
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
                  <option value="App or Tool">App or Tool</option>
                  <option value="Website + Logo">Website + Logo</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label>
                Tell me about it
                <textarea name="details" placeholder="Your business name, what you offer, what you need built" required />
              </label>

              <button className="btn full" type="submit">Send enquiry</button>
              <p className="tiny muted">I reply within 24 hours during business days.</p>
            </form>
          </div>
        </section>

        <footer className="footer reveal">
          <div className="footer-inner">
            <p>Built by me. Custom work, always.</p>
            <div className="footer-links">
              <button className="legal-link" type="button" onClick={() => setLegalKey('privacy')}>Privacy</button>
              <button className="legal-link" type="button" onClick={() => setLegalKey('terms')}>Terms</button>
              <button className="legal-link" type="button" onClick={() => setLegalKey('refund')}>Refunds</button>
            </div>
            <p className="tiny muted">© {year}</p>
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
