import Approval from "./components/Approval";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Planner from "./components/Planner";
import Workflow from "./components/Workflow";
import Result from "./components/Result";
import useTravelPlanner from "./useTravelPlanner";

function App() {
  const travel = useTravelPlanner();

  return (
    <main>
      <Hero />
      <Planner
        message={travel.message}
        setMessage={travel.setMessage}
        busy={travel.busy}
        error={travel.error}
        onSubmit={travel.generate}
      />

      {travel.workflow && <Workflow workflow={travel.workflow} />}

      {travel.result && (
        <Result
          result={travel.result}
          copied={travel.copied}
          onCopy={travel.copy}
          onDownload={travel.download}
          pdfRef={travel.pdfRef}
          threadId={travel.threadId}
          content={travel.renderedResult}
        />
      )}

      {travel.approval && (
        <Approval
          approval={travel.approval}
          feedback={travel.feedback}
          setFeedback={travel.setFeedback}
          busy={travel.busy}
          onApprove={travel.approve}
        />
      )}
      <Footer/>
    </main>
  );
}

export default App;
