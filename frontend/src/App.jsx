import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/explain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: item.issue_title,
          body: item.issue_body || item.issue_title,
        }),
      });

      const data = await res.json();

      setSelectedExplanation({
        title: item.issue_title,
        text: data.explanation,
      });

    } catch (err) {
      console.error(err);
    }
    setLoadingExplain(null);
  };

  useEffect(() => {
    const handleMove = (e) => {
      const glow = document.getElementById("glow");
      if (glow) {
        glow.style.left = e.clientX - 80 + "px";
        glow.style.top = e.clientY - 80 + "px";
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const fetchRecommendations = async () => {
    if (!username) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/recommend/${username}?language=${language}`
      );
      const data = await res.json();
      setResults(data.recommendations || []);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#22c55e10_1px,transparent_1px),linear-gradient(to_bottom,#22c55e10_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 -z-10 bg-green-500 opacity-10 blur-3xl animate-pulse" />

      <div
        id="glow"
        className="fixed w-40 h-40 bg-green-500 opacity-20 blur-3xl rounded-full pointer-events-none"
      ></div>

      {/* LANDING */}
      {!hasSearched && (
        <div className="flex flex-col items-center justify-center h-screen px-4 text-center">

          <h1 className="text-5xl font-bold mb-4">FirstIssue</h1>

          <p className="text-gray-400 mb-8 max-w-md">
            Discover open-source issues tailored to your skills
          </p>

          <div className="flex gap-2 bg-[#161b22] border border-gray-700 p-2 rounded-xl">
            <input
              className="px-4 py-2 bg-transparent outline-none text-white placeholder-gray-500 w-64"
              placeholder="GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchRecommendations()}
            />
            <button
              onClick={fetchRecommendations}
              className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-400"
            >
              Search
            </button>
          </div>

        </div>
      )}

      {/* RESULTS */}
      {hasSearched && (
        <div className="p-6 max-w-3xl mx-auto">

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Results</h1>

            <button
              onClick={() => {
                setHasSearched(false);
                setResults([]);
                setUsername("");
                setLanguage("");
              }}
              className="text-sm text-gray-400 hover:text-white"
            >
              ← Back
            </button>
          </div>

          {/* 🔥 HALF WIDTH SEARCH UI */}
          <div className="mb-6 space-y-3 w-full md:w-1/2 mx-auto">

            {/* Username display */}
            <div className="px-3 py-2 bg-[#161b22] border border-gray-700 rounded-lg text-gray-300 flex items-center gap-2 text-sm">
              <span className="text-green-400">👤</span>
              <input
                className="bg-transparent outline-none text-white placeholder-gray-500"
                placeholder="GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Search bar */}
            <div className="flex items-center gap-2 bg-[#161b22] border border-gray-700 px-2 py-1.5 rounded-lg">

              <span className="text-gray-400 text-sm">🔍</span>

              <input
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-sm"
                placeholder="Preferred language (e.g. Python)"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchRecommendations()}
              />

              <button
                onClick={fetchRecommendations}
                className="bg-green-500 text-black px-3 py-1.5 rounded-md text-sm hover:bg-green-400"
              >
                Search
              </button>

            </div>
          </div>

          {loading && (
            <p className="text-gray-400">🔍 Finding best matches...</p>
          )}

          {!loading && results.length === 0 && (
            <p className="text-gray-500">No results found</p>
          )}

          <div className="space-y-4">
            {results.map((item, i) => (
              <div
                key={i}
                className="bg-[#161b22] p-5 rounded-xl border border-gray-700 hover:border-green-500 transition"
              >
                <h2 className="text-lg font-semibold mb-1">
                  {item.issue_title}
                </h2>

                <p className="text-sm text-gray-400 mb-2">
                  {item.repo_name}
                </p>

                <div className="w-full bg-gray-800 rounded-full h-2 mb-3">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${Math.min(item.score * 10, 100)}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">
                    Score: {item.score}
                  </span>

                  <a
                    href={item.issue_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-400 hover:underline"
                  >
                    View →
                  </a>

                  <button
                    onClick={() => handleExplain(item)}
                    className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-400"
                  >
                    {loadingExplain === item.issue_url ? "Explaining..." : "Explain"}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {selectedExplanation && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">

          <div className="bg-[#161b22] p-6 rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto relative">

            <button
              onClick={() => setSelectedExplanation(null)}
              className="absolute top-2 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-3">
              {selectedExplanation.title}
            </h2>

            <div className="prose prose-invert max-w-none text-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {selectedExplanation.text}
              </ReactMarkdown>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;