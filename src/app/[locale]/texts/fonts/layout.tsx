'use client';

export default function FontToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Free Font Tools & Typography Playground</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Preview Google Fonts, discover perfect pairings, and generate typographic scales</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl sm:p-0 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
