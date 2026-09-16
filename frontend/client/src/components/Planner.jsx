import { ArrowUpRight, LoaderCircle, Waves } from "lucide-react";

const PROMPTS = [
  [
    "Japan / 7 days",
    "Plan a complete 7 days Japan trip from Bangladesh including flights, hotels and sightseeing under 2 lakhs.",
  ],
  [
    "Dubai / 5 days",
    "Plan a 5 days Dubai trip from Dhaka with flights, hotels and sightseeing.",
  ],
  [
    "Thailand / easy pace",
    "Plan a 7 days Thailand trip from Bangladesh with budget hotels and sightseeing.",
  ],
  ["Global flights", "Give me all country flight info."],
];

function Planner({ message, setMessage, busy, error, onSubmit }) {
  return (
    <section className="planner-wrap" id="planner">
      <div className="section-intro">
        <span className="section-number">01 / 03</span>
        <div>
          <p className="kicker">The brief</p>
          <h2>
            Put a place
            <br />
            <i>in motion.</i>
          </h2>
        </div>
        <p className="intro-copy">
          Flights, stays, weather, budget and a little bit of magic. Give us
          the shape of your trip and we will fill in the rest.
        </p>
      </div>

      <form className="planner-panel" onSubmit={onSubmit}>
        <div className="panel-top">
          <span>
            <Waves size={16} /> Trip brief
          </span>
          <span className="online">
            <b /> System ready
          </span>
        </div>
        <label htmlFor="travel-request">Where are you headed?</label>
        <textarea
          id="travel-request"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(event) => {
            if (event.ctrlKey && event.key === "Enter") {
              event.currentTarget.form?.requestSubmit();
            }
          }}
          placeholder="Try: seven slow days in Japan, with good food and a calm budget..."
          disabled={busy}
        />
        <div className="panel-bottom">
          <span className="hint">
            Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to generate
          </span>
          <button className="primary-action" type="submit" disabled={busy}>
            {busy ? (
              <>
                <LoaderCircle className="spin" size={16} /> Building route
              </>
            ) : (
              <>
                Build my route <ArrowUpRight size={17} />
              </>
            )}
          </button>
        </div>
      </form>

      <div className="prompt-row">
        <span>Begin with a direction</span>
        {PROMPTS.map(([label, value]) => (
          <button type="button" key={label} onClick={() => setMessage(value)}>
            {label} <ArrowUpRight size={13} />
          </button>
        ))}
      </div>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
    </section>
  );
}

export default Planner;
