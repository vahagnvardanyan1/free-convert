'use client';

import { useRef, useEffect } from 'react';

interface JSONEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  errorLine?: number;
  height?: string;
  onScroll?: (scrollTop: number) => void;
}

export default function JSONEditor({ value, onChange, placeholder, errorLine, height = '500px', onScroll }: JSONEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Scroll to error line when it changes
  useEffect(() => {
    if (errorLine && textareaRef.current) {
      const lineHeight = 20;
      const errorLinePosition = (errorLine - 1) * lineHeight;
      const textareaHeight = textareaRef.current.clientHeight;

      const scrollPosition = errorLinePosition - textareaHeight / 2 + lineHeight / 2;

      textareaRef.current.scrollTop = Math.max(0, scrollPosition);

      if (backgroundRef.current) {
        backgroundRef.current.scrollTop = textareaRef.current.scrollTop;
      }
      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
      }
    }
  }, [errorLine]);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const scrollTop = e.currentTarget.scrollTop;

    // Sync line numbers scroll
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = scrollTop;
    }

    // Sync background scroll
    if (backgroundRef.current) {
      backgroundRef.current.scrollTop = scrollTop;
    }

    // Call parent onScroll if provided
    if (onScroll) {
      onScroll(scrollTop);
    }
  };

  return (
    <div className={`relative rounded-lg border-2 overflow-hidden ${errorLine ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`} style={{ height }}>
      <div className="flex h-full">
        {/* Line numbers */}
        <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 px-3 py-3 text-right border-r border-gray-300 dark:border-gray-600 select-none overflow-hidden">
          <div ref={lineNumbersRef} className="overflow-y-auto h-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {value.split('\n').map((_, index) => {
              const lineNumber = index + 1;
              const isError = errorLine === lineNumber;

              return (
                <div
                  key={index}
                  className={`text-xs font-mono leading-5 px-1 ${isError ? 'bg-red-600 text-white font-bold rounded-sm' : 'text-gray-600 dark:text-gray-400'}`}
                  style={{ height: '20px', lineHeight: '20px' }}
                >
                  {lineNumber}
                </div>
              );
            })}
          </div>
        </div>

        {/* Text area with background highlights */}
        <div className="flex-1 relative bg-white dark:bg-gray-700 overflow-hidden">
          {/* Background layer with error highlighting */}
          {errorLine && (
            <div
              ref={backgroundRef}
              className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-0 overflow-hidden"
              style={{
                paddingTop: '12px',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingBottom: '12px',
              }}
            >
              {value.split('\n').map((_, index) => {
                const lineNumber = index + 1;
                const isErrorLine = errorLine === lineNumber;

                return (
                  <div
                    key={index}
                    style={{
                      height: '20px',
                      lineHeight: '20px',
                      backgroundColor: isErrorLine ? 'rgba(239, 68, 68, 0.5)' : 'transparent',
                      marginLeft: '-16px',
                      marginRight: '-16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={e => onChange(e.target.value)}
            onScroll={handleScroll}
            placeholder={placeholder}
            className="relative w-full h-full px-4 py-3 text-sm font-mono bg-transparent text-gray-900 dark:text-white focus:outline-none resize-none z-10"
            style={{
              lineHeight: '20px',
            }}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
