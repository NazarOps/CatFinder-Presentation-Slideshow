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
const sponsorUrl = new URL("../screenshots/sponsoredbyorange.jpg", import.meta.url).href;

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
    subtitle: "A modern platform for lost and found cats",
  },
  {
    eyebrow: "Problem Statement",
    title: "Why CatFinder is needed",
    body:
      "Every year, thousands of cats go missing, and information about lost or found cats is spread across Facebook groups, local forums and older websites with low accessibility and unclear structure.",
    bullets: [
      "Pet owners struggle to quickly share accurate information.",
      "Users need to search across several different places.",
      "Relevant nearby ads become hard to find.",
    ],
  },
  {
    eyebrow: "Solution",
    title: "A centralized and user-friendly platform",
    body:
      "CatFinder brings ad creation, search and interaction into one place. The goal is to make the process faster, more accessible and more organized to increase the chance of reuniting cats with their owners.",
    featureGrid: [
      { icon: Cat, label: "Lost & found ads" },
      { icon: Search, label: "Searchable information" },
      { icon: MessageCircle, label: "Comments on ads" },
      { icon: MapPin, label: "Relevant local context" },
    ],
  },
  {
    eyebrow: "Features",
    title: "What users can do",
    bullets: [
      "Register an account and sign in securely.",
      "Create ads for lost or found cats.",
      "Read other users' ads and comment with useful tips.",
      "Manage information through a clear, modern interface.",
    ],
  },
  {
    kind: "screenshots",
    eyebrow: "Screenshots",
    title: "CatFinder in practice",
    body:
      "These selected views from the application show how users interact with ads and move through the main flow.",
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
    eyebrow: "What I Learned",
    title: "From development to Ubuntu VPS hosting",
    body:
      "This bootcamp taught me more than app development. I also got hands-on experience with Linux servers and basic DevOps while hosting CatFinder on an Ubuntu VPS.",
    bullets: [
      "Hosted CatFinder on an Ubuntu Linux VPS.",
      "Worked with deployment, server setup, and production hosting.",
      "Saw how development and operations connect in a real project.",
    ],
  },
  {
    eyebrow: "Personal Growth",
    title: "Pitching ideas with more confidence",
    body:
      "This project also improved my communication skills. I became more confident presenting ideas, explaining CatFinder, and getting people interested quickly.",
    bullets: [
      "Explain technical choices more clearly.",
      "Focus on product value, not just the code.",
      "Capture interest faster when introducing the project.",
    ],
  },
  {
    eyebrow: "Impact",
    title: "More structure, faster contact",
    body:
      "By collecting the information on a modern platform, CatFinder makes it easier for cat owners and finders to reach each other. It reduces friction from the first ad to a possible reunion.",
    bullets: [
      "Centralized information",
      "Clearer ads",
      "Direct dialogue through comments",
      "Better chance of finding the right cat faster",
    ],
  },
  {
    eyebrow: "Future Plans",
    title: "Next steps for CatFinder",
    body:
      "Now that the web app is mostly finished, the next step is local promotion and early user feedback.",
    bullets: [
      "Print posters and place them around my area.",
      "Share CatFinder in local lost-and-found cat Facebook groups.",
      "Drive local traffic from posters and social media.",
      "Use early feedback to improve the product before expanding further.",
    ],
  },
  {
    kind: "sponsor",
    eyebrow: "Sponsor",
    title: "CatFinder is proudly sponsored by Mr Orange Cat",
    image: sponsorUrl,
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
          ) : activeSlide.kind === "sponsor" ? (
            <SponsorSlide slide={activeSlide} />
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

function SponsorSlide({ slide }) {
  return (
    <div className="sponsorLayout">
      <motion.figure
        className="sponsorImage"
        initial={{ opacity: 0, y: 22, rotate: -1.2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 0.06, ...contentTransition }}
      >
        <img src={slide.image} alt="Mr Orange Cat sponsor" />
      </motion.figure>

      <motion.div
        className="sponsorText"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, ...contentTransition }}
      >
        <p className="eyebrow">{slide.eyebrow}</p>
        <h2>{slide.title}</h2>
      </motion.div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
