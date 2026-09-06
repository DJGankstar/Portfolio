import { useEffect, useRef, useState } from "react";
import { useScrollMotion } from "./useScrollMotion";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  allWork,
  education,
  certifications,
  volunteer,
  skillCategories,
  cybersecurityTools,
} from "./content/portfolio";
import incident from "./content/incident-console.md?raw";
import assistant from "./content/job-application-assistant.md?raw";
import golden from "./content/golden-hour-pilates.md?raw";
import jztech from "./content/jz-tech.md?raw";
import jzsm from "./content/jzsm.md?raw";
import khan from "./content/khan-security-testing.md?raw";
import bunkerify from "./content/bunkerify.md?raw";

const mail = "mailto:mobeenk89@gmail.com";
const descriptions = [
  [
    "bunkerify",
    "Security, with a starting point.",
    "A self-assessment platform that turns complex security questions into a clearer next step.",
    "/images/bunkerify.png",
    "Security & AI",
    "Product design · Full-stack development",
    bunkerify,
  ],
  [
    "job-application-assistant",
    "Less admin. More opportunity.",
    "An AI-assisted resume workflow with private user workspaces and export-ready documents.",
    "/images/resume-tailor.png",
    "Applications",
    "Full-stack development · AI integration",
    assistant,
  ],
  [
    "local-llm-benchmark",
    "Small models. Real tradeoffs.",
    "An offline benchmark exploring speed, reliability and quality on a CPU-only machine.",
    null,
    "Security & AI",
    "Python · Evaluation design",
  ],
  [
    "cyber-content-bot",
    "From security feeds to useful drafts.",
    "A review-first content pipeline bringing vulnerability news and AI research into one dashboard.",
    null,
    "Security & AI",
    "Full-stack development · Automation",
  ],
  [
    "llm-security-tester",
    "Put model boundaries to the test.",
    "An extensible test harness for exploring prompt injection and other LLM failure modes.",
    null,
    "Security & AI",
    "Application security · AI evaluation",
  ],
  [
    "web-vulnerability-scanner",
    "Make findings easier to act on.",
    "A web scanner that brings severity, evidence and remediation into a single interface.",
    null,
    "Security & AI",
    "Application security · Full-stack development",
  ],
  [
    "incident-console",
    "Order in the middle of an incident.",
    "A production-support simulation, from initial triage to documented root-cause analysis.",
    "/images/Production-Support-Console.png",
    "Applications",
    "Full-stack development · Workflow design",
    incident,
  ],
  [
    "golden-hour-pilates",
    "A stronger digital first impression.",
    "A bold studio identity, translated into a more intuitive class-discovery and booking journey.",
    "/images/golden-hour/after-desktop.png",
    "Websites",
    "UX design · Frontend development",
    golden,
  ],
  [
    "jz-tech",
    "A studio identity, built for the web.",
    "An editorial website bringing brand, services and a clear enquiry journey together.",
    "/images/jztech/desktop.png",
    "Websites",
    "Brand implementation · Web development",
    jztech,
  ],
  [
    "jzsm",
    "Different needs. Clearer pathways.",
    "A seven-page service website designed around clarity, accessibility and everyday usability.",
    "/images/jzsm/desktop.png",
    "Websites",
    "Information architecture · Web development",
    jzsm,
  ],
  [
    "cancer-awareness-app",
    "Useful information, closer to hand.",
    "A cross-platform awareness app with educational content and privacy-conscious user journeys.",
    null,
    "Applications",
    "Mobile development",
  ],
];
const work = allWork.map((item) => {
  const [slug, headline, summary, image, type, role, markdown] =
    descriptions.find(([id]) => id === item.slug);
  return { ...item, slug, headline, summary, image, type, role, markdown };
});
work.push({
  title: "Khan Security Testing",
  slug: "khan-security-testing",
  headline: "Security expertise, clearly communicated.",
  summary:
    "A security-services website designed to make testing, scope and the next step easier to understand.",
  image: "/images/khan-security-testing.png",
  type: "Websites",
  role: "Website design · Frontend development",
  website: "https://www.khansecuritytesting.com",
  techStack: ["React", "TypeScript", "Tailwind CSS"],
  markdown: khan,
  points: [],
});
const featured = [
  "golden-hour-pilates",
  "jz-tech",
  "jzsm",
  "khan-security-testing",
  "bunkerify",
  "incident-console",
].map((slug) => work.find((item) => item.slug === slug));
const titleFor = (item) =>
  item.slug === "golden-hour-pilates"
    ? "Golden Hour Pilates"
    : item.slug === "incident-console"
      ? "Incident Console"
      : item.slug === "jz-tech"
        ? "JZ Tech"
        : item.title;
const pathFor = (item) => `/projects/${item.slug}`;
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function External({ href, children, className = "" }) {
  return (
    <a href={href} className={className} target="_blank" rel="noreferrer">
      {children} <Arrow />
    </a>
  );
}
function SectionLabel({ number, children }) {
  return (
    <p className="eyebrow">
      <span>{number} /</span> {children}
    </p>
  );
}
function RouteEffects() {
  const location = useLocation();
  const previousRoute = useRef(`${location.pathname}${location.hash}`);
  useEffect(() => {
    const project = work.find(
      (item) =>
        location.pathname === `/projects/${item.slug}` ||
        location.pathname === `/experience/${item.slug}`,
    );
    const pageName = project
      ? titleFor(project)
      : location.pathname === "/projects"
        ? "Selected work"
        : location.pathname === "/about"
          ? "About"
          : location.pathname === "/"
            ? "Developer & creative problem solver"
            : "Page not found";
    document.title = `${pageName} | Mobeen Khan`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        project?.summary ||
          "Mobeen Khan is an Australia-based developer building thoughtful websites, full-stack applications and practical security tools. Explore selected work and get in touch.",
      );
    const target = location.hash
      ? document.getElementById(location.hash.slice(1))
      : document.querySelector("main");
    if (location.hash && target) target.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: 0, behavior: "instant" });
    const currentRoute = `${location.pathname}${location.hash}`;
    if (previousRoute.current !== currentRoute) {
      target?.focus({ preventScroll: true });
    }
    previousRoute.current = currentRoute;
  }, [location.pathname, location.hash]);
  return null;
}
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 400);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function scrollToTop() {
    document.getElementById("main")?.focus({ preventScroll: true });
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <button
      type="button"
      className="scroll-to-top"
      hidden={!visible}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m5 12 7-7 7 7M12 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
function Header() {
  return (
    <header className="site-header wrap">
      <Link className="wordmark" to="/" aria-label="Mobeen Khan home">
        mk<span>.</span>
      </Link>
      <nav aria-label="Main navigation">
        <NavLink to="/projects">Work</NavLink>
        <NavLink to="/about">About</NavLink>
        <Link className="nav-contact" to="/#contact">
          Let’s talk <Arrow />
        </Link>
      </nav>
    </header>
  );
}
function ProjectCard({ item }) {
  return (
    <article
      className={`project-card project-${item.slug}`}
      data-scroll-motion="project"
    >
      <Link
        to={pathFor(item)}
        className="project-visual"
        aria-label={`View ${titleFor(item)} case study`}
      >
        <span className="visual-index">{item.type}</span>
        <div className="screen-frame">
          <div className="browser-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>
              {item.website
                ? new URL(item.website).hostname.replace("www.", "")
                : "Project preview"}
            </span>
          </div>
          <img
            src={item.image}
            alt={`${titleFor(item)} interface preview`}
            loading="lazy"
            width="1440"
            height="900"
          />
        </div>
        <span className="visual-arrow">
          <Arrow />
        </span>
      </Link>
      <div className="project-caption">
        <div>
          <p className="eyebrow">{item.role}</p>
          <h3>
            <Link to={pathFor(item)}>{titleFor(item)}</Link>
          </h3>
        </div>
        <span className="caption-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <p className="project-summary">{item.summary}</p>
    </article>
  );
}
function ProjectStack() {
  const options = featured.map((item) => ({
    label:
      item.slug === "golden-hour-pilates"
        ? "Golden Hour"
        : item.slug === "jzsm"
          ? "JZSM"
          : item.slug === "khan-security-testing"
            ? "KST"
            : titleFor(item),
    item,
  }));
  const [active, setActive] = useState(0);
  const { item } = options[active];
  return (
    <div className="project-stack">
      <div className="stack-stage">
        <div className="stack-backdrop" aria-hidden="true" />
        <div className="stack-back-sheet" aria-hidden="true">
          <img
            src="/images/khan-security-testing.png"
            alt=""
            width="1440"
            height="1000"
            loading="lazy"
          />
        </div>
        <Link
          className="stack-front"
          to={pathFor(item)}
          aria-label={`Explore ${titleFor(item)} case study`}
        >
          <div className="stack-browser" aria-hidden="true">
            <span />
            <span />
            <span />
            <p>{new URL(item.website).hostname.replace("www.", "")}</p>
          </div>
          <img
            key={item.slug}
            className="stack-preview"
            src={item.image}
            alt={`${titleFor(item)} interface`}
            width="1440"
            height="1000"
            fetchPriority="high"
          />
          <div className="stack-caption">
            <span>{titleFor(item)}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M5 19 19 5M5 5h14v14" />
            </svg>
          </div>
        </Link>
        <span className="stack-mark" aria-hidden="true">
          mk.
        </span>
      </div>
      <div
        className="stack-controls"
        role="group"
        aria-label="Choose a featured project preview"
      >
        {options.map(({ label }, index) => (
          <button
            key={label}
            onClick={() => setActive(index)}
            aria-pressed={active === index}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="stack-status" role="status">
        {titleFor(item)} · Explore the case study
      </p>
    </div>
  );
}
function Home() {
  const mainRef = useRef(null);
  useScrollMotion(mainRef);
  return (
    <main ref={mainRef} id="main" tabIndex="-1">
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-composition">
          <div className="hero-copy">
            <h1 id="hero-title">
              <span className="hero-primary">
                Thoughtful
                <br />
                interfaces.
              </span>
              <span className="hero-secondary">Solid engineering.</span>
            </h1>
            <div className="hero-bottom">
              <p>
                I’m Mobeen Khan. I turn complex problems into websites and
                applications that feel simple to use—and are carefully built
                underneath.
              </p>
              <div className="hero-actions">
                <Link className="button primary" to="/#selected-work">
                  Explore my work <span aria-hidden="true">↓</span>
                </Link>
                <Link className="text-link" to="/about">
                  A little about me <Arrow />
                </Link>
              </div>
            </div>
            <p className="hero-signoff">
              <span className="status-dot" />
              Independent developer · Australia
            </p>
          </div>
          <ProjectStack />
        </div>
        <div className="hero-foot">
          <span>Websites / Applications / Security & AI</span>
          <span>Good work, from first idea to final detail.</span>
        </div>
      </section>
      <section
        className="selected wrap section"
        id="selected-work"
        tabIndex="-1"
        aria-labelledby="selected-title"
      >
        <div className="section-heading">
          <div>
            <h2 id="selected-title">
              Built with
              <br />
              <span>purpose.</span>
            </h2>
          </div>
          <Link className="text-link" to="/projects">
            All projects <Arrow />
          </Link>
        </div>
        <div className="project-grid">
          {featured.map((item) => (
            <ProjectCard item={item} key={item.slug} />
          ))}
        </div>
        <div className="more-work">
          <p>More to explore</p>
          <Link to="/projects/job-application-assistant">
            Job Application Assistant <Arrow />
          </Link>
        </div>
      </section>
      <section className="approach section" aria-labelledby="approach-title">
        <div className="wrap approach-layout">
          <div>
            <SectionLabel number="02">How I work</SectionLabel>
            <h2 id="approach-title">
              The details make
              <br />
              the difference<span>.</span>
            </h2>
            <p>
              Clear thinking, considered design and engineering that goes beyond
              the happy path.
            </p>
          </div>
          <div className="principles">
            {[
              [
                "Understand the real problem.",
                "Start with the people using it, the task they need to finish, and the constraints that actually matter.",
              ],
              [
                "Make the complex feel simple.",
                "Give content a clear hierarchy. Make the next step obvious. Build for small screens and different ways of navigating.",
              ],
              [
                "Build it properly.",
                "Think through authentication, error states, accessibility and maintainability—not just how the homepage looks.",
              ],
            ].map(([title, text], i) => (
              <article
                key={title}
                data-scroll-motion="step"
                data-motion-order={i}
              >
                <span className="eyebrow">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="wrap section about-teaser"
        aria-labelledby="about-title"
      >
        <div className="portrait-frame" data-scroll-motion="portrait">
          <img
            src="/images/user.png"
            alt="Mobeen Khan"
            width="400"
            height="460"
            loading="lazy"
          />
          <span>Developer. Curious by default.</span>
        </div>
        <div data-scroll-motion="copy">
          <SectionLabel number="03">A little about me</SectionLabel>
          <h2 id="about-title">
            A builder with a<br />
            security mindset.
          </h2>
          <p>
            I’m an Australia-based developer working across full-stack
            applications, websites and practical security tools. I like
            understanding how things work—and making them work better for the
            people using them.
          </p>
          <p>
            My background spans software engineering and cybersecurity. That
            combination shapes how I approach everything from a booking journey
            to an API.
          </p>
          <Link className="text-link" to="/about">
            My background & experience <Arrow />
          </Link>
        </div>
      </section>
      <Contact />
    </main>
  );
}
function Contact() {
  return (
    <section
      className="contact-section"
      id="contact"
      tabIndex="-1"
      aria-labelledby="contact-title"
    >
      <div className="wrap">
        <SectionLabel number="04">What’s next?</SectionLabel>
        <div className="contact-heading" data-scroll-motion="copy">
          <h2 id="contact-title">
            Let’s make
            <br />
            something good<span>.</span>
          </h2>
          <span className="contact-spark" aria-hidden="true">
            ↗
          </span>
        </div>
        <div className="contact-options">
          <a
            href={`${mail}?subject=Let%E2%80%99s%20talk%20about%20a%20project`}
          >
            <span className="eyebrow">For businesses & collaborators</span>
            <h3>
              Have a project in mind? <Arrow />
            </h3>
            <p>Let’s talk about your website, application or next idea.</p>
          </a>
          <a
            href={`${mail}?subject=Let%E2%80%99s%20talk%20about%20an%20opportunity`}
          >
            <span className="eyebrow">For teams & employers</span>
            <h3>
              Looking for a developer? <Arrow />
            </h3>
            <p>I’d love to hear about the role and what you’re building.</p>
          </a>
        </div>
      </div>
    </section>
  );
}
function Projects() {
  const [filter, setFilter] = useState("All work");
  const visible =
    filter === "All work" ? work : work.filter((item) => item.type === filter);
  return (
    <main id="main" tabIndex="-1" className="wrap archive section">
      <SectionLabel number="01">The project archive</SectionLabel>
      <h1>
        Ideas, made real<span>.</span>
      </h1>
      <p className="page-intro">
        Websites, useful applications and experiments in security and AI. A
        closer look at what I build and how I think.
      </p>
      <div className="filters" role="group" aria-label="Filter projects">
        {["All work", "Websites", "Applications", "Security & AI"].map(
          (label) => (
            <button
              key={label}
              aria-pressed={label === filter}
              onClick={() => setFilter(label)}
            >
              {label}
            </button>
          ),
        )}
      </div>
      <p className="result-count" role="status">
        {visible.length} projects
      </p>
      <div className="archive-list">
        {visible.map((item, i) => (
          <article key={item.slug}>
            <span className="archive-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="eyebrow">{item.type}</p>
              <h2>
                <Link to={pathFor(item)}>
                  {titleFor(item)} <Arrow />
                </Link>
              </h2>
              <p>{item.summary}</p>
              <ul className="tags">
                {item.techStack.slice(0, 4).map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
            {item.image && (
              <Link
                className="archive-image"
                to={pathFor(item)}
                aria-label={`View ${titleFor(item)}`}
              >
                <img
                  src={item.image}
                  alt={`${titleFor(item)} preview`}
                  loading="lazy"
                  width="320"
                  height="200"
                />
              </Link>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
function About() {
  return (
    <main id="main" tabIndex="-1">
      <section className="wrap section about-page">
        <SectionLabel number="02">Behind the work</SectionLabel>
        <h1>
          Curiosity meets
          <br />
          <span>follow-through.</span>
        </h1>
        <div className="about-intro">
          <p className="page-intro">
            I’m Mobeen, a developer based in Australia. I enjoy joining the dots
            between a clear interface, useful functionality and the engineering
            that makes it dependable.
          </p>
          <img
            src="/images/user.png"
            alt="Mobeen Khan"
            width="240"
            height="280"
          />
        </div>
        <div className="bio-grid">
          <section>
            <h2>Experience</h2>
            {volunteer.map((item) => (
              <article className="timeline-item" key={item.org}>
                <p className="eyebrow">{item.dates}</p>
                <h3>{item.org}</h3>
                <p>Web Developer</p>
                <p>{item.points[0]}</p>
              </article>
            ))}
            <p>
              Explore my{" "}
              <Link className="inline-link" to="/projects">
                website and application work
              </Link>{" "}
              for more recent builds.
            </p>
          </section>
          <section>
            <h2>Education & learning</h2>
            {education.map((item) => (
              <article className="timeline-item" key={item.title}>
                <p className="eyebrow">{item.dates}</p>
                <h3>{item.title}</h3>
                <p>{item.place}</p>
                {item.detail && <p>{item.detail}</p>}
              </article>
            ))}
            {certifications.map((item) => (
              <p key={item.title}>
                {item.title} · {item.issuer}
              </p>
            ))}
          </section>
        </div>
        <section className="toolkit">
          <SectionLabel number="03">The toolkit</SectionLabel>
          <h2>Tools follow the problem.</h2>
          <p>The project case studies show where and why I use them.</p>
          {[
            ...skillCategories,
            { name: "Security tools & practices", items: cybersecurityTools },
          ].map((group) => (
            <div key={group.name}>
              <h3>{group.name}</h3>
              <ul className="tags">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </section>
      <Contact />
    </main>
  );
}
function Gallery({ item }) {
  const [view, setView] = useState("desktop");
  const comparison = item.slug === "golden-hour-pilates";
  const responsive = ["jz-tech", "jzsm"].includes(item.slug);
  if (!item.image) return null;
  return (
    <section className="case-gallery" aria-label="Project screenshots">
      {(comparison || responsive) && (
        <div className="gallery-controls">
          <h2>{comparison ? "Before & after" : "A responsive experience"}</h2>
          <div role="group" aria-label="Screenshot viewport">
            {["desktop", "mobile"].map((value) => (
              <button
                key={value}
                aria-pressed={view === value}
                onClick={() => setView(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}
      {comparison ? (
        <div className={`comparison ${view}`}>
          {["before", "after"].map((stage) => (
            <figure key={stage}>
              <figcaption>
                {stage === "before"
                  ? "Before · original website"
                  : "After · redesign capture"}
              </figcaption>
              <a
                href={`/images/golden-hour/${stage}-${view}-full.png`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open full ${stage} ${view} screenshot`}
              >
                <img
                  src={`/images/golden-hour/${stage}-${view}.png`}
                  alt={`Golden Hour Pilates ${stage} redesign, ${view}`}
                  loading="lazy"
                />
              </a>
            </figure>
          ))}
        </div>
      ) : (
        <figure className={`case-image ${responsive ? view : ""}`}>
          <img
            src={
              responsive
                ? `/images/${item.slug === "jz-tech" ? "jztech" : "jzsm"}/${view}.png`
                : item.image
            }
            alt={`${titleFor(item)} interface${responsive ? ` on ${view}` : ""}`}
            loading="lazy"
          />
          <figcaption>Project interface capture</figcaption>
        </figure>
      )}
    </section>
  );
}
function ProjectDetail() {
  const { slug } = useParams();
  const item = work.find((project) => project.slug === slug);
  if (!item) return <NotFound />;
  return (
    <main id="main" tabIndex="-1" className="case-page wrap section">
      <Link className="text-link" to="/projects">
        ← All work
      </Link>
      <header className="case-header">
        <p className="eyebrow">
          {item.type} / {titleFor(item)}
        </p>
        <h1>{item.headline}</h1>
        <p className="page-intro">{item.summary}</p>
        <div className="case-facts">
          <div>
            <span className="eyebrow">My contribution</span>
            <p>{item.role}</p>
          </div>
          <div>
            <span className="eyebrow">Built with</span>
            <p>{item.techStack.slice(0, 4).join(" · ")}</p>
          </div>
          <div className="case-links">
            {item.website && (
              <External href={item.website}>Visit website</External>
            )}
            {item.repo && <External href={item.repo}>View source</External>}
            {item.repoNote && <p>{item.repoNote}</p>}
          </div>
        </div>
      </header>
      <Gallery key={item.slug} item={item} />
      <div className="case-body">
        <aside>
          <p className="eyebrow">Behind the build</p>
          <p>{titleFor(item)}</p>
          <ul className="tags">
            {item.techStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </aside>
        <article className="prose">
          {item.markdown ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {item.markdown}
            </ReactMarkdown>
          ) : (
            <>
              <h2>What I built</h2>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {item.slug === "llm-security-tester" && (
                <p>
                  These results describe this small test set and model
                  configuration, not a general guarantee of model safety.
                </p>
              )}
            </>
          )}
        </article>
      </div>
      <div className="case-end">
        <h2>Another angle on the work.</h2>
        <Link className="button primary" to="/projects">
          Explore all projects <Arrow />
        </Link>
      </div>
    </main>
  );
}
function NotFound() {
  return (
    <main id="main" tabIndex="-1" className="wrap section not-found">
      <p className="eyebrow">404 / Not found</p>
      <h1>
        This page took
        <br />a wrong turn.
      </h1>
      <Link className="button primary" to="/projects">
        Back to the work <Arrow />
      </Link>
    </main>
  );
}
function Footer() {
  return (
    <footer className="site-footer wrap">
      <Link className="wordmark" to="/" aria-label="Mobeen Khan home">
        mk<span>.</span>
      </Link>
      <p>© {new Date().getFullYear()} Mobeen Khan</p>
      <div>
        <External href="https://github.com/mobeen786822">GitHub</External>
        <External href="https://www.linkedin.com/in/mobeen-khan-6b3340197">
          LinkedIn
        </External>
        <a href={mail}>
          Email <Arrow />
        </a>
      </div>
    </footer>
  );
}
export default function App() {
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>
      <RouteEffects />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/experience/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </>
  );
}
