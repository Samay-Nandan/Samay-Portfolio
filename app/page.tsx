import Hero3D from "@/components/Hero3D";
import { RevealObserver, Typed } from "@/components/Motion";
import Pipeline from "@/components/Pipeline";
import ProjectGallery from "@/components/ProjectGallery";
import { cardMeta, experience, expertise, featured, pipeline, profile, projects, reach } from "@/content";
import { playbook, stories } from "@/stories";

const storyBySlug = Object.fromEntries(stories.map((s) => [s.slug, s]));

// SmartCaller leads: it's the largest and longest-running project.
const ordered = [
  ...featured.filter((p) => p.slug === "smartcaller"),
  ...featured.filter((p) => p.slug !== "smartcaller"),
  ...projects,
];

const NAV = [
  ["home", "#top"],
  ["expertise", "#expertise"],
  ["leadership", "#leadership"],
  ["work", "#work"],
  ["experience", "#experience"],
  ["contact", "#contact"],
] as const;

const icons: Record<string, React.ReactNode> = {
  lead: (
    <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="14" r="6" /><circle cx="10" cy="20" r="4" /><circle cx="38" cy="20" r="4" /><path d="M13 40c0-6 5-11 11-11s11 5 11 11M2 38c0-4 3-8 8-8M46 38c0-4-3-8-8-8" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 36h22a8 8 0 0 0 0-16 12 12 0 0 0-23-2A9 9 0 0 0 14 36Z" /><path d="M20 28l4-4 4 4M24 24v10" /></svg>
  ),
  plan: (
    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 10h32v30H8ZM8 18h32M16 6v8M32 6v8M14 26l4 4 7-7M28 28h6M14 35h20" /></svg>
  ),
  code: (
    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M16 14 6 24l10 10M32 14l10 10-10 10M27 10l-6 28" /></svg>
  ),
};

export default function Home() {
  return (
    <>
      <RevealObserver />
      <header className="nav">
        <a href="#top" className="nav__logo">
          {profile.short}<span>.</span><span className="nav__cursor">_</span>
        </a>
        <nav aria-label="Sections">
          {NAV.map(([label, href], i) => (
            <a key={label} href={href} className={label === "home" || label === "experience" || label === "leadership" ? "nav__hide-sm" : undefined}>
              <sup>0{i + 1}</sup>
              <span className="nav__slashes">// </span>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-name">
          <Hero3D />
          <div className="hero__content">
            <h1 id="hero-name" className="hero__name">{profile.name}</h1>
            <p className="hero__role">
              <Typed phrases={profile.typed} />
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#work">See my work</a>
              <a className="btn btn--ghost" href={profile.resume} download>Download resume</a>
            </div>
          </div>
          <a href="#about" className="hero__scroll" aria-label="Scroll to introduction">
            <span />
          </a>
        </section>

        <section id="about" className="about wrap" aria-label="Introduction">
          <p className="about__lead" data-reveal>{profile.intro}</p>
          <div className="reach" data-reveal>
            <p className="reach__label">Delivered for clients in</p>
            <ul className="reach__countries">
              {reach.countries.map((c) => (
                <li key={c.code}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/flags/${c.code}.svg`} alt="" width={36} height={24} />
                  {c.name}
                </li>
              ))}
            </ul>
            <ul className="reach__industries" aria-label="Industries">
              {reach.industries.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        </section>

        <section id="expertise" className="expertise wrap" aria-labelledby="expertise-heading">
          <h2 id="expertise-heading" className="title title--center" data-reveal>What I do</h2>
          <div className="expertise__grid" data-reveal>
            {expertise.map((e) => (
              <article key={e.title} className={`skill-card skill-card--${e.accent}`}>
                <div className="skill-card__head">
                  <span className="skill-card__icon">{icons[e.icon]}</span>
                  <h3><span>{e.title}</span></h3>
                </div>
                <p className="skill-card__tag">&lt;p&gt;</p>
                <p className="skill-card__body">{e.body}</p>
                <p className="skill-card__tag">&lt;/p&gt;</p>
              </article>
            ))}
          </div>
        </section>

        <section id="leadership" className="leadership wrap" aria-labelledby="leadership-heading">
          <h2 id="leadership-heading" className="title" data-reveal>How I lead &amp; deliver</h2>
          <p className="section-intro" data-reveal>
            The way I run client projects, from the first estimate to the final handover.
          </p>
          <ol className="playbook">
            {playbook.map((p, i) => (
              <li key={p.title} className="play" data-reveal>
                <span className="play__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.how}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="devops wrap" aria-labelledby="devops-heading">
          <div className="devops__head" data-reveal>
            <h2 id="devops-heading" className="title">How a project moves through my team</h2>
            <p>Every client project runs the same way, from the first call to sign-off, so delivery stays predictable.</p>
          </div>
          <div data-reveal>
            <Pipeline stages={pipeline} />
          </div>
        </section>

        <section id="work" className="work wrap" aria-labelledby="work-heading">
          <h2 id="work-heading" className="title title--huge" data-reveal>My<br />work</h2>

          <p className="work__intro" data-reveal>Nine projects across healthcare, travel, gaming, AI and cloud. Open any card for the architecture and what I built.</p>
          <ProjectGallery projects={ordered} meta={cardMeta} stories={storyBySlug} />
        </section>

        <section id="problems" className="problems wrap" aria-labelledby="problems-heading">
          <h2 id="problems-heading" className="title" data-reveal>Problems I’ve solved</h2>
          <p className="section-intro" data-reveal>Real incidents and hard calls from client projects: what went wrong, what I did, and what changed.</p>
          <div className="stories">
            {stories.map((s) => (
              <article key={s.title} className="story" data-reveal>
                <div className="story__head">
                  <p className="story__tag">{s.tag}</p>
                  <h3>{s.title}</h3>
                </div>
                <div className="story__cols">
                  <div>
                    <h4>The problem</h4>
                    <p>{s.problem}</p>
                  </div>
                  <div>
                    <h4>What I did</h4>
                    <p>{s.solution}</p>
                  </div>
                  <div className="story__result">
                    <h4>Result</h4>
                    <p>{s.result}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="experience wrap" aria-labelledby="exp-heading">
          <h2 id="exp-heading" className="title" data-reveal>Experience</h2>
          <ol className="timeline">
            {experience.map((e) => (
              <li key={e.company + e.title} className="timeline__item" data-reveal>
                <p className="timeline__period">{e.period}</p>
                <div>
                  <h3>{e.title}</h3>
                  <p className="timeline__company">{e.company}, {e.place}</p>
                  <ul>
                    {e.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer id="contact" className="contact">
        <div className="wrap contact__inner" data-reveal>
          <h2 className="contact__headline">Let’s work together.</h2>
          <p className="contact__meta">{profile.location}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={`mailto:${profile.email}`}>{profile.email}</a>
            <a className="btn btn--ghost" href={profile.resume} download>Download resume</a>
          </div>
          <p className="contact__links">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
          </p>
        </div>
      </footer>
    </>
  );
}
