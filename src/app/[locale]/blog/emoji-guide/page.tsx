import { Smile, Zap } from 'lucide-react';

import { BlogShell } from '@/components/blog/BlogShell';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { IntroSection } from './sections/IntroSection';
import { EmojiCategories } from './sections/EmojiCategories';
import { HowToUse } from './sections/HowToUse';
import { FAQSection } from './sections/FAQSection';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Free Emoji Library — Copy & Paste Emojis Online',
  description: 'Comprehensive emoji library with thousands of emojis. Click to copy, paste anywhere. Free emoji collection organized by category.',
  keywords: ['emoji', 'emojis', 'copy paste emoji', 'emoji library', 'emoji list', 'free emojis', 'emoji collection'],
  publishDate: '2025-10-08',
  path: 'emoji-guide',
});

const EmojiGuidePage = () => {
  return (
    <BlogShell
      header={{
        title: 'Free Emoji Library — Copy & Paste Emojis Online',
        description: 'Complete guide to using emojis',
        publishDate: '2025-10-08',
        readTime: '6',
        icon: Smile,
        iconBgClass: 'from-yellow-500 to-amber-600',
        gradientClass: 'from-yellow-50 to-amber-50',
      }}
    >
      <IntroSection />
      <EmojiCategories />
      <HowToUse />
      <FAQSection />

      <BlogCTA
        title="Ready to Use Emojis?"
        description="Browse thousands of emojis. Click to copy, paste anywhere. Free emoji library."
        buttonText="Browse Emojis"
        buttonHref="/texts/emojis"
        icon={Zap}
        gradientClass="from-yellow-600 to-amber-600"
      />
    </BlogShell>
  );
};

export default EmojiGuidePage;
