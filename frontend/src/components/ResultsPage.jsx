import IssueCard from "./IssueCard";

function ResultsPage({
  username,
  setUsername,
  language,
  setLanguage,
  fetchRecommendations,
  loading,
  results,
  loadingExplain,
  handleExplain,
  setHasSearched,
  setResults,
  setLanguageState,
}) {
  return (
    <div className="p-6 max-w-3xl mx-auto">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Results</h1>

        <button
          onClick={() => {
            setHasSearched(false);
            setResults([]);
            setUsername("");
            setLanguageState("");
          }}
          className="text-sm text-gray-400 hover:text-white"
        >
          ← Back
        </button>
      </div>

      <div className="mb-6 space-y-3 w-full md:w-1/2 mx-auto">

        <div className="px-3 py-2 bg-[#161b22] border border-gray-700 rounded-lg text-gray-300 flex items-center gap-2 text-sm">

          <span className="text-green-400">👤</span>

          <input
            className="bg-transparent outline-none text-white placeholder-gray-500"
            placeholder="GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

        </div>

        <div className="flex items-center gap-2 bg-[#161b22] border border-gray-700 px-2 py-1.5 rounded-lg">

          <span className="text-gray-400 text-sm">🔍</span>

          <input
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-sm"
            placeholder="Preferred language (e.g. Python)"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && fetchRecommendations()
            }
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
        <p className="text-gray-400">
          🔍 Finding best matches...
        </p>
      )}

      {!loading && results.length === 0 && (
        <p className="text-gray-500">
          No results found
        </p>
      )}

      <div className="space-y-4">
        {results.map((item, i) => (
          <IssueCard
            key={i}
            item={item}
            handleExplain={handleExplain}
            loadingExplain={loadingExplain}
          />
        ))}
      </div>

    </div>
  );
}

export default ResultsPage;