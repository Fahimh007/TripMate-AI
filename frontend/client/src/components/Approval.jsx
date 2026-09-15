import { ArrowUpRight, Check, Sparkles } from "lucide-react";

function Approval({ approval, feedback, setFeedback, busy, onApprove }) {
  return (
    <section className="approval-wrap reveal">
      <div className="approval-icon">
        <Sparkles size={20} />
      </div>
      <div>
        <p className="kicker">Human in the loop</p>
        <h2>Your call.</h2>
        <p>
          {approval.approval_request ||
            "Approve this draft, or leave a note and we will rethink the route."}
        </p>
        <textarea
          value={feedback}
          onChange={(event) => setFeedback(event.target.value)}
          placeholder="What should we adjust?"
        />
        <div className="approval-actions">
          <button
            className="approve-button"
            onClick={() => onApprove(true)}
            disabled={busy}
          >
            Approve route <Check size={16} />
          </button>
          <button
            className="text-button"
            onClick={() => onApprove(false)}
            disabled={busy}
          >
            Revise with feedback <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Approval;
