'use client';

import { useState } from 'react';
import { DynamicMetadata } from '@/components/DynamicMetadata';
import { Check, X, AlertCircle, Copy, Trash2, FileJson, Zap, BarChart3 } from 'lucide-react';
import { copyToClipboard } from '@/lib/colorUtils';
import JSONEditor from '@/components/JSONEditor';
import JSONToolHero from '@/components/JSONToolHero';
import JSONToolFeatures from '@/components/JSONToolFeatures';
import JSONToolHowTo from '@/components/JSONToolHowTo';
import { useTranslations } from 'next-intl';

const metadata = {
  title: 'JSON Validator - Validate & Format JSON Online | ImageConvertors',
  description:
    'Free online JSON validator and formatter. Validate JSON syntax, format JSON with proper indentation, and get detailed error messages. Perfect for developers working with JSON data, APIs, and configuration files.',
  keywords: [
    'json validator',
    'json formatter',
    'validate json',
    'json syntax checker',
    'json parser',
    'json lint',
    'json beautifier',
    'json pretty print',
    'json online tool',
    'json checker',
    'json error checker',
    'json validation tool',
    'format json online',
    'json editor',
    'json tester',
    'validate json online',
    'json syntax validator',
    'json format checker',
    'json debugging tool',
    'free json validator',
  ],
  openGraph: {
    title: 'JSON Validator - Validate & Format JSON Online | ImageConvertors',
    description:
      'Free online JSON validator and formatter. Validate JSON syntax, format JSON with proper indentation, and get detailed error messages. Perfect for developers working with JSON data, APIs, and configuration files.',
    images: ['/json-validate.webp'],
  },
};

export default function JsonValidatorPage() {
  const t = useTranslations('textTools.jsonValidator');
  const [jsonInput, setJsonInput] = useState('');
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    error?: string;
    errorLine?: number;
    errorColumn?: number;
    formatted?: string;
    stats?: {
      lines: number;
      size: string;
      type: string;
    };
  } | null>(null);
  const [indentSize, setIndentSize] = useState(2);
  const [copied, setCopied] = useState(false);

  const validateJson = () => {
    if (!jsonInput.trim()) {
      setValidationResult({
        isValid: false,
        error: t('pleaseEnter'),
      });
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, indentSize);
      const lines = formatted.split('\n').length;
      const size = new Blob([formatted]).size;
      const sizeStr = size < 1024 ? `${size} B` : `${(size / 1024).toFixed(2)} KB`;

      let type = 'Unknown';
      if (Array.isArray(parsed)) {
        type = `Array (${parsed.length} items)`;
      } else if (typeof parsed === 'object' && parsed !== null) {
        type = `Object (${Object.keys(parsed).length} keys)`;
      } else if (typeof parsed === 'string') {
        type = 'String';
      } else if (typeof parsed === 'number') {
        type = 'Number';
      } else if (typeof parsed === 'boolean') {
        type = 'Boolean';
      } else if (parsed === null) {
        type = 'Null';
      }

      setValidationResult({
        isValid: true,
        formatted,
        stats: {
          lines,
          size: sizeStr,
          type,
        },
      });
    } catch (error) {
      let errorLine: number | undefined;
      let errorColumn: number | undefined;
      let errorMessage = 'Invalid JSON';
      let errorContext = '';

      if (error instanceof Error) {
        errorMessage = error.message;

        // Extract position from error message
        // Common formats:
        // - "Unexpected token ... at position X"
        // - "JSON at position X"
        const positionMatch = errorMessage.match(/position (\d+)/i);

        if (positionMatch) {
          const position = parseInt(positionMatch[1], 10);

          // Calculate line and column from character position
          let currentPos = 0;
          const lines = jsonInput.split('\n');

          for (let i = 0; i < lines.length; i++) {
            const lineLength = lines[i].length + 1; // +1 for newline character

            if (currentPos + lineLength > position) {
              errorLine = i + 1;
              errorColumn = position - currentPos + 1;
              break;
            }

            currentPos += lineLength;
          }

          // If we couldn't determine line, default to last line
          if (!errorLine) {
            errorLine = lines.length;
            errorColumn = lines[lines.length - 1].length;
          }
        } else {
          // Fallback: Try progressive parsing to find the problematic line
          const lines = jsonInput.split('\n');
          let lastValidLine = 0;

          // Try parsing progressively line by line
          for (let i = 1; i <= lines.length; i++) {
            const partial = lines.slice(0, i).join('\n');
            try {
              JSON.parse(partial);
              lastValidLine = i;
            } catch {
              // If this is the first line that fails, it's likely the error line
              if (lastValidLine === i - 1 || i === 1) {
                errorLine = i;
                break;
              }
            }
          }

          // If still not found, try a different approach
          if (!errorLine) {
            // Try to find the first structural error
            let openBraces = 0;
            let openBrackets = 0;
            let inString = false;
            let escapeNext = false;

            for (let i = 0; i < lines.length; i++) {
              const line = lines[i];
              for (let j = 0; j < line.length; j++) {
                const char = line[j];

                if (escapeNext) {
                  escapeNext = false;
                  continue;
                }

                if (char === '\\') {
                  escapeNext = true;
                  continue;
                }

                if (char === '"') {
                  inString = !inString;
                } else if (!inString) {
                  if (char === '{') openBraces++;
                  else if (char === '}') openBraces--;
                  else if (char === '[') openBrackets++;
                  else if (char === ']') openBrackets--;

                  // Check for negative values (closing before opening)
                  if (openBraces < 0 || openBrackets < 0) {
                    errorLine = i + 1;
                    errorColumn = j + 1;
                    break;
                  }
                }
              }
              if (errorLine) break;
            }

            // Still no error line? Default to first line
            if (!errorLine) {
              errorLine = 1;
            }
          }
        }

        // Generate error context showing the line content
        if (errorLine) {
          const lines = jsonInput.split('\n');
          const errorLineContent = lines[errorLine - 1] || '';
          const maxLength = 60;

          if (errorColumn && errorLineContent.length > maxLength) {
            // Show context around the error position
            const start = Math.max(0, errorColumn - 30);
            const end = Math.min(errorLineContent.length, errorColumn + 30);
            const prefix = start > 0 ? '...' : '';
            const suffix = end < errorLineContent.length ? '...' : '';
            errorContext = prefix + errorLineContent.substring(start, end) + suffix;
          } else if (errorLineContent.length > maxLength) {
            // Just truncate if too long and no column info
            errorContext = errorLineContent.substring(0, maxLength) + '...';
          } else {
            errorContext = errorLineContent;
          }
        }
      }

      // Format error message
      let formattedError = errorMessage;
      if (errorLine) {
        formattedError = `Parse error on line ${errorLine}`;
        if (errorContext) {
          formattedError += `:\n${errorContext}`;
        }
      }

      setValidationResult({
        isValid: false,
        error: formattedError,
        errorLine,
        errorColumn,
      });
    }
  };

  const handleCopyFormatted = async () => {
    if (validationResult?.formatted) {
      await copyToClipboard(validationResult.formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setJsonInput('');
    setValidationResult(null);
  };

  const handleLoadExample = () => {
    const example = {
      name: 'John Doe',
      age: 30,
      email: 'john@example.com',
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA',
      },
      hobbies: ['reading', 'coding', 'traveling'],
      active: true,
    };
    setJsonInput(JSON.stringify(example, null, 2));
  };

  const heroFeatures = [t('heroFeatures.feature1'), t('heroFeatures.feature2'), t('heroFeatures.feature3'), t('heroFeatures.feature4')];

  const keyFeatures = [
    {
      icon: Zap,
      title: t('keyFeatures.instantValidation.title'),
      description: t('keyFeatures.instantValidation.description'),
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: AlertCircle,
      title: t('keyFeatures.errorHighlighting.title'),
      description: t('keyFeatures.errorHighlighting.description'),
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: FileJson,
      title: t('keyFeatures.autoFormatting.title'),
      description: t('keyFeatures.autoFormatting.description'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: BarChart3,
      title: t('keyFeatures.statistics.title'),
      description: t('keyFeatures.statistics.description'),
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: t('howToSteps.step1.title'),
      description: t('howToSteps.step1.description'),
    },
    {
      number: 2,
      title: t('howToSteps.step2.title'),
      description: t('howToSteps.step2.description'),
    },
    {
      number: 3,
      title: t('howToSteps.step3.title'),
      description: t('howToSteps.step3.description'),
    },
    {
      number: 4,
      title: t('howToSteps.step4.title'),
      description: t('howToSteps.step4.description'),
    },
  ];

  return (
    <div>
      <DynamicMetadata title={metadata.title} description={metadata.description} keywords={metadata.keywords} openGraph={metadata.openGraph} />

      {/* Working Area */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('title')}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </div>

      {/* Controls */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('indentation')}</label>
          <select
            value={indentSize}
            onChange={e => setIndentSize(Number(e.target.value))}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value={2}>2 {t('spaces')}</option>
            <option value={4}>4 {t('spaces')}</option>
            <option value={8}>8 {t('spaces')}</option>
          </select>
        </div>
        <button
          onClick={handleLoadExample}
          className="px-4 py-1.5 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Load Example
        </button>
      </div>

      {/* Single Editor Section */}
      <div className="max-w-6xl mx-auto space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <FileJson size={18} />
            JSON Editor
          </label>
          <button onClick={handleClear} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
            <Trash2 size={14} />
            {t('clear')}
          </button>
        </div>

        {/* JSON Editor */}
        <JSONEditor value={jsonInput} onChange={setJsonInput} placeholder={t('pasteJson')} errorLine={validationResult?.isValid === false ? validationResult.errorLine : undefined} />

        <button
          onClick={validateJson}
          className="mt-3 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
        >
          {t('validate')}
        </button>

        {/* Validation Results Below */}
        {validationResult && (
          <div className="mt-6 space-y-4">
            {validationResult.isValid ? (
              <>
                {/* Success Message */}
                <div className="flex items-center gap-3 px-6 py-4 rounded-lg bg-green-50 dark:bg-green-900/20 border-2 border-green-500">
                  <Check className="text-green-600 dark:text-green-400 flex-shrink-0" size={28} />
                  <div>
                    <p className="font-bold text-lg text-green-900 dark:text-green-400">{t('validJson')} ✓</p>
                    <p className="text-sm text-green-700 dark:text-green-500">Your JSON is properly formatted</p>
                  </div>
                </div>

                {/* Stats */}
                {validationResult.stats && (
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{t('stats.lines')}</p>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">{validationResult.stats.lines}</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                      <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">{t('stats.size')}</p>
                      <p className="text-2xl font-bold text-purple-900 dark:text-purple-300">{validationResult.stats.size}</p>
                    </div>
                    <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                      <p className="text-xs text-pink-600 dark:text-pink-400 font-medium">{t('stats.type')}</p>
                      <p className="text-lg font-bold text-pink-900 dark:text-pink-300">{validationResult.stats.type}</p>
                    </div>
                  </div>
                )}

                {/* Formatted Output */}
                {validationResult.formatted && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-green-300 dark:border-green-700 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-4 sm:px-6 py-3 border-b border-green-200 dark:border-green-800 flex items-center justify-between">
                      <label className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Check className="text-green-600 dark:text-green-400" size={18} />
                        {t('format')}
                      </label>
                      <button
                        onClick={handleCopyFormatted}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 rounded-lg transition-colors shadow-sm"
                      >
                        {copied ? (
                          <>
                            <Check size={14} />
                            {t('copied')}
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            {t('copy')}
                          </>
                        )}
                      </button>
                    </div>
                    <div className="relative">
                      <pre className="w-full max-h-96 px-4 py-4 text-xs sm:text-sm font-mono bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-auto">
                        {validationResult.formatted}
                      </pre>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Error Message */}
                <div className="flex items-start gap-3 px-6 py-4 rounded-lg bg-red-50 dark:bg-red-900/20 border-2 border-red-500">
                  <X className="text-red-600 dark:text-red-400 flex-shrink-0 mt-1" size={28} />
                  <div className="flex-1">
                    <p className="font-bold text-lg text-red-900 dark:text-red-400 mb-3">{t('invalidJson')}</p>
                    <div className="bg-red-100 dark:bg-red-900/40 border-l-4 border-red-600 p-4 rounded">
                      <pre className="text-sm text-red-800 dark:text-red-200 font-mono whitespace-pre-wrap break-all">{validationResult.error}</pre>
                    </div>
                    {validationResult.errorColumn && (
                      <p className="text-sm text-red-700 dark:text-red-400 mt-3 font-semibold">
                        {t('column')} {validationResult.errorColumn}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div className="mt-16">
        <JSONToolHero
          icon={FileJson}
          title="JSON Validator & Formatter"
          description="Validate, format, and beautify your JSON data instantly. Free online tool with error detection and line-by-line highlighting."
          imageSrc="/json-validate.webp"
          imageAlt="JSON Validator Tool"
          features={heroFeatures}
        />
      </div>

      {/* Key Features */}
      <JSONToolFeatures features={keyFeatures} />

      {/* How to Use */}
      <JSONToolHowTo steps={howToSteps} />
    </div>
  );
}
