import React, { useState } from "react";
import ProfessionalLoader from "../components/common/ProfessionalLoader";

/**
 * ProfessionalLoaderExamples Component
 * Demonstrates various loading scenarios using the glowing Derara logo
 */
const ProfessionalLoaderExamples = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  const showFullScreenLoader = () => {
    setShowFullScreen(true);
    setTimeout(() => setShowFullScreen(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white p-8">
      {showFullScreen && <ProfessionalLoader fullScreen={true} size="xlarge" text="Loading..." />}
      
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Professional Loading Examples</h1>
          <p className="text-gray-400">All loading states use the glowing Derara logo with professional animations</p>
        </div>

        {/* Example 1: Full Screen Loading */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">1. Full Screen Loading</h2>
          <button
            onClick={showFullScreenLoader}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Show Full Screen Loader
          </button>
          <p className="text-gray-400 text-sm mt-4">
            Use case: Route transitions, initial app load, major data fetching
          </p>
        </div>

        {/* Example 2: Small Inline Loading */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">2. Inline Button Loading (Small)</h2>
          <button
            onClick={simulateLoading}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold flex items-center space-x-3 disabled:opacity-70 transition-colors"
          >
            {isLoading ? (
              <>
                <ProfessionalLoader size="small" centered={false} />
                <span>Processing...</span>
              </>
            ) : (
              <span>Click to Load</span>
            )}
          </button>
          <p className="text-gray-400 text-sm mt-4">
            Use case: Button loading states, form submissions, quick actions
          </p>
        </div>

        {/* Example 3: Medium Card Loading */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">3. Card Loading (Medium)</h2>
          <div className="bg-black/30 rounded-xl h-48 relative">
            <ProfessionalLoader size="medium" centered={true} />
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Use case: Loading content in cards, modals, sections
          </p>
        </div>

        {/* Example 4: Large Loading */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">4. Large Loading</h2>
          <div className="bg-black/30 rounded-xl h-64 relative">
            <ProfessionalLoader size="large" centered={true} />
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Use case: Main content loading, page sections
          </p>
        </div>

        {/* Example 5: Extra Large with Text */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">5. Extra Large with Text</h2>
          <div className="bg-black/30 rounded-xl h-96 relative">
            <ProfessionalLoader size="xlarge" centered={true} text="Please wait..." />
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Use case: Splash screens, major transitions, initial loading
          </p>
        </div>

        {/* Example 6: Multiple Sizes Comparison */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">6. All Sizes Comparison</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-black/30 rounded-xl py-12">
            <div className="text-center">
              <ProfessionalLoader size="small" centered={false} />
              <p className="text-xs mt-4 text-gray-400">Small</p>
            </div>
            <div className="text-center">
              <ProfessionalLoader size="medium" centered={false} />
              <p className="text-xs mt-4 text-gray-400">Medium</p>
            </div>
            <div className="text-center">
              <ProfessionalLoader size="large" centered={false} />
              <p className="text-xs mt-4 text-gray-400">Large</p>
            </div>
            <div className="text-center">
              <ProfessionalLoader size="xlarge" centered={false} />
              <p className="text-xs mt-4 text-gray-400">XLarge</p>
            </div>
          </div>
        </div>

        {/* Animation Features */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">✨ Animation Features</h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-300">
            <div className="bg-black/30 p-6 rounded-lg">
              <h3 className="text-green-400 font-semibold mb-2">🌟 Outer Glow Ring</h3>
              <p className="text-sm">Slow ping animation creating expanding glow effect</p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg">
              <h3 className="text-green-400 font-semibold mb-2">💫 Middle Pulse</h3>
              <p className="text-sm">Gentle pulsing for depth and dimension</p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg">
              <h3 className="text-green-400 font-semibold mb-2">✨ Logo Glow</h3>
              <p className="text-sm">Brightness and shadow variations for premium feel</p>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Usage Instructions</h2>
          <div className="space-y-4 text-gray-300">
            <div className="bg-black/30 p-4 rounded-lg">
              <code className="text-sm text-green-400">
                {`import ProfessionalLoader from "../components/common/ProfessionalLoader";`}
              </code>
            </div>
            
            <div className="space-y-2">
              <p className="font-semibold">Basic Usage:</p>
              <div className="bg-black/30 p-4 rounded-lg">
                <code className="text-sm text-green-400">
                  {`<ProfessionalLoader size="medium" centered={true} />`}
                </code>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">Full Screen:</p>
              <div className="bg-black/30 p-4 rounded-lg">
                <code className="text-sm text-green-400">
                  {`<ProfessionalLoader fullScreen={true} size="large" text="Loading..." />`}
                </code>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">In Button:</p>
              <div className="bg-black/30 p-4 rounded-lg">
                <code className="text-sm text-green-400">
                  {`<ProfessionalLoader size="small" centered={false} />`}
                </code>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <p><strong>Props:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><code>size</code>: "small" | "medium" | "large" | "xlarge" | custom classes</li>
                <li><code>centered</code>: boolean (default: true)</li>
                <li><code>fullScreen</code>: boolean (default: false) - shows overlay</li>
                <li><code>text</code>: string - optional loading text</li>
                <li><code>className</code>: string - additional CSS classes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalLoaderExamples;
