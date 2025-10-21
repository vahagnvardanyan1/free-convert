'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../Accordion';
import { useTranslations } from 'next-intl';

export function HowTo() {
  const t = useTranslations('howTo');
  const tCommon = useTranslations('common');

  const steps = [
    {
      number: 1,
      title: t('step1Title'),
      description: t('step1Description'),
    },
    {
      number: 2,
      title: t('step2Title'),
      description: t('step2Description'),
    },
    {
      number: 3,
      title: t('step3Title'),
      description: t('step3Description'),
    },
    {
      number: 4,
      title: t('step4Title'),
      description: t('step4Description'),
    },
  ];

  return (
    <section id="how-to" className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('description')}</p>
        </div>

        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {steps.map((step, index) => (
              <AccordionItem
                key={index}
                value={`step-${index}`}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 px-6 py-2 data-[state=open]:bg-gradient-to-r data-[state=open]:from-blue-50 data-[state=open]:to-purple-50 data-[state=open]:border-blue-200"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4 [&[data-state=open]>svg]:rotate-180">
                  <div className="flex items-center space-x-4 pr-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{step.number}</span>
                    </div>
                    <span className="font-bold text-gray-900">{step.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 ml-14">
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="font-bold mb-2">{t('readyToStart')}</h3>
            <p className="mb-4 text-blue-100">{t('readyToStartDescription')}</p>
            <a href="#conversion-tool" className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
              {tCommon('startConverting')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
