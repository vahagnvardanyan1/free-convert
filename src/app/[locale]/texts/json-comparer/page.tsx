/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { DynamicMetadata } from '@/components/DynamicMetadata';
import { GitCompare, Check, X, ArrowLeftRight, Eye, EyeOff, Diff, Layers, Code, ChevronUp, ChevronDown, ChevronsUp, ChevronsDown } from 'lucide-react';
import JSONEditor from '@/components/JSONEditor';
import JSONToolHero from '@/components/JSONToolHero';
import JSONToolFeatures from '@/components/JSONToolFeatures';
import JSONToolHowTo from '@/components/JSONToolHowTo';
import { useTranslations } from 'next-intl';

const metadata = {
  title: 'JSON Comparer - Compare & Diff JSON Online | ImageConvertors',
  description:
    'Free online JSON comparison tool. Compare two JSON objects or arrays, visualize differences with color-coded highlighting, and get detailed diff reports. Perfect for API testing, data validation, and debugging.',
  keywords: [
    'json comparer',
    'json diff',
    'json compare',
    'compare json',
    'json difference',
    'json comparison tool',
    'json diff tool',
    'compare two json',
    'json online compare',
    'json validator compare',
    'json api compare',
    'json data compare',
    'json object compare',
    'json array compare',
    'json difference checker',
    'json merge compare',
    'json diff viewer',
    'compare json objects',
    'json debugging tool',
    'free json compare',
  ],
  openGraph: {
    title: 'JSON Comparer - Compare & Diff JSON Online | ImageConvertors',
    description:
      'Free online JSON comparison tool. Compare two JSON objects or arrays, visualize differences with color-coded highlighting, and get detailed diff reports. Perfect for API testing, data validation, and debugging.',
    images: ['/json-compare.webp'],
  },
};

type DiffType = 'added' | 'removed' | 'modified' | 'unchanged';

interface DiffItem {
  path: string;
  type: DiffType;
  oldValue?: any;
  newValue?: any;
}

export default function JsonComparerPage() {
  const t = useTranslations('textTools.jsonComparer');
  const [jsonLeft, setJsonLeft] = useState('');
  const [jsonRight, setJsonRight] = useState('');
  const [leftErrorLine, setLeftErrorLine] = useState<number | undefined>();
  const [rightErrorLine, setRightErrorLine] = useState<number | undefined>();
  const [comparisonResult, setComparisonResult] = useState<{
    isValid: boolean;
    error?: string;
    differences?: DiffItem[];
    areEqual?: boolean;
  } | null>(null);
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
  const [currentDiffIndex, setCurrentDiffIndex] = useState(0);

  const compareJson = () => {
    // Reset error lines
    setLeftErrorLine(undefined);
    setRightErrorLine(undefined);

    if (!jsonLeft.trim() || !jsonRight.trim()) {
      setComparisonResult({
        isValid: false,
        error: t('pleaseEnterBoth'),
      });
      return;
    }

    // Validate JSON 1
    try {
      JSON.parse(jsonLeft);
    } catch (error) {
      if (error instanceof Error) {
        const positionMatch = error.message.match(/position (\d+)/i);
        if (positionMatch) {
          const position = parseInt(positionMatch[1], 10);
          const lines = jsonLeft.substring(0, position).split('\n');
          setLeftErrorLine(lines.length);
        }
      }
      setComparisonResult({
        isValid: false,
        error: 'Invalid JSON in first input: ' + (error instanceof Error ? error.message : 'Invalid JSON'),
      });
      return;
    }

    // Validate JSON 2
    try {
      JSON.parse(jsonRight);
    } catch (error) {
      if (error instanceof Error) {
        const positionMatch = error.message.match(/position (\d+)/i);
        if (positionMatch) {
          const position = parseInt(positionMatch[1], 10);
          const lines = jsonRight.substring(0, position).split('\n');
          setRightErrorLine(lines.length);
        }
      }
      setComparisonResult({
        isValid: false,
        error: 'Invalid JSON in second input: ' + (error instanceof Error ? error.message : 'Invalid JSON'),
      });
      return;
    }

    // Both valid, proceed with comparison
    try {
      const parsedLeft = JSON.parse(jsonLeft);
      const parsedRight = JSON.parse(jsonRight);

      const differences = findDifferences(parsedLeft, parsedRight);
      const areEqual = differences.length === 0;

      setComparisonResult({
        isValid: true,
        differences,
        areEqual,
      });
    } catch (error) {
      setComparisonResult({
        isValid: false,
        error: error instanceof Error ? error.message : 'Error comparing JSON',
      });
    }
  };

  const findDifferences = (obj1: any, obj2: any, path = ''): DiffItem[] => {
    const diffs: DiffItem[] = [];

    // If both are the same reference or equal primitives
    if (obj1 === obj2) {
      return diffs;
    }

    // Handle null values
    if (obj1 === null || obj2 === null) {
      if (obj1 !== obj2) {
        diffs.push({
          path: path || '(root)',
          type: 'modified',
          oldValue: obj1,
          newValue: obj2,
        });
      }
      return diffs;
    }

    // Handle different types
    const type1 = Array.isArray(obj1) ? 'array' : typeof obj1;
    const type2 = Array.isArray(obj2) ? 'array' : typeof obj2;

    if (type1 !== type2) {
      diffs.push({
        path: path || '(root)',
        type: 'modified',
        oldValue: obj1,
        newValue: obj2,
      });
      return diffs;
    }

    // Handle objects and arrays
    if (typeof obj1 === 'object' && typeof obj2 === 'object') {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      const allKeys = new Set([...keys1, ...keys2]);

      allKeys.forEach(key => {
        const newPath = path ? `${path}.${key}` : key;

        if (!(key in obj1)) {
          diffs.push({
            path: newPath,
            type: 'added',
            newValue: obj2[key],
          });
        } else if (!(key in obj2)) {
          diffs.push({
            path: newPath,
            type: 'removed',
            oldValue: obj1[key],
          });
        } else {
          // Recursively compare
          const nestedDiffs = findDifferences(obj1[key], obj2[key], newPath);
          diffs.push(...nestedDiffs);
        }
      });
    } else if (obj1 !== obj2) {
      // Primitive values that are different
      diffs.push({
        path: path || '(root)',
        type: 'modified',
        oldValue: obj1,
        newValue: obj2,
      });
    }

    return diffs;
  };

  const handleSwap = () => {
    const temp = jsonLeft;
    setJsonLeft(jsonRight);
    setJsonRight(temp);
  };

  const handleLoadExample = () => {
    const example1 = {
      name: 'John Doe',
      age: 30,
      email: 'john@example.com',
      hobbies: ['reading', 'coding'],
    };

    const example2 = {
      name: 'John Doe',
      age: 31,
      email: 'john.doe@example.com',
      hobbies: ['reading', 'coding', 'traveling'],
      city: 'New York',
    };

    setJsonLeft(JSON.stringify(example1, null, 2));
    setJsonRight(JSON.stringify(example2, null, 2));
  };

  const scrollToDifference = (index: number) => {
    const diffElement = document.getElementById(`diff-${index}`);
    if (diffElement) {
      diffElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add highlight effect
      diffElement.classList.add('ring-4', 'ring-blue-500', 'ring-opacity-50');
      setTimeout(() => {
        diffElement.classList.remove('ring-4', 'ring-blue-500', 'ring-opacity-50');
      }, 2000);
    }
  };

  const goToNextDiff = useCallback(() => {
    if (!comparisonResult?.differences) return;
    const nextIndex = (currentDiffIndex + 1) % comparisonResult.differences.length;
    setCurrentDiffIndex(nextIndex);
    scrollToDifference(nextIndex);
  }, [comparisonResult, currentDiffIndex]);

  const goToPrevDiff = useCallback(() => {
    if (!comparisonResult?.differences) return;
    const prevIndex = currentDiffIndex === 0 ? comparisonResult.differences.length - 1 : currentDiffIndex - 1;
    setCurrentDiffIndex(prevIndex);
    scrollToDifference(prevIndex);
  }, [comparisonResult, currentDiffIndex]);

  const goToFirstDiff = useCallback(() => {
    setCurrentDiffIndex(0);
    scrollToDifference(0);
  }, []);

  const goToLastDiff = useCallback(() => {
    if (!comparisonResult?.differences) return;
    const lastIndex = comparisonResult.differences.length - 1;
    setCurrentDiffIndex(lastIndex);
    scrollToDifference(lastIndex);
  }, [comparisonResult]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!comparisonResult?.differences || comparisonResult.differences.length === 0) return;

      // Only handle navigation if not typing in input
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        goToNextDiff();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevDiff();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToFirstDiff();
      } else if (e.key === 'End') {
        e.preventDefault();
        goToLastDiff();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [comparisonResult, currentDiffIndex, goToFirstDiff, goToLastDiff, goToNextDiff, goToPrevDiff]);

  const formatValue = (value: any): string => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  };

  const getDiffIcon = (type: DiffType) => {
    switch (type) {
      case 'added':
        return <span className="text-green-600 dark:text-green-400 font-bold">+</span>;
      case 'removed':
        return <span className="text-red-600 dark:text-red-400 font-bold">-</span>;
      case 'modified':
        return <span className="text-orange-600 dark:text-orange-400 font-bold">~</span>;
      default:
        return <span className="text-gray-600 dark:text-gray-400 font-bold">=</span>;
    }
  };

  const getDiffColor = (type: DiffType) => {
    switch (type) {
      case 'added':
        return 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700';
      case 'removed':
        return 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700';
      case 'modified':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-300 dark:border-gray-700';
    }
  };

  const heroFeatures = [t('heroFeatures.feature1'), t('heroFeatures.feature2'), t('heroFeatures.feature3'), t('heroFeatures.feature4')];

  const keyFeatures = [
    {
      icon: GitCompare,
      title: t('keyFeatures.deepComparison.title'),
      description: t('keyFeatures.deepComparison.description'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Diff,
      title: t('keyFeatures.visualDiff.title'),
      description: t('keyFeatures.visualDiff.description'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Layers,
      title: t('keyFeatures.nestedSupport.title'),
      description: t('keyFeatures.nestedSupport.description'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Code,
      title: t('keyFeatures.validationFirst.title'),
      description: t('keyFeatures.validationFirst.description'),
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
        <button
          onClick={handleSwap}
          className="flex items-center gap-2 px-4 py-1.5 text-sm rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
        >
          <ArrowLeftRight size={16} />
          {t('swap')}
        </button>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white">
            <span className="inline-flex items-center gap-2">
              📄 {t('leftJson')}
              <span className="text-xs font-normal text-gray-500 dark:text-gray-400">(Original)</span>
            </span>
          </label>
          <JSONEditor value={jsonLeft} onChange={setJsonLeft} placeholder={t('pasteFirst')} errorLine={leftErrorLine} height="320px" />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white">
            <span className="inline-flex items-center gap-2">
              📋 {t('rightJson')}
              <span className="text-xs font-normal text-gray-500 dark:text-gray-400">(Compared)</span>
            </span>
          </label>
          <JSONEditor value={jsonRight} onChange={setJsonRight} placeholder={t('pasteSecond')} errorLine={rightErrorLine} height="320px" />
        </div>
      </div>

      <button
        onClick={compareJson}
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl mb-6 flex items-center justify-center gap-2"
      >
        <GitCompare size={20} />
        {t('compare')}
      </button>

      {/* Results Section */}
      {comparisonResult && (
        <div className="space-y-4">
          {comparisonResult.isValid ? (
            <>
              {/* Comparison Status */}
              <div
                className={`flex items-center gap-3 px-6 py-4 rounded-lg ${
                  comparisonResult.areEqual ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500' : 'bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-500'
                }`}
              >
                {comparisonResult.areEqual ? (
                  <>
                    <Check className="text-green-600 dark:text-green-400" size={28} />
                    <div>
                      <p className="font-bold text-lg text-green-900 dark:text-green-400">{t('identical')}</p>
                      <p className="text-sm text-green-700 dark:text-green-500">No differences found</p>
                    </div>
                  </>
                ) : (
                  <>
                    <X className="text-orange-600 dark:text-orange-400" size={28} />
                    <div>
                      <p className="font-bold text-lg text-orange-900 dark:text-orange-400">
                        {comparisonResult.differences?.length} {t('differencesFound')}
                      </p>
                      <p className="text-sm text-orange-700 dark:text-orange-500">
                        {comparisonResult.differences?.length} difference{comparisonResult.differences?.length !== 1 ? 's' : ''} detected
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Statistics */}
              {!comparisonResult.areEqual && comparisonResult.differences && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium">{t('diffTypes.added')}</p>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-300">{comparisonResult.differences.filter(d => d.type === 'added').length}</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium">{t('diffTypes.removed')}</p>
                    <p className="text-2xl font-bold text-red-900 dark:text-red-300">{comparisonResult.differences.filter(d => d.type === 'removed').length}</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">{t('diffTypes.modified')}</p>
                    <p className="text-2xl font-bold text-orange-900 dark:text-orange-300">{comparisonResult.differences.filter(d => d.type === 'modified').length}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Total Changes</p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">{comparisonResult.differences.length}</p>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              {!comparisonResult.areEqual && comparisonResult.differences && comparisonResult.differences.length > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    {/* Left Side - Navigation */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Navigate Diffs:</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={goToFirstDiff}
                          className="p-1.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300 transition-colors disabled:opacity-50"
                          title="First difference"
                          disabled={comparisonResult.differences.length === 0}
                        >
                          <ChevronsUp size={18} />
                        </button>
                        <button
                          onClick={goToPrevDiff}
                          className="p-1.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300 transition-colors disabled:opacity-50"
                          title="Previous difference"
                          disabled={comparisonResult.differences.length === 0}
                        >
                          <ChevronUp size={18} />
                        </button>
                        <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded border border-blue-300 dark:border-blue-700 text-sm font-mono text-blue-900 dark:text-blue-100 min-w-[80px] text-center">
                          {comparisonResult.differences.length > 0 ? `${currentDiffIndex + 1} / ${comparisonResult.differences.length}` : '0 / 0'}
                        </span>
                        <button
                          onClick={goToNextDiff}
                          className="p-1.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300 transition-colors disabled:opacity-50"
                          title="Next difference"
                          disabled={comparisonResult.differences.length === 0}
                        >
                          <ChevronDown size={18} />
                        </button>
                        <button
                          onClick={goToLastDiff}
                          className="p-1.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300 transition-colors disabled:opacity-50"
                          title="Last difference"
                          disabled={comparisonResult.differences.length === 0}
                        >
                          <ChevronsDown size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Right Side - Filter Toggle */}
                    <button
                      onClick={() => setShowOnlyDifferences(!showOnlyDifferences)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors"
                    >
                      {showOnlyDifferences ? <Eye size={16} /> : <EyeOff size={16} />}
                      {showOnlyDifferences ? 'Show All' : 'Show Only Differences'}
                    </button>
                  </div>

                  {/* Keyboard Hint */}
                  <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs">↑</kbd>
                      <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs">↓</kbd>
                      to navigate
                    </span>
                  </div>
                </div>
              )}

              {/* Differences List */}
              {!comparisonResult.areEqual && comparisonResult.differences && (
                <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <GitCompare size={20} />
                      Detailed Differences
                      <span className="ml-auto text-sm font-normal text-gray-600 dark:text-gray-400">
                        {comparisonResult.differences.length} change{comparisonResult.differences.length !== 1 ? 's' : ''}
                      </span>
                    </h3>
                  </div>
                  <div className="p-4 sm:p-6 space-y-3 max-h-[600px] overflow-y-auto">
                    {comparisonResult.differences.map((diff, index) => (
                      <div key={index} id={`diff-${index}`} className={`p-4 sm:p-5 rounded-lg border-2 ${getDiffColor(diff.type)} transition-all hover:shadow-md scroll-mt-4`}>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5 text-xl">{getDiffIcon(diff.type)}</div>
                          <div className="flex-1 min-w-0 space-y-2">
                            {/* Path */}
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded font-semibold text-gray-900 dark:text-white">{diff.path}</span>
                              <span
                                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                  diff.type === 'added'
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                    : diff.type === 'removed'
                                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                      : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                                }`}
                              >
                                {diff.type.toUpperCase()}
                              </span>
                            </div>

                            {/* Values */}
                            <div className="space-y-2">
                              {diff.type === 'added' && (
                                <div className="bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 p-3 rounded">
                                  <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">✓ ADDED</p>
                                  <pre className="text-sm font-mono text-green-800 dark:text-green-300 whitespace-pre-wrap break-all">{formatValue(diff.newValue)}</pre>
                                </div>
                              )}
                              {diff.type === 'removed' && (
                                <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-3 rounded">
                                  <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">✗ REMOVED</p>
                                  <pre className="text-sm font-mono text-red-800 dark:text-red-300 whitespace-pre-wrap break-all">{formatValue(diff.oldValue)}</pre>
                                </div>
                              )}
                              {diff.type === 'modified' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-3 rounded">
                                    <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">- OLD VALUE</p>
                                    <pre className="text-sm font-mono text-red-800 dark:text-red-300 whitespace-pre-wrap break-all">{formatValue(diff.oldValue)}</pre>
                                  </div>
                                  <div className="bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 p-3 rounded">
                                    <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">+ NEW VALUE</p>
                                    <pre className="text-sm font-mono text-green-800 dark:text-green-300 whitespace-pre-wrap break-all">{formatValue(diff.newValue)}</pre>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg px-6 py-4">
              <div className="flex items-start gap-3">
                <X className="text-red-600 dark:text-red-400 flex-shrink-0" size={24} />
                <div>
                  <p className="font-bold text-red-900 dark:text-red-400">Comparison Error</p>
                  <p className="text-sm text-red-700 dark:text-red-500 mt-1 font-mono">{comparisonResult.error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hero Section */}
      <div className="mt-16">
        <JSONToolHero
          icon={GitCompare}
          title="JSON Comparer & Diff Tool"
          description="Compare two JSON objects or arrays instantly. Visualize differences with color-coded highlighting and detailed change tracking."
          imageSrc="/json-compare.webp"
          imageAlt="JSON Comparer Tool"
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
