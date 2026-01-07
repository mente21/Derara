import React, { useState } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";

/**
 * LoadingExamples Component
 * Demonstrates various loading scenarios using the favicon
 * This is a reference component showing different use cases
 */
const LoadingExamples = () => {
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Loading Spinner Examples</h1>
          <p className="text-gray-400">All loading states use the favicon from /public/image.png</p>
        </div>

        {/* Example 1: Full Page Loading */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">1. Full Page Loading (Centered)</h2>
          <div className="bg-black/30 rounded-xl h-64 relative">
            <LoadingSpinner size="large" centered={true} />
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Use case: Initial page load, data fetching
          </p>
        </div>

        {/* Example 2: Small Inline Loading */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">2. Inline Loading (Small)</h2>
          <button
            onClick={simulateLoading}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="small" centered={false} />
                <span>Processing...</span>
              </>
            ) : (
              <span>Click to Load</span>
            )}
          </button>
          <p className="text-gray-400 text-sm mt-4">
            Use case: Button loading states, form submissions
          </p>
        </div>

        {/* Example 3: Medium Card Loading */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">3. Card Loading (Medium)</h2>
          <div className="bg-black/30 rounded-xl h-48 relative">
            <LoadingSpinner size="medium" centered={true} />
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Use case: Loading content in cards, modals
          </p>
        </div>

        {/* Example 4: Extra Large Loading */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">4. Extra Large Loading</h2>
          <div className="bg-black/30 rounded-xl h-96 relative">
            <LoadingSpinner size="xlarge" centered={true} />
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Use case: Splash screens, major transitions
          </p>
        </div>

        {/* Example 5: Custom Size */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">5. Custom Size Loading</h2>
          <div className="bg-black/30 rounded-xl h-64 relative">
            <LoadingSpinner size="w-32 h-32" centered={true} />
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Use case: Custom sizing needs - pass Tailwind classes like "w-32 h-32"
          </p>
        </div>

        {/* Example 6: Multiple Loaders */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">6. Multiple Sizes Comparison</h2>
          <div className="flex items-center justify-around bg-black/30 rounded-xl py-12">
            <div className="text-center">
              <LoadingSpinner size="small" centered={false} />
              <p className="text-xs mt-2 text-gray-400">Small</p>
            </div>
            <div className="text-center">
              <LoadingSpinner size="medium" centered={false} />
              <p className="text-xs mt-2 text-gray-400">Medium</p>
            </div>
            <div className="text-center">
              <LoadingSpinner size="large" centered={false} />
              <p className="text-xs mt-2 text-gray-400">Large</p>
            </div>
            <div className="text-center">
              <LoadingSpinner size="xlarge" centered={false} />
              <p className="text-xs mt-2 text-gray-400">XLarge</p>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Usage Instructions</h2>
          <div className="space-y-4 text-gray-300">
            <div className="bg-black/30 p-4 rounded-lg">
              <code className="text-sm">
                {`import LoadingSpinner from "../components/common/LoadingSpinner";`}
              </code>
            </div>
            <div className="bg-black/30 p-4 rounded-lg">
              <code className="text-sm">
                {`<LoadingSpinner size="medium" centered={true} />`}
              </code>
            </div>
            <div className="space-y-2 mt-4">
              <p><strong>Props:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><code>size</code>: "small" | "medium" | "large" | "xlarge" | custom Tailwind classes</li>
                <li><code>centered</code>: boolean (default: true) - centers the spinner in its container</li>
                <li><code>className</code>: string - additional CSS classes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingExamples;
