import { Copy, Download } from "lucide-react";

function Result({ result, copied, onCopy, onDownload, pdfRef, threadId, content }) {
  return (
    <section className="result-wrap reveal">
      <div className="result-heading">
        <div>
          <p className="kicker">
            {result.draft ? "A first draft" : "Your finished route"}
          </p>
          <h2>{result.draft ? "Read it. Shape it." : "Go make it real."}</h2>
        </div>
        <div className="result-actions">
          <button onClick={onCopy} aria-label="Copy travel plan">
            <Copy size={15} /> {copied ? "Copied" : "Copy"}
          </button>
          <button onClick={onDownload} aria-label="Download travel plan as PDF">
            <Download size={15} /> PDF
          </button>
        </div>
      </div>
      <article className="result-paper" ref={pdfRef}>
        <div className="paper-meta">
          <span>TRIPMATE AI</span>
          <span>{threadId}</span>
        </div>
        <div className="markdown" dangerouslySetInnerHTML={content} />
      </article>
    </section>
  );
}

export default Result;
