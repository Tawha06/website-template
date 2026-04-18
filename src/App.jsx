import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import logo from '../assets/logo.png'
import workWebsite from '../assets/work-website.mp4'
import workLogo from '../assets/work-logo.mp4'
import workApp from '../assets/work-app.mp4'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const year = new Date().getFullYear()

const demoCopy = {
  web: {
    title: 'Website Direction',
    heading: 'Editorial layouts built for clarity and conversion',
    description: 'Information is structured like a guided story, so visitors understand your offer quickly and take action with confidence.',
    bullets: [
      'Narrative page flow with clear hierarchy',
      'Responsive behavior tuned per breakpoint',
      'CTAs placed where intent is highest',
    ],
  },
  logo: {
    title: 'Brand Direction',
    heading: 'Identity systems that hold up in real use',
    description: 'Wordmarks and symbols are designed for web, social, print, and signage so your brand stays consistent everywhere.',
    bullets: [
      'Primary mark plus practical lockups',
      'Type and color guidance for consistency',
      'Production-ready export package',
    ],
  },
  app: {
    title: 'Product Direction',
    heading: 'Operational tools that reduce daily friction',
    description: 'Internal products are scoped around your actual process, helping your team move faster with fewer manual steps.',
    bullets: [
      'Task-focused interfaces with clean states',
      'Connected data and reusable logic',
      'Built around your team workflow',
    ],
  },
}

const approachSteps = [
  {
    title: 'Discover',
    body: 'We map your offer, audience, and funnel first, so design choices are grounded in business goals.',
  },
  {
    title: 'Design',
    body: 'Layout, rhythm, and motion are shaped into a clear visual system that feels premium and easy to use.',
  },
  {
    title: 'Ship',
    body: 'Build quality, responsiveness, and performance are refined before launch so the site feels polished on every device.',
  },
]

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

function App() {
  const appRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDemo, setActiveDemo] = useState('web')
  const [legalKey, setLegalKey] = useState('')

  const copy = useMemo(() => demoCopy[activeDemo], [activeDemo])
  const legal = legalKey ? legalCopy[legalKey] : null

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const lenis = new Lenis({
      duration: 1.12,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.08,
      smoothWheel: true,
      syncTouch: false,
    })

    const update = (time) => {
      lenis.raf(time * 1000)
    }

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = legalKey ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [legalKey])

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !appRef.current) return undefined

    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      const themeStops = [
        { bg1: '#050d16', bg2: '#081321', halo: 'rgba(82, 170, 255, 0.10)' },
        { bg1: '#081420', bg2: '#0b1828', halo: 'rgba(82, 170, 255, 0.12)' },
        { bg1: '#0a1624', bg2: '#0e1b2c', halo: 'rgba(82, 170, 255, 0.13)' },
        { bg1: '#0b1727', bg2: '#102034', halo: 'rgba(127, 216, 255, 0.12)' },
        { bg1: '#0b1626', bg2: '#0f1e32', halo: 'rgba(142, 150, 255, 0.11)' },
      ]

      const applyTheme = (progress) => {
        const position = progress * (themeStops.length - 1)
        const index = Math.min(themeStops.length - 2, Math.max(0, Math.floor(position)))
        const local = position - index
        const current = themeStops[index]
        const next = themeStops[index + 1]

        const root = document.documentElement.style
        root.setProperty('--page-bg-1', gsap.utils.interpolate(current.bg1, next.bg1, local))
        root.setProperty('--page-bg-2', gsap.utils.interpolate(current.bg2, next.bg2, local))
        root.setProperty('--page-halo', gsap.utils.interpolate(current.halo, next.halo, local))
      }

      applyTheme(0)

      ScrollTrigger.create({
        trigger: appRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => applyTheme(self.progress),
      })

      const heroIntro = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.1 } })

      heroIntro
        .from('.hero-kicker', { y: 26 })
        .from('.hero-title-line', { x: -72, stagger: 0.12 }, '-=0.72')
        .from('.hero-sub', { y: 22 }, '-=0.78')
        .from('.hero-cta-row .btn', { y: 24, stagger: 0.08 }, '-=0.8')
        .from('.hero-kpis .badge-pill', { y: 26, stagger: 0.08 }, '-=0.75')

      gsap.utils.toArray('.section-panel').forEach((section, index) => {
        const dir = index % 2 === 0 ? -10 : 10
        const targets = section.querySelectorAll('[data-stagger]')

        gsap.fromTo(
          section,
          { yPercent: 14, xPercent: dir },
          {
            yPercent: 0,
            xPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              end: 'top 32%',
              scrub: 1.08,
            },
          }
        )

        if (targets.length) {
          gsap.fromTo(
            targets,
            { y: 34, x: dir * 2.4 },
            {
              y: 0,
              x: 0,
              stagger: 0.09,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top 84%',
                end: 'top 36%',
                scrub: 1,
              },
            }
          )
        }
      })

      gsap.utils.toArray('[data-depth]').forEach((layer) => {
        const amount = Number(layer.getAttribute('data-depth')) || 0.12
        gsap.to(layer, {
          yPercent: amount * -100,
          ease: 'none',
          scrollTrigger: {
            trigger: layer.closest('.section-panel') || layer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      })

      mm.add('(min-width: 981px)', () => {
        gsap.to('.gallery .shot', {
          yPercent: -4,
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '#work',
            start: 'top 80%',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })
    }, appRef)

    return () => {
      mm.revert()
      ctx.revert()
      ScrollTrigger.refresh()
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
        const rotateY = (x - 0.5) * 9
        const rotateX = (0.5 - y) * 8
        const glareX = x * 100
        const glareY = y * 100

        if (raf) return
        raf = window.requestAnimationFrame(() => {
          card.style.setProperty('--tilt-ry', `${rotateY.toFixed(2)}deg`)
          card.style.setProperty('--tilt-rx', `${rotateX.toFixed(2)}deg`)
          card.style.setProperty('--glare-x', `${glareX.toFixed(2)}%`)
          card.style.setProperty('--glare-y', `${glareY.toFixed(2)}%`)
          card.classList.add('tilting')
          raf = 0
        })
      }

      const onLeave = () => {
        card.style.setProperty('--tilt-ry', '0deg')
        card.style.setProperty('--tilt-rx', '0deg')
        card.style.setProperty('--glare-x', '50%')
        card.style.setProperty('--glare-y', '50%')
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

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const magnets = Array.from(document.querySelectorAll('.magnetic'))
    if (!magnets.length) return undefined

    const handlers = magnets.map((el) => {
      let raf = 0

      const onMove = (event) => {
        const rect = el.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5

        if (raf) return
        raf = window.requestAnimationFrame(() => {
          el.style.setProperty('--mx', `${(x * 8).toFixed(2)}px`)
          el.style.setProperty('--my', `${(y * 7).toFixed(2)}px`)
          raf = 0
        })
      }

      const onLeave = () => {
        el.style.setProperty('--mx', '0px')
        el.style.setProperty('--my', '0px')
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      return { el, onMove, onLeave }
    })

    return () => {
      handlers.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <div ref={appRef}>
      <header className="nav">
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label="Home" onClick={closeMenu}>
            <img src={logo} alt="Logo" className="brand-logo" />
          </a>

          <nav className="links" aria-label="Primary">
            <a href="#services">Services</a>
            <a href="#approach">Approach</a>
            <a href="#showroom">Examples</a>
            <a href="#pricing">Engagement</a>
            <a href="#work">Work</a>
            <a href="#contact" className="btn small magnetic">Start a project</a>
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
          <a className="drawer-link" href="#approach" onClick={closeMenu}>Approach</a>
          <a className="drawer-link" href="#showroom" onClick={closeMenu}>Examples</a>
          <a className="drawer-link" href="#pricing" onClick={closeMenu}>Engagement</a>
          <a className="drawer-link" href="#work" onClick={closeMenu}>Work</a>
          <div className="drawer-cta">
            <a className="btn full magnetic" href="#contact" onClick={closeMenu}>Start a project</a>
            <p className="tiny muted drawer-note">Response within one business day</p>
          </div>
        </div>
      </div>

      <main id="top">
        <section className="hero section-panel" id="hero">
          <div className="hero-inner" data-stagger>
            <p className="pill hero-kicker">Independent digital studio</p>

            <h1 className="hero-title">
              <span className="hero-title-line" data-text="Websites built for clarity.">Websites built for clarity.</span>
              <br />
              <span className="hero-title-line" data-text="Designed to convert.">Designed to convert.</span>
            </h1>

            <p className="sub hero-sub">
              Editorial structure, polished motion, and production-grade execution.
            </p>

            <div className="cta hero-cta-row" data-stagger>
              <a className="btn magnetic" href="#contact">Start a project</a>
              <a className="btn ghost magnetic" href="#work">View selected work</a>
            </div>

            <div className="hero-badges hero-kpis" data-stagger>
              <div className="badge-pill">
                <b>25+</b>
                <small>Launches delivered</small>
              </div>
              <div className="badge-pill">
                <b>2-6 weeks</b>
                <small>Typical first release cycle</small>
              </div>
              <div className="badge-pill">
                <b>100%</b>
                <small>Custom direction and build</small>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section section-panel services-panel">
          <div className="section-head" data-stagger>
            <h2>Core capabilities</h2>
            <p>Focused systems for teams that value quality and pace.</p>
          </div>

          <div className="grid3 stagger">
            <article className="card service-card tilt-card" style={{ '--i': 0 }} data-stagger>
              <div className="card-topline">
                <span className="chip">Web</span>
                <span className="chip subtle">Primary</span>
              </div>
              <h3>Flagship websites</h3>
              <p>Structured page systems with deliberate pacing and clear conversion paths.</p>
              <ul>
                <li>Narrative page architecture</li>
                <li>Event and conversion tracking</li>
                <li>Performance-first build quality</li>
              </ul>
            </article>

            <article className="card service-card tilt-card" style={{ '--i': 1 }} data-stagger>
              <div className="card-topline">
                <span className="chip">Identity</span>
                <span className="chip subtle">System</span>
              </div>
              <h3>Brand frameworks</h3>
              <p>Identity systems that stay coherent across campaigns and channels.</p>
              <ul>
                <li>Primary and secondary marks</li>
                <li>Type and color usage rules</li>
                <li>Ready-to-deploy asset package</li>
              </ul>
            </article>

            <article className="card service-card tilt-card" style={{ '--i': 2 }} data-stagger>
              <div className="card-topline">
                <span className="chip">Product</span>
                <span className="chip subtle">Ops</span>
              </div>
              <h3>Internal tools</h3>
              <p>Practical interfaces that remove repetitive friction from daily operations.</p>
              <ul>
                <li>Quote and booking engines</li>
                <li>Data views with clear states</li>
                <li>Integrations mapped to process</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="approach" className="section section-panel approach-panel">
          <div className="section-head" data-stagger>
            <h2>Process with intent</h2>
            <p>Small loops. High clarity. No wasted steps.</p>
          </div>

          <div className="approach-grid">
            <article className="approach-story" data-stagger>
              <p className="approach-label">Delivery rhythm</p>
              {approachSteps.map((step, index) => (
                <div className="approach-step" key={step.title} data-stagger>
                  <span className="approach-index">0{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </div>
              ))}
            </article>

            <aside className="approach-metrics" data-stagger>
              <div className="metric-box">
                <span>Sprint cadence</span>
                <b>Weekly delivery checkpoints</b>
              </div>
              <div className="metric-box">
                <span>Collaboration style</span>
                <b>Async-first, documented decisions</b>
              </div>
              <div className="metric-quote">
                <p>
                  "Everything felt sharper without adding clutter. Smooth on desktop and mobile."
                </p>
                <span>Recent client note</span>
              </div>
            </aside>
          </div>
        </section>

        <section id="showroom" className="section alt section-panel showroom-panel">
          <div className="section-head" data-stagger>
            <h2>Direction preview</h2>
            <p>Switch views to compare website, identity, and product outcomes.</p>
          </div>

          <div className="showroom">
            <div className="device" data-stagger>
              <div className="device-top">
                <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
                <span className="device-title">{copy.title}</span>
              </div>

              <div className="device-screen" data-depth="0.1">
                <div className="device-frame" />

                <div className={`demo demo-web ${activeDemo === 'web' ? 'active' : ''}`}>
                  <div className="demo-hero">
                    <div className="demo-pill">Structured narrative • Strong hierarchy</div>
                    <div className="demo-h1">Sections flow like a guided deck</div>
                    <div className="demo-sub">Positioning first, proof second, action at the right moment.</div>
                  </div>
                  <div className="demo-cards">
                    <div className="demo-card">Positioning</div>
                    <div className="demo-card">Proof</div>
                    <div className="demo-card">Action</div>
                  </div>
                  <div className="demo-footerline">
                    <span className="tiny muted">No templates</span>
                    <span className="tiny muted">Built for production</span>
                  </div>
                </div>

                <div className={`demo demo-logo ${activeDemo === 'logo' ? 'active' : ''}`}>
                  <div className="logo-wrap">
                    <div className="logo-glow" />
                    <img src={logo} alt="Logo demo" className="logo-big" />
                    <div className="logo-caption">Distinct marks with system logic</div>
                    <div className="logo-chips">
                      <span className="mini-chip">Primary mark</span>
                      <span className="mini-chip">Responsive lockups</span>
                      <span className="mini-chip">Export-ready files</span>
                    </div>
                  </div>
                </div>

                <div className={`demo demo-app ${activeDemo === 'app' ? 'active' : ''}`}>
                  <div className="app-ui">
                    <div className="app-head">Ops Estimator</div>
                    <div className="app-grid">
                      <div className="app-row"><span>Client</span><b>Northline Build Co</b></div>
                      <div className="app-row"><span>Package</span><b>Growth Retainer</b></div>
                      <div className="app-row"><span>Sprints</span><b>4</b></div>
                    </div>
                    <div className="app-total"><span>Estimate</span><b>$8,600</b></div>
                    <button className="app-btn magnetic" type="button">Generate Scope PDF</button>
                    <p className="app-note">Task-focused UI. Fewer clicks. Cleaner handoff.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="show-info" data-stagger>
              <h3>{copy.heading}</h3>
              <p>{copy.description}</p>

              <div className="demo-tabs" role="tablist" aria-label="Examples">
                <button className={`tab magnetic ${activeDemo === 'web' ? 'active' : ''}`} onClick={() => setActiveDemo('web')} type="button">Websites</button>
                <button className={`tab magnetic ${activeDemo === 'logo' ? 'active' : ''}`} onClick={() => setActiveDemo('logo')} type="button">Identity</button>
                <button className={`tab magnetic ${activeDemo === 'app' ? 'active' : ''}`} onClick={() => setActiveDemo('app')} type="button">Product</button>
              </div>

              <div className="bullets">
                {copy.bullets.map((item) => (
                  <div className="bullet" key={item}>• {item}</div>
                ))}
              </div>

              <div className="show-cta">
                <a className="btn full magnetic" href="#contact">Plan your project</a>
                <p className="tiny muted">Share scope, timing, and constraints. Receive a focused plan.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="section section-panel pricing-panel">
          <div className="section-head" data-stagger>
            <h2>Engagement models</h2>
            <p>Clear scopes. Real timelines. Deliverables ready to ship.</p>
          </div>

          <div className="pricing stagger">
            <article className="price-card tilt-card" style={{ '--i': 0 }} data-stagger>
              <div className="price-head">
                <h3>Launch</h3>
                <span className="price-chip">Focused rollout</span>
              </div>
              <p className="price">$1,500 - $2,500</p>
              <p className="desc">Fast release for teams that need a sharp first impression.</p>
              <ul>
                <li>1-3 strategic pages</li>
                <li>Responsive layout system</li>
                <li>Analytics and launch QA</li>
              </ul>
              <a className="btn full magnetic" href="#contact">Start with Launch</a>
            </article>

            <article className="price-card featured tilt-card" style={{ '--i': 1 }} data-stagger>
              <div className="price-head">
                <h3>Growth</h3>
                <span className="price-chip glow">Most selected</span>
              </div>
              <p className="price">$3,000 - $5,500</p>
              <p className="desc">Full web foundation with stronger storytelling and UX depth.</p>
              <ul>
                <li>5-8 strategic pages</li>
                <li>Conversion path design</li>
                <li>Performance and interaction polish</li>
              </ul>
              <a className="btn full magnetic" href="#contact">Start with Growth</a>
            </article>

            <article className="price-card tilt-card" style={{ '--i': 2 }} data-stagger>
              <div className="price-head">
                <h3>Studio Partner</h3>
                <span className="price-chip">Web + Product</span>
              </div>
              <p className="price">$6,000+</p>
              <p className="desc">Tailored direction for teams building both customer and internal surfaces.</p>
              <ul>
                <li>Custom product modules</li>
                <li>Integration mapping</li>
                <li>Priority iteration cycles</li>
              </ul>
              <a className="btn full magnetic" href="#contact">Book discovery</a>
            </article>
          </div>

          <div className="note" data-stagger>
            <div className="note-box">
              <b>Optional add-ons:</b>
              <span>Brand package $600-$1,500 • Extra pages $250-$500 • Maintenance $120-$450/month</span>
            </div>
          </div>
        </section>

        <section id="work" className="section alt section-panel work-panel">
          <div className="section-head" data-stagger>
            <h2>Selected work</h2>
            <p>Recent releases where interaction quality changed how users navigate and act.</p>
          </div>

          <div className="gallery stagger">
            <figure className="shot tilt-card" style={{ '--i': 0 }} data-stagger>
              <video className="media" src={workWebsite} autoPlay muted loop playsInline />
              <div className="shot-overlay"><span>Case Study</span><b>Site Redesign</b></div>
              <figcaption>
                <b>Service Business Platform</b>
                <span className="muted tiny">Sharper structure • Faster enquiry flow</span>
              </figcaption>
            </figure>

            <figure className="shot tilt-card" style={{ '--i': 1 }} data-stagger>
              <video className="media" src={workLogo} autoPlay muted loop playsInline />
              <div className="shot-overlay"><span>Identity</span><b>Brand System</b></div>
              <figcaption>
                <b>Brand Refresh Program</b>
                <span className="muted tiny">Logo suite • Type rules • Rollout assets</span>
              </figcaption>
            </figure>

            <figure className="shot tilt-card" style={{ '--i': 2 }} data-stagger>
              <video className="media" src={workApp} autoPlay muted loop playsInline />
              <div className="shot-overlay"><span>Product</span><b>Internal Tool</b></div>
              <figcaption>
                <b>Operations Dashboard</b>
                <span className="muted tiny">Quote logic • Workflow automation • Team control</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="contact" className="section section-panel contact-panel">
          <div className="contact">
            <div className="contact-copy" data-stagger>
              <p className="pill">Final step</p>
              <h2>Ready when you are</h2>
              <p>
                Send a short brief. Receive a clear scope, timeline, and budget range.
              </p>

              <div className="trust">
                <div className="trust-item">✓ Clear roadmap</div>
                <div className="trust-item">✓ Confident visual direction</div>
                <div className="trust-item">✓ Clean launch handoff</div>
              </div>
            </div>

            <form className="form" action="https://formspree.io/f/xkogprok" method="POST" data-stagger>
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
                Project brief
                <textarea name="details" placeholder="Business, goals, timeline, and what needs to be shipped" required />
              </label>

              <button className="btn full magnetic" type="submit">Send project brief</button>
              <p className="tiny muted">Reply within one business day.</p>
            </form>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-inner">
            <p className="footer-title">Lumero Studio</p>
            <p>Premium digital surfaces built with intent, structure, and momentum.</p>
            <div className="footer-links">
              <button className="legal-link" type="button" onClick={() => setLegalKey('privacy')}>Privacy</button>
              <button className="legal-link" type="button" onClick={() => setLegalKey('terms')}>Terms</button>
              <button className="legal-link" type="button" onClick={() => setLegalKey('refund')}>Refunds</button>
            </div>
            <p className="tiny muted">© {year} Lumero Studio</p>
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
    </div>
  )
}

export default App
