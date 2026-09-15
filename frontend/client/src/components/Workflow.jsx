import { Check } from "lucide-react";

const AGENT_LABELS = {
  flight_agent: "Flight intelligence",
  hotel_agent: "Stay curation",
  weather_agent: "Weather pulse",
  budget_agent: "Budget guardrail",
  itinerary_agent: "Itinerary craft",
};

function Workflow({ workflow }) {
  const isBlocked = workflow.guardrail_allowed === false;
  const agents = workflow.selected_agents || [];

  return (
    <section className="workflow-wrap reveal">
      <div className="section-intro compact">
        <span className="section-number">02 / 03</span>
        <div>
          <p className="kicker">The route</p>
          <h2>
            A plan with
            <br />
            <i>intention.</i>
          </h2>
        </div>
        <div className={`guardrail ${isBlocked ? "blocked" : ""}`}>
          <span>{isBlocked ? "Guardrail blocked" : "Guardrail passed"}</span>
          <Check size={15} />
        </div>
      </div>

      <p className="reasoning">
        {workflow.supervisor_reasoning ||
          "TripMate has assembled the right specialists for this route."}
      </p>

      <div className="agent-grid">
        {agents.map((agent, index) => (
          <div className="agent-item" key={agent}>
            <span>0{index + 1}</span>
            <strong>{AGENT_LABELS[agent] || agent}</strong>
            <small>complete</small>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workflow;
