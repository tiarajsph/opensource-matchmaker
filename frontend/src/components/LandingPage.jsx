function LandingPage({
  username,
  setUsername,
  fetchRecommendations,
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center">

      <h1 className="text-5xl font-bold mb-4">
        FirstIssue
      </h1>

      <p className="text-gray-400 mb-8 max-w-md">
        Discover open-source issues tailored to your skills
      </p>

      <div className="flex gap-2 bg-[#161b22] border border-gray-700 p-2 rounded-xl">

        <input
          className="px-4 py-2 bg-transparent outline-none text-white placeholder-gray-500 w-64"
          placeholder="GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && fetchRecommendations()
          }
        />

        <button
          onClick={fetchRecommendations}
          className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-400"
        >
          Search
        </button>

      </div>

    </div>
  );
}

export default LandingPage;