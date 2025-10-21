interface Step {
  number: number;
  title: string;
  description: string;
}

interface JSONToolHowToProps {
  steps: Step[];
}

export default function JSONToolHowTo({ steps }: JSONToolHowToProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">How to Use</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-blue-200 dark:border-gray-600">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">{step.number}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
