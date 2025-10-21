import { Smile } from 'lucide-react';

import { BlogSection } from '@/components/blog/BlogSection';

export const EmojiCategories = () => {
  return (
    <BlogSection title="Emoji Categories" icon={Smile} iconBgClass="bg-yellow-100" borderClass="border-l-4 border-yellow-500">
      <ul className="grid md:grid-cols-2 gap-3">
        <li className="flex items-start bg-yellow-50 p-3 rounded-lg">
          <span className="mr-2">😀</span>
          <span>Smileys & Emotions</span>
        </li>
        <li className="flex items-start bg-yellow-50 p-3 rounded-lg">
          <span className="mr-2">👋</span>
          <span>People & Body</span>
        </li>
        <li className="flex items-start bg-yellow-50 p-3 rounded-lg">
          <span className="mr-2">🐶</span>
          <span>Animals & Nature</span>
        </li>
        <li className="flex items-start bg-yellow-50 p-3 rounded-lg">
          <span className="mr-2">🍕</span>
          <span>Food & Drink</span>
        </li>
        <li className="flex items-start bg-yellow-50 p-3 rounded-lg">
          <span className="mr-2">⚽</span>
          <span>Activities & Sports</span>
        </li>
        <li className="flex items-start bg-yellow-50 p-3 rounded-lg">
          <span className="mr-2">✈️</span>
          <span>Travel & Places</span>
        </li>
        <li className="flex items-start bg-yellow-50 p-3 rounded-lg">
          <span className="mr-2">💡</span>
          <span>Objects</span>
        </li>
        <li className="flex items-start bg-yellow-50 p-3 rounded-lg">
          <span className="mr-2">❤️</span>
          <span>Symbols & Hearts</span>
        </li>
      </ul>
    </BlogSection>
  );
};
