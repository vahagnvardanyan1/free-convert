import type { Metadata } from 'next';
import { type Locale } from '@/i18n/config';

import { WordCounter } from '@/components/WordCounter';
import { generateToolMetadata } from '@/lib/metadata/toolMetadata';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;
  return generateToolMetadata({
    locale,
    path: 'texts/word-counter',
    namespace: 'metadata.wordCounter',
  });
};

const WordCounterPage = () => {
  return <WordCounter />;
};

export default WordCounterPage;
