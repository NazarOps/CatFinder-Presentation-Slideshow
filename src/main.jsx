import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Cat,
  CircleUserRound,
  MapPin,
  MessageCircle,
  Search,
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
    eyebrow: "Teknik",
    title: "Fullstack .NET web application",
    body:
      "Projektet bygger på en fullstack-arkitektur där backend hanterar användare, annonser och kommentarer medan frontend fokuserar på enkel navigering och tydlig presentation av information.",
    featureGrid: [
      { icon: ShieldCheck, label: ".NET backend" },
      { icon: CircleUserRound, label: "Authentication" },
      { icon: Cat, label: "Advertisement data" },
      { icon: MessageCircle, label: "Comment workflow" },
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
