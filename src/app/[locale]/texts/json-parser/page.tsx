/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { JSX, useState } from 'react';
import { DynamicMetadata } from '@/components/DynamicMetadata';
import { Check, X, ChevronRight, ChevronDown, Copy, Trash2, FileSearch, TreeDeciduous, Info, MousePointer, Maximize2, Minimize2 } from 'lucide-react';
import { copyToClipboard } from '@/lib/colorUtils';
import JSONEditor from '@/components/JSONEditor';
import JSONToolHero from '@/components/JSONToolHero';
import JSONToolFeatures from '@/components/JSONToolFeatures';
import JSONToolHowTo from '@/components/JSONToolHowTo';
import { useTranslations } from 'next-intl';

const metadata = {
  title: 'JSON Parser - Parse & Explore JSON Online | ImageConvertors',
  description:
    'Free online JSON parser and explorer. Parse JSON data, explore nested structures, view data types, and navigate through complex JSON with an interactive tree view. Perfect for debugging and understanding JSON data.',
  keywords: [
    'json parser',
    'json explorer',
    'parse json',
    'json tree view',
    'json navigator',
    'json viewer',
    'json analyzer',
    'json structure',
    'json data types',
    'json browser',
    'explore json',
    'json inspector',
    'json debugger',
    'json online parser',
    'free json parser',
    'json object viewer',
    'json array viewer',
    'nested json viewer',
    'json path viewer',
    'json key value viewer',
  ],
  openGraph: {
    title: 'JSON Parser - Parse & Explore JSON Online | ImageConvertors',
    description: 'Free online JSON parser and explorer. Parse JSON data, explore nested structures, view data types, and navigate through complex JSON with an interactive tree view.',
    images: ['/json-parse.webp'],
  },
};

export default function JsonParserPage() {
  const t = useTranslations('textTools.jsonParser');
  const [jsonInput, setJsonInput] = useState('');
  const [parseResult, setParseResult] = useState<{
    isValid: boolean;
    error?: string;
    errorLine?: number;
    errorColumn?: number;
    parsed?: any;
    stats?: {
      type: string;
      size: string;
      depth: number;
      keys?: number;
      items?: number;
    };
  } | null>(null);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);

  const parseJson = () => {
    if (!jsonInput.trim()) {
      setParseResult({
        isValid: false,
        error: t('pleaseEnter'),
      });
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      const depth = getMaxDepth(parsed);
      const size = new Blob([jsonInput]).size;
      const sizeStr = size < 1024 ? `${size} B` : `${(size / 1024).toFixed(2)} KB`;

      let type = 'Unknown';
      let keys: number | undefined;
      let items: number | undefined;

      if (Array.isArray(parsed)) {
        type = 'Array';
        items = parsed.length;
      } else if (typeof parsed === 'object' && parsed !== null) {
        type = 'Object';
        keys = Object.keys(parsed).length;
      } else if (typeof parsed === 'string') {
        type = 'String';
      } else if (typeof parsed === 'number') {
        type = 'Number';
      } else if (typeof parsed === 'boolean') {
        type = 'Boolean';
      } else if (parsed === null) {
        type = 'Null';
      }

      setParseResult({
        isValid: true,
        parsed,
        stats: {
          type,
          size: sizeStr,
          depth,
          keys,
          items,
        },
      });

      // Auto-expand root level
      setExpandedPaths(new Set(['root']));
    } catch (error) {
      let errorLine: number | undefined;
      let errorColumn: number | undefined;
      let errorMessage = 'Invalid JSON';

      if (error instanceof Error) {
        errorMessage = error.message;
        const positionMatch = errorMessage.match(/position (\d+)/i);

        if (positionMatch) {
          const position = parseInt(positionMatch[1], 10);
          const lines = jsonInput.substring(0, position).split('\n');
          errorLine = lines.length;
          errorColumn = lines[lines.length - 1].length + 1;
        }

        if (errorLine) {
          const lines = jsonInput.split('\n');
          const errorLineContent = lines[errorLine - 1] || '';
          const maxLength = 60;

          let errorContext = '';
          if (errorColumn && errorLineContent.length > maxLength) {
            const start = Math.max(0, errorColumn - 30);
            const end = Math.min(errorLineContent.length, errorColumn + 30);
            const prefix = start > 0 ? '...' : '';
            const suffix = end < errorLineContent.length ? '...' : '';
            errorContext = prefix + errorLineContent.substring(start, end) + suffix;
          } else if (errorLineContent.length > maxLength) {
            errorContext = errorLineContent.substring(0, maxLength) + '...';
          } else {
            errorContext = errorLineContent;
          }

          errorMessage = `Parse error on line ${errorLine}`;
          if (errorContext) {
            errorMessage += `:\n${errorContext}`;
          }
        }
      }

      setParseResult({
        isValid: false,
        error: errorMessage,
        errorLine,
        errorColumn,
      });
    }
  };

  const getMaxDepth = (obj: any, currentDepth = 0): number => {
    if (obj === null || typeof obj !== 'object') {
      return currentDepth;
    }

    const depths = Object.values(obj).map(value => getMaxDepth(value, currentDepth + 1));

    return Math.max(currentDepth, ...depths);
  };

  const togglePath = (path: string) => {
    setExpandedPaths(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const handleCopy = async (value: any, path: string) => {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
    await copyToClipboard(stringValue);
    setCopied(path);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleClear = () => {
    setJsonInput('');
    setParseResult(null);
    setExpandedPaths(new Set());
  };

  const handleLoadExample = () => {
    const example = {
      user: {
        id: 12345,
        name: 'John Doe',
        email: 'john@example.com',
        isActive: true,
        roles: ['admin', 'user'],
        profile: {
          age: 30,
          country: 'USA',
          preferences: {
            theme: 'dark',
            notifications: true,
          },
        },
      },
      products: [
        { id: 1, name: 'Product A', price: 29.99 },
        { id: 2, name: 'Product B', price: 49.99 },
      ],
    };
    setJsonInput(JSON.stringify(example, null, 2));
  };

  const getAllPaths = (obj: any, currentPath = 'root'): string[] => {
    const paths: string[] = [currentPath];

    if (obj !== null && typeof obj === 'object') {
      if (Array.isArray(obj)) {
        obj.forEach((_, index) => {
          paths.push(...getAllPaths(obj[index], `${currentPath}[${index}]`));
        });
      } else {
        Object.keys(obj).forEach(key => {
          paths.push(...getAllPaths(obj[key], `${currentPath}.${key}`));
        });
      }
    }

    return paths;
  };

  const expandAll = () => {
    if (!parseResult?.parsed) return;
    const allPaths = getAllPaths(parseResult.parsed);
    setExpandedPaths(new Set(allPaths));
  };

  const collapseAll = () => {
    setExpandedPaths(new Set());
  };

  const expandToLevel = (level: number) => {
    if (!parseResult?.parsed) return;
    const allPaths = getAllPaths(parseResult.parsed);
    const pathsAtLevel = allPaths.filter(path => {
      const depth = (path.match(/\./g) || []).length + (path.match(/\[/g) || []).length;
      return depth <= level;
    });
    setExpandedPaths(new Set(pathsAtLevel));
  };

  const renderValue = (value: any, path: string, key?: string | number): JSX.Element => {
    const isExpanded = expandedPaths.has(path);

    if (Array.isArray(value)) {
      return (
        <div className="mb-1">
          <div className="flex items-center gap-2 group">
            <button onClick={() => togglePath(path)} className="flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
              {isExpanded ? <ChevronDown size={16} className="text-gray-600 dark:text-gray-400" /> : <ChevronRight size={16} className="text-gray-600 dark:text-gray-400" />}
              {key !== undefined && <span className="font-semibold text-purple-600 dark:text-purple-400">&quot;{key}&quot;: </span>}
              <span className="text-gray-600 dark:text-gray-400">[{value.length}]</span>
              <span className="text-xs text-gray-500 dark:text-gray-500">Array</span>
            </button>
            <button onClick={() => handleCopy(value, path)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-opacity" title="Copy">
              {copied === path ? <Check size={14} className="text-green-600 dark:text-green-400" /> : <Copy size={14} className="text-gray-600 dark:text-gray-400" />}
            </button>
          </div>
          {isExpanded && (
            <div className="ml-6 border-l-2 border-gray-200 dark:border-gray-700 pl-4 mt-1">
              {value.map((item: any, index: number) => (
                <div key={index}>{renderValue(item, `${path}[${index}]`, index)}</div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (value !== null && typeof value === 'object') {
      const keys = Object.keys(value);
      return (
        <div className="mb-1">
          <div className="flex items-center gap-2 group">
            <button onClick={() => togglePath(path)} className="flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded">
              {isExpanded ? <ChevronDown size={16} className="text-gray-600 dark:text-gray-400" /> : <ChevronRight size={16} className="text-gray-600 dark:text-gray-400" />}
              {key !== undefined && <span className="font-semibold text-blue-600 dark:text-blue-400">&quot;{key}&quot;: </span>}
              <span className="text-gray-600 dark:text-gray-400">{`{${keys.length}}`}</span>
              <span className="text-xs text-gray-500 dark:text-gray-500">Object</span>
            </button>
            <button onClick={() => handleCopy(value, path)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-opacity" title="Copy">
              {copied === path ? <Check size={14} className="text-green-600 dark:text-green-400" /> : <Copy size={14} className="text-gray-600 dark:text-gray-400" />}
            </button>
          </div>
          {isExpanded && (
            <div className="ml-6 border-l-2 border-gray-200 dark:border-gray-700 pl-4 mt-1">
              {keys.map(k => (
                <div key={k}>{renderValue(value[k], `${path}.${k}`, k)}</div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Primitive values
    const valueColor =
      typeof value === 'string'
        ? 'text-green-600 dark:text-green-400'
        : typeof value === 'number'
          ? 'text-orange-600 dark:text-orange-400'
          : typeof value === 'boolean'
            ? 'text-purple-600 dark:text-purple-400'
            : 'text-gray-600 dark:text-gray-400';

    const displayValue = typeof value === 'string' ? `"${value}"` : String(value);

    return (
      <div className="flex items-center gap-2 mb-1 group hover:bg-gray-50 dark:hover:bg-gray-800 px-2 py-1 rounded">
        <span className="ml-6">
          {key !== undefined && <span className="font-semibold text-blue-600 dark:text-blue-400">&quot;{key}&quot;: </span>}
          <span className={valueColor}>{displayValue}</span>
          <span className="text-xs text-gray-500 dark:text-gray-500 ml-2">{typeof value}</span>
        </span>
        <button onClick={() => handleCopy(value, path)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-opacity" title="Copy">
          {copied === path ? <Check size={14} className="text-green-600 dark:text-green-400" /> : <Copy size={14} className="text-gray-600 dark:text-gray-400" />}
        </button>
      </div>
    );
  };

  const heroFeatures = [t('heroFeatures.feature1'), t('heroFeatures.feature2'), t('heroFeatures.feature3'), t('heroFeatures.feature4')];

  const keyFeatures = [
    {
      icon: TreeDeciduous,
      title: t('keyFeatures.treeView.title'),
      description: t('keyFeatures.treeView.description'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Info,
      title: t('keyFeatures.dataTypes.title'),
      description: t('keyFeatures.dataTypes.description'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Copy,
      title: t('keyFeatures.copyValues.title'),
      description: t('keyFeatures.copyValues.description'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: MousePointer,
      title: t('keyFeatures.statistics.title'),
      description: t('keyFeatures.statistics.description'),
      color: 'from-orange-500 to-red-500',
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
        <button
          onClick={handleLoadExample}
          className="px-4 py-1.5 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Load Example
        </button>
        <button onClick={handleClear} className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
          <Trash2 size={14} />
          {t('clear')}
        </button>
      </div>

      {/* Tree Controls - Show when parsed */}
      {parseResult?.isValid && parseResult?.parsed && (
        <div className="mb-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2">Tree Controls:</span>
            <button onClick={expandAll} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              <Maximize2 size={14} />
              Expand All
            </button>
            <button onClick={collapseAll} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Minimize2 size={14} />
              Collapse All
            </button>
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-gray-600 dark:text-gray-400">Expand to:</span>
              {[1, 2, 3].map(level => (
                <button
                  key={level}
                  onClick={() => expandToLevel(level)}
                  className="px-2.5 py-1 text-sm bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-600 transition-colors"
                >
                  L{level}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Input Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FileSearch size={18} />
              Input JSON
            </label>
          </div>

          <JSONEditor value={jsonInput} onChange={setJsonInput} placeholder={t('pasteJson')} errorLine={parseResult?.isValid === false ? parseResult.errorLine : undefined} />

          <button
            onClick={parseJson}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <FileSearch size={18} />
            {t('parse')}
          </button>
        </div>

        {/* Result Section */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
            <TreeDeciduous size={18} />
            Parsed Structure
          </label>

          {parseResult ? (
            <div className="space-y-4">
              {parseResult.isValid ? (
                <>
                  {/* Success Badge */}
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-50 dark:bg-green-900/20 border-2 border-green-500">
                    <Check className="text-green-600 dark:text-green-400 flex-shrink-0" size={24} />
                    <div>
                      <p className="font-semibold text-green-900 dark:text-green-400">Valid JSON</p>
                      <p className="text-sm text-green-700 dark:text-green-500">Successfully parsed</p>
                    </div>
                  </div>

                  {/* Stats */}
                  {parseResult.stats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{t('stats.type')}</p>
                        <p className="text-lg font-bold text-blue-900 dark:text-blue-300">{parseResult.stats.type}</p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                        <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">{t('stats.size')}</p>
                        <p className="text-lg font-bold text-purple-900 dark:text-purple-300">{parseResult.stats.size}</p>
                      </div>
                      <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-lg border border-pink-200 dark:border-pink-800">
                        <p className="text-xs text-pink-600 dark:text-pink-400 font-medium">{t('stats.depth')}</p>
                        <p className="text-lg font-bold text-pink-900 dark:text-pink-300">{parseResult.stats.depth}</p>
                      </div>
                      <div className="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-lg border border-cyan-200 dark:border-cyan-800">
                        <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">{parseResult.stats.keys !== undefined ? t('stats.keys') : t('stats.items')}</p>
                        <p className="text-lg font-bold text-cyan-900 dark:text-cyan-300">{parseResult.stats.keys ?? parseResult.stats.items ?? 'N/A'}</p>
                      </div>
                    </div>
                  )}

                  {/* Tree View */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-blue-200 dark:border-blue-700 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 px-4 py-3 border-b border-blue-200 dark:border-blue-700">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <TreeDeciduous size={18} className="text-blue-600 dark:text-blue-400" />
                        Structure Tree
                        <span className="ml-auto text-xs font-normal text-gray-600 dark:text-gray-400">Click to expand/collapse</span>
                      </h3>
                    </div>
                    <div className="p-4 max-h-96 overflow-auto bg-gray-50 dark:bg-gray-900/50">{renderValue(parseResult.parsed, 'root')}</div>
                  </div>
                </>
              ) : (
                <>
                  {/* Error Badge */}
                  <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 border-2 border-red-500">
                    <X className="text-red-600 dark:text-red-400 flex-shrink-0 mt-1" size={24} />
                    <div className="flex-1">
                      <p className="font-semibold text-red-900 dark:text-red-400 mb-2">Invalid JSON</p>
                      <div className="bg-red-100 dark:bg-red-900/40 border-l-4 border-red-600 p-3 rounded">
                        <pre className="text-sm text-red-800 dark:text-red-200 font-mono whitespace-pre-wrap break-all">{parseResult.error}</pre>
                      </div>
                      {parseResult.errorColumn && <p className="text-sm text-red-700 dark:text-red-400 mt-2 font-semibold">Column {parseResult.errorColumn}</p>}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900/50">
              <div className="text-center">
                <div className="text-6xl mb-3">🔍</div>
                <p className="text-gray-600 dark:text-gray-400">Enter JSON and click parse</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="mt-16">
        <JSONToolHero
          icon={FileSearch}
          title="JSON Parser & Explorer"
          description="Parse and explore JSON data with an interactive tree view. Navigate nested structures, view data types, and copy values instantly."
          imageSrc="/json-parse.webp"
          imageAlt="JSON Parser Tool"
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
