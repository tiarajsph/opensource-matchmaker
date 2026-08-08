import { useState } from "react";
import AnimatedBackground from "./components/AnimatedBackground";
import LandingPage from "./components/LandingPage";
import IssueCard from "./components/IssueCard";
import ExplanationModal from "./components/ExplanationModal";
import ResultsPage from "./components/ResultsPage";
import {
  getRecommendations,
  explainIssue,
} from "./services/api";

function App() {
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [loadingExplain, setLoadingExplain] = useState(null);
  const [selectedExplanation, setSelectedExplanation] = useState(null);

  const handleExplain = async (item) => {
    setLoadingExplain(item.issue_url);
    try {
   const data = await explainIssue(
  item.issue_title,
  item.issue_body || item.issue_title
);

setSelectedExplanation({
  title: item.issue_title,
  text: data.explanation,
});

    } catch (err) {
      console.error(err);
    }
    setLoadingExplain(null);
  };

 

  const fetchRecommendations = async () => {
    if (!username) return;

    setLoading(true);
    setHasSearched(true);

    try {
      
    const data = await getRecommendations(
  username,
  language
);

setResults(data.recommendations || []);  
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white relative overflow-hidden">

     <AnimatedBackground />

      {!hasSearched && (
  <LandingPage
    username={username}
    setUsername={setUsername}
    fetchRecommendations={fetchRecommendations}
  />
)}

      {hasSearched && (
  <ResultsPage
    username={username}
    setUsername={setUsername}
    language={language}
    setLanguage={setLanguage}
    fetchRecommendations={fetchRecommendations}
    loading={loading}
    results={results}
    loadingExplain={loadingExplain}
    handleExplain={handleExplain}
    setHasSearched={setHasSearched}
    setResults={setResults}
    setLanguageState={setLanguage}
  />
      )}
      
     <ExplanationModal
  selectedExplanation={selectedExplanation}
  setSelectedExplanation={setSelectedExplanation}
/>
    </div>
  );
}

export default App;