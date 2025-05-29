import React, { useState } from "react";

// PUBLIC_INTERFACE
function MainContainer() {
  /**
   * MainContainer is the primary layout for the KavyaResumeBoost app.
   * Features:
   * - Sidebar: AI feature selector (Section Rewriting, Content Enhancement, Grammar/Tone Correction, Keyword Optimization)
   * - Central resume editor panel
   * - Real-time preview pane showing changes
   * - Light-themed, accessible, clean UI, using provided color palette
   */
  const features = [
    {
      name: "Section Rewriting",
      id: "rewrite",
      description:
        "Rewrite specific sections for clarity and impact using AI suggestions.",
    },
    {
      name: "Content Enhancement",
      id: "enhance",
      description:
        "Enhance resume content for greater persuasiveness and strength.",
    },
    {
      name: "Grammar and Tone Correction",
      id: "correct",
      description:
        "Automatically correct grammar and adjust tone for professionalism.",
    },
    {
      name: "Keyword Optimization",
      id: "keywords",
      description:
        "Optimize your resume with keywords for better ATS visibility.",
    },
  ];

  const [selectedFeature, setSelectedFeature] = useState(features[0].id);
  const [resumeText, setResumeText] = useState(
    "WORK EXPERIENCE\nSoftware Engineer at Acme Corp\n• Built scalable APIs and led frontend initiative with React.\n• Improved code review system, reducing onboarding time by 20%.\n\nEDUCATION\nB.Tech – Computer Science, University of Example\n"
  );
  const [aiPreview, setAiPreview] = useState(resumeText);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated AI "transformation" for demonstration
  function handleRunAI() {
    setIsLoading(true);
    setTimeout(() => {
      let newText = resumeText;
      switch (selectedFeature) {
        case "rewrite":
          newText =
            resumeText.replace(
              /Built scalable APIs and led frontend initiative with React\./,
              "Engineered robust APIs and spearheaded a modern frontend with React, enhancing user experience."
            ) ||
            resumeText + "\n[Section Rewrite would apply here]";
          break;
        case "enhance":
          newText =
            resumeText +
            "\n[Content Enhanced: Your achievements are now described more impactfully!]";
          break;
        case "correct":
          newText = resumeText
            .replace(/frontend initiative with React\./, "React frontend initiative.")
            .replace(/onboarding time by 20%./, "onboarding time by 20 percent.");
          break;
        case "keywords":
          newText =
            resumeText +
            "\n[ATS Keywords: React, scalable APIs, code review, user experience]";
          break;
        default:
          newText = resumeText;
      }
      setAiPreview(newText);
      setIsLoading(false);
    }, 700);
  }

  // When resume text changes, preview re-syncs unless user has run AI
  function handleEditorChange(e) {
    setResumeText(e.target.value);
    setAiPreview(e.target.value);
  }

  // When switching feature, reset preview to raw resume
  function handleFeatureChange(featureId) {
    setSelectedFeature(featureId);
    setAiPreview(resumeText);
  }

  return (
    <div className="kvb-root">
      {/* Header */}
      <div className="kvb-header">
        <div className="kvb-logo">
          <span className="kvb-logo-accent">✦</span> KavyaResumeBoost
        </div>
        <div>
          <button
            className="kvb-run-btn"
            onClick={handleRunAI}
            disabled={isLoading}
            aria-label="Run AI Enhancement"
          >
            {isLoading ? "Processing..." : "Run AI"}
          </button>
        </div>
      </div>
      {/* Main Layout */}
      <div className="kvb-main">
        {/* Sidebar */}
        <aside className="kvb-sidebar" aria-label="Feature Selection">
          <span className="kvb-sidebar-title">AI Features</span>
          <ul className="kvb-feature-list">
            {features.map((feat) => (
              <li
                key={feat.id}
                className={
                  "kvb-feature-item" +
                  (selectedFeature === feat.id ? " selected" : "")
                }
                tabIndex={0}
                role="button"
                aria-pressed={selectedFeature === feat.id}
                onClick={() => handleFeatureChange(feat.id)}
                onKeyPress={(e) =>
                  (e.key === "Enter" || e.key === " ") &&
                  handleFeatureChange(feat.id)
                }
              >
                <div className="kvb-feature-title">{feat.name}</div>
                <div className="kvb-feature-desc">{feat.description}</div>
              </li>
            ))}
          </ul>
        </aside>
        {/* Editor */}
        <section className="kvb-editor-pane">
          <label htmlFor="kvb-editor" className="kvb-editor-label">
            Resume Editor
          </label>
          <textarea
            id="kvb-editor"
            className="kvb-editor"
            value={resumeText}
            onChange={handleEditorChange}
            aria-label="Resume Editor"
            disabled={isLoading}
            spellCheck={true}
            rows={18}
          ></textarea>
          <div className="kvb-editor-tip">
            Paste your current resume, or start editing above.
          </div>
        </section>
        {/* Preview */}
        <section className="kvb-preview-pane">
          <div className="kvb-preview-header">
            <span className="kvb-preview-title">Preview</span>
            <span className="kvb-preview-hint">
              {selectedFeature === "rewrite"
                ? "AI suggested rewritten section:"
                : selectedFeature === "enhance"
                ? "Enhanced content suggestion:"
                : selectedFeature === "correct"
                ? "Grammar/tone corrections:"
                : "Added keywords for ATS optimization:"}
            </span>
          </div>
          <pre className="kvb-preview-content" aria-live="polite">
            {aiPreview}
          </pre>
        </section>
      </div>
      {/* Footer */}
      <div className="kvb-footer">
        <span>
          Powered by <span className="kvb-logo-accent">Kavya AI</span> |{" "}
          <a
            href="https://kavia.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="kvb-footer-link"
          >
            Visit Kavia
          </a>
        </span>
      </div>
    </div>
  );
}

export default MainContainer;
