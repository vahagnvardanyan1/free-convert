import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
          <span className="text-white text-3xl font-bold">404</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">The page you&#39;re looking for doesn&#39;t exist. But don&#39;t worry, you can still convert your images!</p>
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">Go to Home</Button>
          </Link>
          <Link href="/#format-grid">
            <Button variant="outline" className="w-full">
              Start Converting
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
