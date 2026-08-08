function IssueCard({
  item,
  handleExplain,
  loadingExplain,
}) {
  return (
    <div className="bg-[#161b22] p-5 rounded-xl border border-gray-700 hover:border-green-500 transition">

      <h2 className="text-lg font-semibold mb-1">
        {item.issue_title}
      </h2>

      <p className="text-sm text-gray-400 mb-2">
        {item.repo_name}
      </p>

      <div className="w-full bg-gray-800 rounded-full h-2 mb-3">
        <div
          className="bg-green-500 h-2 rounded-full"
          style={{
            width: `${Math.min(item.score * 10, 100)}%`,
          }}
        />
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
          {loadingExplain === item.issue_url
            ? "Explaining..."
            : "Explain"}
        </button>

      </div>

    </div>
  );
}

export default IssueCard;