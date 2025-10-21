'use client';
import { FileImage, Shield, HardDrive, Layers, Settings, Heart } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../Accordion';
import { useTranslations } from 'next-intl';

export function FAQ() {
  const t = useTranslations('faq');
  const tCommon = useTranslations('common');

  const faqs = [
    {
      question: t('question1'),
      answer: t('answer1'),
      icon: FileImage,
    },
    {
      question: t('question2'),
      answer: t('answer2'),
      icon: Shield,
    },
    {
      question: t('question3'),
      answer: t('answer3'),
      icon: HardDrive,
    },
    {
      question: t('question4'),
      answer: t('answer4'),
      icon: Layers,
    },
    {
      question: t('question5'),
      answer: t('answer5'),
      icon: Settings,
    },
    {
      question: t('question6'),
      answer: t('answer6'),
      icon: Heart,
    },
  ];

  return (
    <section id="faq" className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('description')}</p>
        </div>

        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => {
              const IconComponent = faq.icon;
              return (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 px-6 py-2 data-[state=open]:bg-gradient-to-r data-[state=open]:from-blue-50 data-[state=open]:to-purple-50 data-[state=open]:border-blue-200"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4 [&[data-state=open]>svg]:rotate-180">
                    <div className="flex items-center space-x-4 pr-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <IconComponent className="text-white" size={20} />
                      </div>
                      <span className="font-bold text-gray-900">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 ml-14">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="font-bold mb-2">{t('stillHaveQuestions')}</h3>
            <p className="mb-4 text-blue-100">{t('stillHaveQuestionsDescription')}</p>
            <a href="#" className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
              {tCommon('contactSupport')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
