import { useState } from "react";
import { ArrowUpRight, Compass } from "lucide-react";

const HERO_FRAME = "/asset/ezgif-frame-001.jpg";
const HERO_FALLBACK =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=85";

function Hero() {
  const [image, setImage] = useState(HERO_FRAME);

  return (
    <section className="hero" aria-label="TripMate introduction">
      <div className="hero-media">
        <img
          src={image}
          alt="A wide travel landscape"
          onError={() => setImage(HERO_FALLBACK)}
        />
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
