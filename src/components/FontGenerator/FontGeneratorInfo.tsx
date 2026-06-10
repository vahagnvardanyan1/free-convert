'use client';

import { Type, Sparkles, MousePointerClick, ClipboardCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/Accordion';

const STEP_ICONS = [Type, Sparkles, MousePointerClick, ClipboardCheck];

export function FontGeneratorInfo() {
  const t = useTranslations('fontGenerator');

  const steps = [
    { title: t('howto.step1Title'), description: t('howto.step1Description'), Icon: STEP_ICONS[0] },
    { title: t('howto.step2Title'), description: t('howto.step2Description'), Icon: STEP_ICONS[1] },
    { title: t('howto.step3Title'), description: t('howto.step3Description'), Icon: STEP_ICONS[2] },
    { title: t('howto.step4Title'), description: t('howto.step4Description'), Icon: STEP_ICONS[3] },
  ];

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') },
  ];

  return (
    <div className="mt-12 space-y-12">
      {/* How it works */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{t('howto.title')}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                <step.Icon size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{t('faq.title')}</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4">
              <AccordionTrigger className="text-left text-gray-900 dark:text-white">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
