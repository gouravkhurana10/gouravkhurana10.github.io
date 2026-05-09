import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Experience", "Projects", "Certifications", "Contact"];

const SKILLS = [
  { emoji: "🧪", title: "Testing & QA", items: "Manual Testing · Regression · Functional · UAT · Black-box & White-box · Equivalence Partitioning · Boundary Value Analysis · State Transition Testing · Test Planning · Test Case Design · Defect Lifecycle Management" },
  { emoji: "⚙️", title: "Test Automation", items: "Playwright (E2E) · Cypress · Appium (iOS & Android) · Jest/Vitest · JUnit 5 · Mockito" },
  { emoji: "🔗", title: "API & CI/CD", items: "Postman · REST API Testing · Azure DevOps · GitHub Actions · Docker" },
  { emoji: "🐛", title: "Defect & Test Management", items: "Jira · Zephyr · Root Cause Analysis · Test Status Reporting" },
  { emoji: "💻", title: "Programming & Databases", items: "JavaScript (ES6+) · Java · SQL · MySQL · C# · React.js" },
  { emoji: "📋", title: "Methodologies", items: "Agile/Scrum · SDLC · STLC · ISTQB-CTFL Certified · BDD · ATDD" },
];

const EXPERIENCE = [
  {
    company: "Manulife",
    role: "Quality Automation Tester",
    period: "November 2021 – January 2023",
    location: "Toronto, Canada",
    bullets: [
      "Designed, developed, and executed automated test scripts for web and mobile applications (iOS & Android) using Appium, Cypress, and JavaScript, while maintaining and enhancing the test automation framework alongside senior team members.",
      "Validated REST API endpoints using Postman, verifying HTTP status codes, request/response payloads, and error handling; integrated the automated test suite into Azure DevOps CI/CD pipelines for continuous testing.",
      "Performed functional and regression testing across multiple environments, browsers, and devices, identifying defects and transitioning suitable manual scenarios into automation.",
      "Logged, tracked, and retested defects in Jira, ensuring clear documentation and reproducibility; managed test cases using Zephyr and contributed to test status reporting highlighting progress, risks, and blockers.",
    ],
  },
  {
    company: "Concentrix",
    role: "Senior Technical Support Representative",
    period: "March 2023 – Present",
    location: "Ontario, Canada (Remote)",
    bullets: [
      "Systematically diagnosed and resolved complex technical defects across software and networking environments, applying root cause analysis and structured troubleshooting methodologies.",
      "Investigated, documented, and escalated recurring technical issues, tracking patterns across incidents to identify systemic failures.",
      "Ensured consistent service quality against contractual KPIs, demonstrating accountability for quality standards and outcome measurement.",
      "Mentored and evaluated technical support professionals, providing structured feedback on process adherence, quality of resolution, and customer communication standards.",
    ],
  },
];

const PROJECTS = [
  {
    title: "Personal Finance Tracker",
    type: "Personal Project",
    role: "Full Stack Developer & QA Engineer",
    tags: ["Playwright", "Jest/Vitest", "Java", "Spring Boot", "React", "MySQL", "JWT", "Docker", "GitHub Actions"],
    bullets: [
      "Built a full-stack Personal Finance Tracker with a secured Spring Boot REST API backend and React frontend featuring real-time Chart.js dashboards.",
      "Designed and executed 30 automated tests — 15 Playwright E2E browser tests and 15 Jest/Vitest React component unit tests — integrated into a GitHub Actions CI/CD pipeline.",
      "Applied Black-Box test design techniques: Equivalence Partitioning, State Transition Testing, and Boundary Value Analysis across authentication, transaction, and validation flows.",
      "Validated JWT-secured REST API endpoints verifying correct status codes, data isolation, and rejection of unauthorized requests.",
    ],
    link: "https://finance-tracker-nine-cyan.vercel.app",
  },
  {
    title: "Bug Tracker Application",
    type: "Personal Project",
    role: "Full Stack Developer & QA Engineer",
    tags: ["Java", "Spring Boot", "REST API", "MySQL", "JUnit 5", "Mockito", "JavaScript"],
    bullets: [
      "Developed a full-stack Bug Tracking web application enabling teams to report, manage, and track software defects through a complete lifecycle.",
      "Wrote 17 unit tests using JUnit 5 and Mockito with 100% pass rate, covering all CRUD operations, input validation, and bug status workflow transitions.",
      "Authored professional QA documentation including a formal Test Plan and Bug Report Template following defect lifecycle management principles.",
      "Built and validated 8 REST API endpoints using Postman, verifying correct HTTP status codes, payloads, and error handling.",
    ],
    link: "https://github.com/gouravkhurana10/bug-tracker",
  },
  {
    title: "Student Management System",
    type: "Academic Project",
    role: "Java Developer",
    tags: ["Java", "JSP", "Servlets", "JDBC", "MVC", "SQL"],
    bullets: [
      "Built a full-stack Java web application enabling teachers to efficiently manage student records across concurrent user sessions.",
      "Applied MVC architectural pattern and integrated JDBC for efficient database connectivity and data management.",
    ],
    link: null,
  },
  {
    title: "Inventory Management System",
    type: "Academic Project",
    role: "Java Developer",
    tags: ["Java EE", "Servlets", "JSP", "Bootstrap", "SQL", "Agile"],
    bullets: [
      "Developed a Java-based web application for convenience store inventory management, eliminating manual stock counting.",
      "Implemented Java EE concepts (Servlets and JSP) to build backend and frontend application components.",
    ],
    link: null,
  },
];

const CERTS = [
  { title: "ISTQB - Certified Tester Foundation Level (CTFL)", date: null, issuer: "Istqb.org" },
  { title: "MS Power BI Essential Training", date: null, issuer: "LinkedIn Learning" },
  { title: "SQL Essential Training", date: "", issuer: "LinkedIn Learning" },
  { title: "Java EE: Servlets and JSP, Learning Java Applications, Java Memory Management", date: "", issuer: "Lynda.com" },
  { title: "Application Development – Java, Kubernetes in Google Cloud, Google Cloud Essentials", date: "", issuer: "Qwiklabs" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [typed, setTyped] = useState("");
  const titles = ["QA Analyst", "Test Automation Engineer", "ISTQB-CTFL Certified"];
  const [titleIdx, setTitleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const current = titles[titleIdx];
    const delay = deleting ? 40 : 90;
    const timeout = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setTyped(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setTimeout(() => setDeleting(true), 1800);
      } else if (deleting && charIdx > 0) {
        setTyped(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setTitleIdx(i => (i + 1) % titles.length);
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, titleIdx]);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  const styles = {
    root: { fontFamily: "'DM Sans', sans-serif", background: "#0a0a0f", color: "#e8e8f0", minHeight: "100vh", overflowX: "hidden" },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 2rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(10,10,15,0.95)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.3s ease" },
    logo: { fontSize: "1.2rem", fontWeight: 700, color: "#00e5ff", letterSpacing: "0.05em", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" },
    navLinks: { display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 },
    navLink: (isActive) => ({ cursor: "pointer", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", color: isActive ? "#00e5ff" : "rgba(232,232,240,0.6)", fontWeight: isActive ? 600 : 400, transition: "color 0.2s", borderBottom: isActive ? "1px solid #00e5ff" : "1px solid transparent", paddingBottom: "2px" }),
    hero: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,229,255,0.08) 0%, transparent 70%)" },
    heroContent: { textAlign: "center", zIndex: 2, padding: "0 1.5rem" },
    heroTag: { display: "inline-block", background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.3)", color: "#00e5ff", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "100px", marginBottom: "2rem" },
    heroName: { fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.05, margin: "0 0 1rem", background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    heroTitle: { fontSize: "clamp(1.1rem, 3vw, 1.6rem)", color: "#00e5ff", fontWeight: 500, minHeight: "2.5rem", marginBottom: "1.5rem" },
    heroCursor: { display: "inline-block", width: "2px", height: "1.2em", background: "#00e5ff", marginLeft: "3px", verticalAlign: "middle", animation: "blink 1s step-end infinite" },
    heroDesc: { fontSize: "1rem", color: "rgba(232,232,240,0.6)", maxWidth: "540px", margin: "0 auto 2.5rem", lineHeight: 1.75 },
    heroBtns: { display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" },
    btnPrimary: { background: "#00e5ff", color: "#0a0a0f", padding: "12px 28px", borderRadius: "8px", border: "none", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.03em" },
    btnSecondary: { background: "transparent", color: "#00e5ff", padding: "12px 28px", borderRadius: "8px", border: "1.5px solid rgba(0,229,255,0.4)", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.2s" },
    grid: { position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", zIndex: 1 },
    section: { padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" },
    sectionLabel: { fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00e5ff", marginBottom: "0.75rem", display: "block" },
    sectionTitle: { fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", margin: "0 0 3.5rem", lineHeight: 1.1 },
    divider: { height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)", margin: "0 2rem" },
    aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "4rem", alignItems: "center" },
    aboutImgWrap: { position: "relative" },
    aboutImg: { width: "100%", borderRadius: "16px", display: "block", filter: "grayscale(20%)" },
    aboutImgBorder: { position: "absolute", inset: "-8px", borderRadius: "20px", border: "1px solid rgba(0,229,255,0.2)", zIndex: -1 },
    aboutStats: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "2rem" },
    statCard: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1rem", textAlign: "center" },
    statNum: { fontSize: "1.8rem", fontWeight: 800, color: "#00e5ff", fontFamily: "'Space Grotesk', sans-serif" },
    statLabel: { fontSize: "0.75rem", color: "rgba(232,232,240,0.5)", marginTop: "2px" },
    aboutText: { fontSize: "0.97rem", color: "rgba(232,232,240,0.75)", lineHeight: 1.85, marginBottom: "1.25rem" },
    skillsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" },
    skillCard: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "1.5rem", transition: "border-color 0.2s, transform 0.2s" },
    skillEmoji: { fontSize: "1.8rem", marginBottom: "0.75rem" },
    skillTitle: { fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" },
    skillItems: { fontSize: "0.8rem", color: "rgba(232,232,240,0.55)", lineHeight: 1.7 },
    expList: { display: "flex", flexDirection: "column", gap: "2rem" },
    expCard: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "2rem", position: "relative", overflow: "hidden" },
    expAccent: { position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: "linear-gradient(180deg, #00e5ff, rgba(0,229,255,0.1))", borderRadius: "3px 0 0 3px" },
    expCompany: { fontSize: "1.2rem", fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", color: "#fff", marginBottom: "0.2rem" },
    expRole: { fontSize: "0.9rem", color: "#00e5ff", fontWeight: 500, marginBottom: "0.5rem" },
    expMeta: { fontSize: "0.78rem", color: "rgba(232,232,240,0.4)", marginBottom: "1.25rem" },
    expBullet: { fontSize: "0.87rem", color: "rgba(232,232,240,0.7)", lineHeight: 1.75, marginBottom: "0.5rem", paddingLeft: "1rem", position: "relative" },
    projGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))", gap: "1.5rem" },
    projCard: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "2rem", display: "flex", flexDirection: "column", transition: "border-color 0.2s, transform 0.2s" },
    projType: { fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#00e5ff", marginBottom: "0.4rem" },
    projTitle: { fontSize: "1.15rem", fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", color: "#fff", marginBottom: "0.3rem" },
    projRole: { fontSize: "0.8rem", color: "rgba(232,232,240,0.45)", marginBottom: "1rem" },
    tagsWrap: { display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1.25rem" },
    tag: { background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", color: "rgba(0,229,255,0.8)", fontSize: "0.7rem", padding: "3px 10px", borderRadius: "100px" },
    projBullet: { fontSize: "0.83rem", color: "rgba(232,232,240,0.65)", lineHeight: 1.7, marginBottom: "0.4rem", paddingLeft: "1rem", position: "relative" },
    projLink: { marginTop: "auto", paddingTop: "1.25rem", display: "inline-flex", alignItems: "center", gap: "6px", color: "#00e5ff", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none", cursor: "pointer" },
    certList: { display: "flex", flexDirection: "column", gap: "1rem" },
    certCard: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" },
    certTitle: { fontSize: "0.9rem", fontWeight: 600, color: "#fff", marginBottom: "0.2rem" },
    certIssuer: { fontSize: "0.75rem", color: "rgba(232,232,240,0.45)" },
    certDate: { fontSize: "0.75rem", color: "#00e5ff", whiteSpace: "nowrap" },
    contactWrap: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" },
    contactTitle: { fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", marginBottom: "1rem" },
    contactText: { fontSize: "0.93rem", color: "rgba(232,232,240,0.6)", lineHeight: 1.75, marginBottom: "2rem" },
    contactItems: { display: "flex", flexDirection: "column", gap: "1rem" },
    contactItem: { display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem", color: "rgba(232,232,240,0.75)" },
    contactIcon: { width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 },
    socialLinks: { display: "flex", gap: "1rem", marginTop: "2rem" },
    socialBtn: { padding: "10px 20px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "rgba(232,232,240,0.7)", fontSize: "0.82rem", cursor: "pointer", transition: "all 0.2s", textDecoration: "none", display: "inline-block" },
    footer: { textAlign: "center", padding: "2rem", fontSize: "0.78rem", color: "rgba(232,232,240,0.3)", borderTop: "1px solid rgba(255,255,255,0.05)" },
    hamburger: { display: "none", flexDirection: "column", gap: "5px", cursor: "pointer", padding: "4px" },
    bar: { width: "22px", height: "2px", background: "#e8e8f0", borderRadius: "2px", transition: "all 0.3s" },
    mobileMenu: { position: "fixed", top: "64px", left: 0, right: 0, background: "rgba(10,10,15,0.98)", backdropFilter: "blur(12px)", padding: "1.5rem 2rem", zIndex: 99, borderBottom: "1px solid rgba(255,255,255,0.06)" },
    mobileLink: (isActive) => ({ display: "block", padding: "0.75rem 0", fontSize: "1rem", color: isActive ? "#00e5ff" : "rgba(232,232,240,0.7)", fontWeight: isActive ? 600 : 400, cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.05)" }),
  };

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.3); border-radius: 3px; }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .skill-card:hover { border-color: rgba(0,229,255,0.3) !important; transform: translateY(-3px); }
        .proj-card:hover { border-color: rgba(0,229,255,0.25) !important; transform: translateY(-4px); }
        .btn-primary:hover { background: #33ecff !important; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,229,255,0.25); }
        .btn-secondary:hover { background: rgba(0,229,255,0.08) !important; border-color: rgba(0,229,255,0.6) !important; }
        .social-btn:hover { border-color: rgba(0,229,255,0.4) !important; color: #00e5ff !important; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .proj-grid { grid-template-columns: 1fr !important; }
          .contact-wrap { grid-template-columns: 1fr !important; }
          .about-img-wrap { max-width: 280px; margin: 0 auto; }
        }
      `}</style>

      {/* Nav */}
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={() => scrollTo("Home")}>GK</div>
        <ul style={styles.navLinks} className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l} style={styles.navLink(active === l)} onClick={() => scrollTo(l)}>{l}</li>
          ))}
        </ul>
        <div style={styles.hamburger} className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          <div style={styles.bar} />
          <div style={styles.bar} />
          <div style={styles.bar} />
        </div>
      </nav>

      {menuOpen && (
        <div style={styles.mobileMenu}>
          {NAV_LINKS.map(l => (
            <div key={l} style={styles.mobileLink(active === l)} onClick={() => scrollTo(l)}>{l}</div>
          ))}
        </div>
      )}

      {/* Hero */}
      <section id="home" style={styles.hero}>
        <div style={styles.grid} />
        <div style={styles.heroContent}>
          <div style={{ opacity: 0, animation: "fadeSlideUp 0.8s ease 0.2s forwards" }}>
            {/* <span style={styles.heroTag}>Available for opportunities in GTA</span> */}
            <h1 style={styles.heroName}>Gourav Khurana</h1>
            <div style={styles.heroTitle}>
              {typed}<span style={styles.heroCursor} />
            </div>
            <p style={styles.heroDesc}>
              I find the bugs before your users do - through structured test design, automation frameworks, and a genuine passion for software quality.
            </p>
            <div style={styles.heroBtns}>
              <button className="btn-primary" style={styles.btnPrimary} onClick={() => scrollTo("Contact")}>Get In Touch</button>
              <button className="btn-secondary" style={styles.btnSecondary} onClick={() => scrollTo("Projects")}>View Projects</button>
            </div>
          </div>
        </div>
        <style>{`@keyframes fadeSlideUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }`}</style>
      </section>

      <div style={styles.divider} />

      {/* About */}
      <section id="about" style={styles.section}>
        <FadeIn>
          <span style={styles.sectionLabel}>Who I Am</span>
          <h2 style={styles.sectionTitle}>About Me</h2>
        </FadeIn>
        <div style={styles.aboutGrid} className="about-grid">
          <FadeIn delay={0.1}>
            <div style={styles.aboutImgWrap} className="about-img-wrap">
              <img src="https://gouravportfolio.com/wp-content/uploads/2026/01/Gourav-k.jpg" alt="Gourav Khurana" style={styles.aboutImg} />
              <div style={styles.aboutImgBorder} />
            </div>
            <div style={styles.aboutStats}>
              {[["2+", "Years QA Experience"], ["30+", "Automated Tests Built"], ["2", "Personal Projects"], ["1", "ISTQB Certification"]].map(([n, l]) => (
                <div key={l} style={styles.statCard}>
                  <div style={styles.statNum}>{n}</div>
                  <div style={styles.statLabel}>{l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={styles.aboutText}>
              I'm a Toronto-based QA Analyst with hands-on experience in both manual and automation testing, backed by an ISTQB Certified Tester Foundation Level (CTFL) certification and a Computer Programmer Analyst diploma from George Brown College.
            </p>
            <p style={styles.aboutText}>
              My QA journey started at Manulife, where I worked as a Quality Automation Tester - designing and executing automated test scripts for web and mobile applications using Cypress and Appium, validating REST APIs with Postman, and integrating test suites into Azure DevOps CI/CD pipelines.
            </p>
            <p style={styles.aboutText}>
              I've since continued sharpening my skills by building two full-stack projects from the ground up, applying real-world QA practices including test planning, black-box test design techniques, and CI/CD pipeline integration.
            </p>
            <p style={styles.aboutText}>
              When I'm not hunting for bugs, I'm continuously learning - whether that's deepening my automation skills or exploring new tools in the QA ecosystem.
            </p>
            <a href="mailto:gouravkhurana10@gmail.com" style={{ ...styles.btnPrimary, display: "inline-block", marginTop: "0.5rem", textDecoration: "none" }} className="btn-primary">Say Hello 👋</a>
          </FadeIn>
        </div>
      </section>

      <div style={styles.divider} />

      {/* Skills */}
      <section id="skills" style={styles.section}>
        <FadeIn>
          <span style={styles.sectionLabel}>What I Know</span>
          <h2 style={styles.sectionTitle}>My Expert Areas</h2>
        </FadeIn>
        <div style={styles.skillsGrid} className="skills-grid">
          {SKILLS.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <div style={styles.skillCard} className="skill-card">
                <div style={styles.skillEmoji}>{s.emoji}</div>
                <div style={styles.skillTitle}>{s.title}</div>
                <div style={styles.skillItems}>{s.items}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div style={styles.divider} />

      {/* Experience */}
      <section id="experience" style={styles.section}>
        <FadeIn>
          <span style={styles.sectionLabel}>Where I've Worked</span>
          <h2 style={styles.sectionTitle}>Experience</h2>
        </FadeIn>
        <div style={styles.expList}>
          {EXPERIENCE.map((e, i) => (
            <FadeIn key={e.company} delay={i * 0.1}>
              <div style={styles.expCard}>
                <div style={styles.expAccent} />
                <div style={{ paddingLeft: "1rem" }}>
                  <div style={styles.expCompany}>{e.company}</div>
                  <div style={styles.expRole}>{e.role}</div>
                  <div style={styles.expMeta}>{e.period} · {e.location}</div>
                  {e.bullets.map((b, j) => (
                    <div key={j} style={styles.expBullet}>
                      <span style={{ position: "absolute", left: 0, color: "#00e5ff" }}>›</span>
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div style={styles.divider} />

      {/* Projects */}
      <section id="projects" style={styles.section}>
        <FadeIn>
          <span style={styles.sectionLabel}>What I've Built</span>
          <h2 style={styles.sectionTitle}>Projects</h2>
        </FadeIn>
        <div style={styles.projGrid} className="proj-grid">
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.08}>
              <div style={styles.projCard} className="proj-card">
                <div style={styles.projType}>{p.type}</div>
                <div style={styles.projTitle}>{p.title}</div>
                <div style={styles.projRole}>{p.role}</div>
                <div style={styles.tagsWrap}>
                  {p.tags.map(t => <span key={t} style={styles.tag}>{t}</span>)}
                </div>
                {p.bullets.map((b, j) => (
                  <div key={j} style={styles.projBullet}>
                    <span style={{ position: "absolute", left: 0, color: "#00e5ff" }}>›</span>
                    {b}
                  </div>
                ))}
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" style={styles.projLink}>
                    View Project →
                  </a>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div style={styles.divider} />

      {/* Certifications */}
      <section id="certifications" style={styles.section}>
        <FadeIn>
          <span style={styles.sectionLabel}>Credentials</span>
          <h2 style={styles.sectionTitle}>Certifications & Learnings</h2>
        </FadeIn>
        <div style={styles.certList}>
          {CERTS.map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.07}>
              <div style={styles.certCard}>
                <div>
                  <div style={styles.certTitle}>{c.title}</div>
                  <div style={styles.certIssuer}>{c.issuer}</div>
                </div>
                {c.date && <div style={styles.certDate}>{c.date}</div>}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div style={styles.divider} />

      {/* Contact */}
      <section id="contact" style={styles.section}>
        <div style={styles.contactWrap} className="contact-wrap">
          <FadeIn>
            <h2 style={styles.contactTitle}>Let's connect and build quality software together</h2>
            <p style={styles.contactText}>
              I'm actively looking for QA Analyst and Software Tester opportunities in the GTA. Whether you have a role in mind, want to collaborate, or just want to connect - feel free to reach out!
            </p>
            <div style={styles.contactItems}>
              {[["📞", "+1 416-400-6164", "tel:+14164006164"], ["📧", "gouravkhurana10@gmail.com", "mailto:gouravkhurana10@gmail.com"], ["📍", "Toronto, Ontario, Canada", null]].map(([icon, text, href]) => (
                <div key={text} style={styles.contactItem}>
                  <div style={styles.contactIcon}>{icon}</div>
                  {href ? <a href={href} style={{ color: "inherit", textDecoration: "none" }}>{text}</a> : <span>{text}</span>}
                </div>
              ))}
            </div>
            <div style={styles.socialLinks}>
              {[["LinkedIn", "https://www.linkedin.com/in/gourav-khurana/"], ["GitHub", "https://github.com/gouravkhurana10"], ["Portfolio", "https://gouravportfolio.com"]].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={styles.socialBtn} className="social-btn">{label}</a>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ background: "rgba(0,229,255,0.04)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: "20px", padding: "2.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🎯</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", marginBottom: "0.75rem" }}>Open to Opportunities</div>
              <div style={{ fontSize: "0.85rem", color: "rgba(232,232,240,0.55)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                QA Analyst · Test Automation Engineer · Software Tester<br />
                Full-time · Contract · Hybrid · Remote
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {["✅ ISTQB-CTFL Certified", "✅ 2+ Years QA Experience", "✅ Playwright & Cypress Expert", "✅ Available Immediately"].map(item => (
                  <div key={item} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", padding: "10px 16px", fontSize: "0.83rem", color: "rgba(232,232,240,0.7)", textAlign: "left" }}>{item}</div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div>© 2026 Gourav Khurana · Built with React · All rights reserved</div>
      </footer>
    </div>
  );
}
