import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Braces,
  Cat,
  Code2,
  Database,
  FileCode2,
  FolderTree,
  GitBranch,
  Layers,
  MapPin,
  MessageCircle,
  Search,
  Server,
  ShieldCheck,
} from "lucide-react";
import "./styles.css";

const logoUrl = new URL("../CatFinderLogo.png", import.meta.url).href;

const screenshotImages = [
  {
    title: "Start view",
    src: new URL("../screenshots/ImageTwo.png", import.meta.url).href,
  },
  {
    title: "Cat listing",
    src: new URL("../screenshots/Skärmbild 2026-05-22 003948.png", import.meta.url).href,
  },
  {
    title: "Application flow",
    src: new URL("../screenshots/Skärmbild 2026-05-22 234629.png", import.meta.url).href,
  },
];

const frontendStack = [
  { icon: "Re", label: "React 19", color: "#20232a" },
  { icon: "Vi", label: "Vite 8", color: "#646cff" },
  { icon: "JS", label: "JavaScript", color: "#d6a600" },
  { icon: "RQ", label: "React Query", color: "#d1495b" },
  { icon: "Ax", label: "Axios", color: "#5a29e4" },
  { icon: "Zu", label: "Zustand", color: "#7b4b2a" },
  { icon: "RR", label: "React Router", color: "#c23636" },
  { icon: "ES", label: "ESLint", color: "#4b32c3" },
];

const backendStack = [
  { icon: "C#", label: "C#", color: "#239120" },
  { icon: ".N", label: ".NET 10", color: "#512bd4" },
  { icon: "API", label: "ASP.NET Core", color: "#5c2d91" },
  { icon: "EF", label: "EF Core", color: "#68217a" },
  { icon: "SQL", label: "SQL Server", color: "#cc2927" },
  { icon: "JWT", label: "JWT Auth", color: "#111827" },
  { icon: "MR", label: "MediatR / CQRS", color: "#1e6f5c" },
  { icon: "AM", label: "AutoMapper", color: "#d97706" },
];

const frontendStructure = [
  { icon: FileCode2, title: "src/App.jsx", detail: "Routes and app shell" },
  { icon: Layers, title: "src/pages", detail: "Home, ads, auth, admin and saved views" },
  { icon: Code2, title: "src/components", detail: "Advertisement, comment, layout and routing UI" },
  { icon: Server, title: "src/services", detail: "Axios API communication" },
  { icon: Database, title: "src/store", detail: "Zustand client state" },
  { icon: Braces, title: "src/styles", detail: "Shared CSS styling" },
];

const backendStructure = [
  { icon: Server, title: "APILayer", detail: "Controllers, middleware, Program.cs and appsettings" },
  { icon: GitBranch, title: "ApplicationLayer", detail: "CQRS features for auth, cats, reports, comments and users" },
  { icon: Cat, title: "DomainLayer", detail: "Models and validators" },
  { icon: Database, title: "InfrastructureLayer", detail: "Database, migrations, repositories, seeding and services" },
  { icon: ShieldCheck, title: "TestLayer", detail: "Backend tests" },
  { icon: FolderTree, title: "SEEKAT2.slnx", detail: "Solution entry point" },
];

const slides = [
  {
    kind: "cover",
    title: "CatFinder",
    subtitle: "En modern plattform för saknade och upphittade katter",
  },
  {
    eyebrow: "Problem Statement",
    title: "Varför behövs CatFinder?",
    body:
      "Varje år försvinner tusentals katter, och idag är informationen kring upphittade eller saknade katter utspridd över Facebook-grupper, lokala forum och äldre webbplatser med låg tillgänglighet och otydlig struktur.",
    bullets: [
      "Djurägare får svårt att snabbt nå ut med korrekt information.",
      "Användare måste leta på flera olika platser.",
      "Relevanta annonser i närområdet blir svåra att hitta.",
    ],
  },
  {
    eyebrow: "Lösning",
    title: "En centraliserad och användarvänlig plattform",
    body:
      "CatFinder samlar skapande, sökning och interaktion kring annonser på ett ställe. Målet är att göra processen snabbare, mer tillgänglig och mer organiserad för att öka chanserna att återförena katter med sina ägare.",
    featureGrid: [
      { icon: Cat, label: "Lost & found annonser" },
      { icon: Search, label: "Sökbar information" },
      { icon: MessageCircle, label: "Kommentarer på annonser" },
      { icon: MapPin, label: "Relevant lokal kontext" },
    ],
  },
  {
    eyebrow: "Funktioner",
    title: "Vad användaren kan göra",
    bullets: [
      "Registrera konto och logga in säkert.",
      "Skapa annonser för saknade eller upphittade katter.",
      "Läsa andra användares annonser och kommentera vid tips.",
      "Hantera information i ett tydligt, modernt gränssnitt.",
    ],
  },
  {
    kind: "screenshots",
    eyebrow: "Screenshots",
    title: "CatFinder i praktiken",
    body:
      "Nedan visas utvalda vyer från applikationen, med fokus på hur användaren möter annonser och navigerar i flödet.",
    screenshots: screenshotImages,
  },
  {
    kind: "techStack",
    eyebrow: "Tech Stack",
    title: "Frontend + backend technologies",
    body:
      "CatFinder combines a React/Vite client with a layered ASP.NET Core backend. The stack supports routing, cached API data, secure authentication, database persistence and maintainable CQRS-style application features.",
    columns: [
      { title: "Frontend repo", subtitle: "NazarOps/CatFinder-FE", items: frontendStack },
      { title: "Backend repo", subtitle: "geoch4/CatFinder-BE", items: backendStack },
    ],
  },
  {
    kind: "structure",
    eyebrow: "Project Structure",
    title: "How the repositories are organized",
    body:
      "The frontend is grouped around pages, reusable components, services and state. The backend follows Clean Architecture boundaries with API, application, domain and infrastructure projects.",
    columns: [
      { title: "Frontend", subtitle: "React application structure", items: frontendStructure },
      { title: "Backend", subtitle: "Clean Architecture layers", items: backendStructure },
    ],
  },
  {
    eyebrow: "Effekt",
    title: "Mer struktur, snabbare kontakt",
    body:
      "Genom att samla informationen på en modern plattform blir det enklare för kattägare och upphittare att hitta varandra. CatFinder minskar friktionen från första annons till möjlig återförening.",
    bullets: [
      "Centraliserad information",
      "Tydligare annonser",
      "Direkt dialog via kommentarer",
      "Bättre chans att hitta rätt katt snabbare",
    ],
  },
];

const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 64 : -64,
    scale: 0.985,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -64 : 64,
    scale: 0.985,
  }),
};

const contentTransition = {
  type: "spring",
  stiffness: 210,
  damping: 28,
  mass: 0.8,
};

function App() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeSlide = slides[index];
  const progress = useMemo(() => ((index + 1) / slides.length) * 100, [index]);

  const goTo = (nextIndex) => {
    const clampedIndex = Math.min(slides.length - 1, Math.max(0, nextIndex));

    if (clampedIndex !== index) {
      setDirection(clampedIndex > index ? 1 : -1);
      setIndex(clampedIndex);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        goTo(index + 1);
      }

      if (event.key === "ArrowLeft") {
        goTo(index - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index]);

  return (
    <main className="deck">
      <motion.div
        className="progress"
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.section
          key={index}
          className={`slide ${activeSlide.kind === "cover" ? "cover" : ""}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={contentTransition}
        >
          {activeSlide.kind === "cover" ? (
            <CoverSlide slide={activeSlide} />
          ) : activeSlide.kind === "screenshots" ? (
            <ScreenshotSlide slide={activeSlide} />
          ) : activeSlide.kind === "techStack" ? (
            <TechStackSlide slide={activeSlide} />
          ) : activeSlide.kind === "structure" ? (
            <StructureSlide slide={activeSlide} />
          ) : (
            <ContentSlide slide={activeSlide} />
          )}
        </motion.section>
      </AnimatePresence>

      <nav className="controls" aria-label="Slide navigation">
        <button onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous slide">
          <ArrowLeft size={20} />
        </button>
        <span>
          {index + 1} / {slides.length}
        </span>
        <button
          onClick={() => goTo(index + 1)}
          disabled={index === slides.length - 1}
          aria-label="Next slide"
        >
          <ArrowRight size={20} />
        </button>
      </nav>
    </main>
  );
}

function CoverSlide({ slide }) {
  return (
    <div className="coverLayout">
      <motion.img
        className="logo"
        src={logoUrl}
        alt="CatFinder logo"
        initial={{ opacity: 0, y: 18, rotate: -1.5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 0.08, ...contentTransition }}
      />
      <motion.div
        className="coverText"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, ...contentTransition }}
      >
        <h1>{slide.title}</h1>
        <p>{slide.subtitle}</p>
      </motion.div>
    </div>
  );
}

function ContentSlide({ slide }) {
  return (
    <div className="contentLayout">
      <motion.div
        className="copy"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.04, ...contentTransition }}
      >
        <p className="eyebrow">{slide.eyebrow}</p>
        <h2>{slide.title}</h2>
        {slide.body && <p className="body">{slide.body}</p>}
      </motion.div>

      {slide.bullets && (
        <ul className="bullets">
          {slide.bullets.map((item, itemIndex) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + itemIndex * 0.055, ...contentTransition }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      )}

      {slide.featureGrid && (
        <div className="featureGrid">
          {slide.featureGrid.map(({ icon: Icon, label }, itemIndex) => (
            <motion.div
              className="feature"
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + itemIndex * 0.06, ...contentTransition }}
            >
              <Icon size={28} strokeWidth={1.8} />
              <span>{label}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function TechStackSlide({ slide }) {
  return (
    <div className="techLayout">
      <motion.div
        className="techIntro"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.04, ...contentTransition }}
      >
        <p className="eyebrow">{slide.eyebrow}</p>
        <h2>{slide.title}</h2>
        {slide.body && <p className="body">{slide.body}</p>}
      </motion.div>

      <div className="stackColumns">
        {slide.columns.map((column, columnIndex) => (
          <motion.section
            className="stackColumn"
            key={column.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + columnIndex * 0.08, ...contentTransition }}
          >
            <div className="columnHeader">
              <h3>{column.title}</h3>
              <p>{column.subtitle}</p>
            </div>
            <div className="stackGrid">
              {column.items.map((item) => (
                <div className="stackBadge" key={item.label}>
                  <span className="stackIcon" style={{ "--stack-color": item.color }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}

function StructureSlide({ slide }) {
  return (
    <div className="structureLayout">
      <motion.div
        className="structureIntro"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.04, ...contentTransition }}
      >
        <p className="eyebrow">{slide.eyebrow}</p>
        <h2>{slide.title}</h2>
        {slide.body && <p className="body">{slide.body}</p>}
      </motion.div>

      <div className="structureColumns">
        {slide.columns.map((column, columnIndex) => (
          <motion.section
            className="structureColumn"
            key={column.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + columnIndex * 0.08, ...contentTransition }}
          >
            <div className="columnHeader">
              <h3>{column.title}</h3>
              <p>{column.subtitle}</p>
            </div>
            <div className="structureList">
              {column.items.map(({ icon: Icon, title, detail }) => (
                <div className="structureItem" key={title}>
                  <Icon size={24} strokeWidth={1.8} />
                  <div>
                    <strong>{title}</strong>
                    <span>{detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}

function ScreenshotSlide({ slide }) {
  return (
    <div className="screenshotLayout">
      <motion.div
        className="screenshotIntro"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.04, ...contentTransition }}
      >
        <p className="eyebrow">{slide.eyebrow}</p>
        <h2>{slide.title}</h2>
        {slide.body && <p className="body">{slide.body}</p>}
      </motion.div>

      <div className="screenshotGrid">
        {slide.screenshots.map((screenshot, itemIndex) => (
          <motion.figure
            className="screenshotCard"
            key={screenshot.src}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.12 + itemIndex * 0.08, ...contentTransition }}
          >
            <img src={screenshot.src} alt={`${screenshot.title} screenshot`} />
            <figcaption>{screenshot.title}</figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
