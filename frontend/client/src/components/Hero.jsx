import { ArrowUpRight, Compass } from "lucide-react";

const HERO_FALLBACK =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=85";

function Hero() {
  return (
    <section className="hero" aria-label="TripMate introduction">
      <div className="hero-media">
        <img src={HERO_FALLBACK} alt="A wide travel landscape" />
      </div>
      <div className="hero-grid" />

      <header className="nav-bar">
        <a className="brand" href="#planner" aria-label="TripMate home">
          <span className="brand-mark">
            <Compass size={18} />
          </span>
          TRIPMATE <em>AI</em>
        </a>
        <span className="nav-note">
          A considered way to go further <ArrowUpRight size={15} />
        </span>
      </header>

      <div className="hero-copy">
        <p className="kicker">
          <span className="signal" /> Intelligent travel, made personal
        </p>
        <h1>
          Go somewhere
          <br />
          <i>worth remembering.</i>
        </h1>
        <p className="hero-lede">
          A travel co-pilot that thinks through the details, then leaves room
          for the unexpected.
        </p>
        <a className="scroll-cue" href="#planner">
          <span>Start with a feeling</span>
          <span className="scroll-line" />
        </a>
      </div>

      <div className="hero-stamp">
        <span>EST.</span>
        <strong>2026</strong>
        <small>
          BEYOND
          <br />
          THE MAP
        </small>
      </div>
    </section>
  );
}

export default Hero;
