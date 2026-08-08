import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ExplanationModal({
  selectedExplanation,
  setSelectedExplanation,
}) {
  if (!selectedExplanation) return null;

  return (
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
  );
}

export default ExplanationModal;