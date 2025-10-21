'use client';
import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface PDFErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class PDFErrorBoundary extends React.Component<{ children: React.ReactNode }, PDFErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): PDFErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('PDF Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-96 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center p-8">
            <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF Tool Unavailable</h3>
            <p className="text-gray-600 mb-4 max-w-md">There was an issue loading the PDF processing tools. This might be due to browser compatibility or network issues.</p>
            <div className="space-y-2">
              <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700 text-white">
                <RefreshCw className="mr-2" size={16} />
                Reload Page
              </Button>
              <p className="text-xs text-gray-500">If the problem persists, try using a different browser or check your internet connection.</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
