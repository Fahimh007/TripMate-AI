import { useMemo, useRef, useState } from "react";
import { marked } from "marked";
import html2pdf from "html2pdf.js";

function useTravelPlanner() {
  const [message, setMessage] = useState("");
  const [threadId, setThreadId] = useState(
    () => localStorage.getItem("travel_thread_id") || null,
  );
  const [workflow, setWorkflow] = useState(null);
  const [result, setResult] = useState(null);
  const [approval, setApproval] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const pdfRef = useRef(null);

  const renderedResult = useMemo(
    () => ({ __html: marked.parse(result?.answer || "") }),
    [result],
  );

  async function submit(url, body) {
    setBusy(true);
    setError("");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "The travel workflow could not be completed.",
        );
      }

      setThreadId(data.thread_id);
      localStorage.setItem("travel_thread_id", data.thread_id);
      setWorkflow(data);
      setResult({
        answer: data.requires_approval
          ? data.itinerary || data.answer
          : data.answer,
        draft: data.requires_approval,
      });
      setApproval(data.requires_approval ? data : null);
      setFeedback("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  function generate(event) {
    event.preventDefault();

    if (!message.trim()) {
      setError("Tell TripMate where you want to go first.");
      return;
    }

    if (approval) {
      setError("Review the current draft before starting another plan.");
      return;
    }

    submit("/api/travel", {
      message: message.trim(),
      thread_id: threadId,
    });
  }

  function approve(approved) {
    if (!threadId || !approval) {
      setError("There is no draft waiting for approval.");
      return;
    }

    if (!approved && !feedback.trim()) {
      setError("Add a note about what you would like changed.");
      return;
    }

    submit("/api/travel/approve", {
      thread_id: threadId,
      approved,
      feedback: feedback.trim(),
    });
  }

  async function copy() {
    if (!result?.answer) return;

    await navigator.clipboard.writeText(result.answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  function download() {
    if (!pdfRef.current) return;

    html2pdf()
      .set({
        margin: 0.45,
        filename: "tripmate-travel-plan.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { format: "a4" },
      })
      .from(pdfRef.current)
      .save();
  }

  return {
    message,
    setMessage,
    threadId,
    workflow,
    result,
    approval,
    feedback,
    setFeedback,
    error,
    busy,
    copied,
    pdfRef,
    renderedResult,
    generate,
    approve,
    copy,
    download,
  };
}

export default useTravelPlanner;
