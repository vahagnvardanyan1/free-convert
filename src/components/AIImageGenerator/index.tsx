'use client';
import { useState, useRef, useEffect } from 'react';
import { Download, Sparkles, Wand2, RefreshCw, Image as ImageIcon, Eye, ChevronUp, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../Card';
import { useTranslations } from 'next-intl';

type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

interface ImageSettings {
  width: number;
  height: number;
  seed?: number;
  model: 'flux' | 'flux-realism' | 'flux-anime' | 'flux-3d' | 'turbo';
  enhance: boolean;
  nologo: boolean;
}

const aspectRatioMap: Record<AspectRatio, { width: number; height: number }> = {
  '1:1': { width: 1024, height: 1024 },
  '16:9': { width: 1344, height: 768 },
  '9:16': { width: 768, height: 1344 },
  '4:3': { width: 1024, height: 768 },
  '3:4': { width: 768, height: 1024 },
};

export function AIImageGenerator() {
  const t = useTranslations('aiGenerator');
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [settings, setSettings] = useState<ImageSettings>({
    width: 1024,
    height: 1024,
    model: 'flux',
    enhance: true,
    nologo: true,
  });
  const [showScrollButton, setShowScrollButton] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const dimensions = aspectRatioMap[aspectRatio];
    setSettings(prev => ({
      ...prev,
      width: dimensions.width,
      height: dimensions.height,
    }));
  }, [aspectRatio]);

  // Show/hide scroll button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        setShowScrollButton(false);
        return;
      }

      if (previewRef.current && controlsRef.current) {
        const previewTop = previewRef.current.getBoundingClientRect().top;
        const controlsBottom = controlsRef.current.getBoundingClientRect().bottom;

        // Show button if preview is below viewport
        setShowScrollButton(previewTop > window.innerHeight && controlsBottom < window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToPreview = () => {
    if (previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setShowScrollButton(false);
    }
  };

  const scrollToControls = () => {
    if (controlsRef.current) {
      controlsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setImageError(false);

    try {
      // Construct the API URL
      const encodedPrompt = encodeURIComponent(prompt);

      // Generate a random seed each time if user hasn't set one
      const randomSeed = settings.seed || Math.floor(Math.random() * 1000000000);

      // Add parameters
      const params = new URLSearchParams({
        width: settings.width.toString(),
        height: settings.height.toString(),
        model: settings.model,
        enhance: settings.enhance.toString(),
        nologo: settings.nologo.toString(),
        seed: randomSeed.toString(),
      });

      let url = `https://image.pollinations.ai/prompt/${encodedPrompt}?${params.toString()}`;

      // Add timestamp to prevent browser caching
      url += `&cache=${Date.now()}`;

      setGeneratedImage(url);

      // Auto-scroll to preview on mobile
      if (window.innerWidth < 1024) {
        setTimeout(() => scrollToPreview(), 300);
      }
    } catch (error) {
      console.error('Error generating image:', error);
      setImageError(true);
    } finally {
      // Keep generating state until image loads
    }
  };

  const handleImageLoad = () => {
    setIsGenerating(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setIsGenerating(false);
    setImageError(true);
  };

  const regenerateWithNewSeed = () => {
    // Clear any custom seed to force a new random one
    setSettings(prev => ({
      ...prev,
      seed: undefined,
    }));
    // Small delay to ensure state is updated
    setTimeout(() => {
      generateImage();
    }, 100);
  };

  const downloadImage = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-generated-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const examplePrompts = [t('examplePrompt1'), t('examplePrompt2'), t('examplePrompt3'), t('examplePrompt4'), t('examplePrompt5'), t('examplePrompt6')];

  const models = [
    { value: 'flux', label: t('fluxDefault'), description: t('fluxBestQuality') },
    { value: 'flux-realism', label: t('fluxRealism'), description: t('fluxRealismDesc') },
    { value: 'flux-anime', label: t('fluxAnime'), description: t('fluxAnimeDesc') },
    { value: 'flux-3d', label: t('flux3d'), description: t('flux3dDesc') },
    { value: 'turbo', label: t('turbo'), description: t('turboDesc') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
      <div className="text-center mb-6 sm:mb-12">
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <Sparkles className="text-purple-600 mr-2 sm:mr-3" size={32} />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">{t('title')}</h1>
        </div>
        <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">{t('description')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-8">
        {/* Left Column - Controls */}
        <div ref={controlsRef} className="space-y-4 sm:space-y-6">
          {/* Prompt Input */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
              <Wand2 className="mr-2 text-purple-600" size={20} />
              <span>{t('enterPrompt')}</span>
            </h2>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('describeImage')}</label>
                <textarea
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (prompt.trim()) {
                        generateImage();
                      }
                    }
                  }}
                  placeholder={t('promptPlaceholder')}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-1 hidden sm:block">{t('pressEnterToGenerate')}</p>
              </div>

              <Button
                onClick={generateImage}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-12 sm:h-10 text-base sm:text-sm font-semibold"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    {t('generating')}
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2" size={20} />
                    {t('generateImage')}
                  </>
                )}
              </Button>
            </div>

            {/* Example Prompts */}
            <div className="mt-4 sm:mt-6">
              <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">{t('quickExamples')}</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {examplePrompts.slice(0, 4).map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-full transition-colors border border-gray-200 hover:border-purple-300 min-h-[32px] sm:min-h-0"
                  >
                    {example.length > 35 ? example.substring(0, 35) + '...' : example}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  const allExamples = document.getElementById('all-examples');
                  if (allExamples) allExamples.classList.toggle('hidden');
                }}
                className="text-xs text-purple-600 hover:text-purple-700 font-medium mt-2 sm:hidden"
              >
                {t('showMoreExamples')}
              </button>
              <div id="all-examples" className="hidden sm:flex flex-wrap gap-1.5 mt-1.5">
                {examplePrompts.slice(4).map((example, index) => (
                  <button
                    key={index + 4}
                    onClick={() => setPrompt(example)}
                    className="text-xs px-2.5 py-1.5 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-full transition-colors border border-gray-200 hover:border-purple-300 min-h-[32px]"
                  >
                    {example.length > 35 ? example.substring(0, 35) + '...' : example}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Model Selection */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{t('aiModel')}</h2>
            <div className="space-y-2 sm:space-y-3">
              {models.map(model => (
                <button
                  key={model.value}
                  onClick={() => setSettings(prev => ({ ...prev, model: model.value as ImageSettings['model'] }))}
                  className={`w-full p-3 sm:p-4 rounded-lg border-2 transition-all text-left min-h-[56px] sm:min-h-0 ${settings.model === model.value ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300 active:border-purple-300'}`}
                >
                  <div className="font-semibold text-sm sm:text-base text-gray-900">{model.label}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{model.description}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Settings */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{t('imageSettings')}</h2>
            <div className="space-y-3 sm:space-y-4">
              {/* Aspect Ratio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('aspectRatio')}</label>
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {(['1:1', '16:9', '9:16', '4:3', '3:4'] as AspectRatio[]).map(ratio => (
                    <button
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      className={`px-2 sm:px-3 py-2.5 sm:py-2 rounded-lg border-2 text-xs sm:text-sm font-medium transition-all min-h-[44px] sm:min-h-0 ${
                        aspectRatio === ratio ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 hover:border-gray-300 active:border-purple-300 text-gray-700'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {settings.width} × {settings.height}px
                </p>
              </div>

              {/* Enhancement Options */}
              <div className="space-y-3 sm:space-y-3">
                <label className="flex items-center justify-between cursor-pointer p-3 sm:p-0 bg-gray-50 sm:bg-transparent rounded-lg sm:rounded-none min-h-[56px] sm:min-h-0">
                  <div className="flex-1 pr-3">
                    <span className="text-sm font-medium text-gray-700 block">{t('enhanceQuality')}</span>
                    <p className="text-xs text-gray-500 mt-0.5">{t('enhanceQualityDesc')}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.enhance}
                    onChange={e => setSettings(prev => ({ ...prev, enhance: e.target.checked }))}
                    className="w-6 h-6 sm:w-5 sm:h-5 text-purple-600 rounded focus:ring-purple-500 flex-shrink-0"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer p-3 sm:p-0 bg-gray-50 sm:bg-transparent rounded-lg sm:rounded-none min-h-[56px] sm:min-h-0">
                  <div className="flex-1 pr-3">
                    <span className="text-sm font-medium text-gray-700 block">{t('noLogo')}</span>
                    <p className="text-xs text-gray-500 mt-0.5">{t('noLogoDesc')}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.nologo}
                    onChange={e => setSettings(prev => ({ ...prev, nologo: e.target.checked }))}
                    className="w-6 h-6 sm:w-5 sm:h-5 text-purple-600 rounded focus:ring-purple-500 flex-shrink-0"
                  />
                </label>
              </div>

              {/* Custom Seed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('customSeed')}</label>
                <input
                  type="number"
                  value={settings.seed || ''}
                  onChange={e => setSettings(prev => ({ ...prev, seed: e.target.value ? parseInt(e.target.value) : undefined }))}
                  placeholder={t('customSeedPlaceholder')}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">{t('customSeedDesc')}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Preview & Download */}
        <div ref={previewRef} className="space-y-4 sm:space-y-6">
          {/* Mobile Back to Edit Button */}
          <div className="lg:hidden mb-3">
            <Button onClick={scrollToControls} variant="outline" className="w-full h-12 text-base font-semibold">
              <ChevronUp className="mr-2" size={20} />
              {t('backToEdit')}
            </Button>
          </div>

          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{t('generatedImage')}</h2>
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
              {generatedImage ? (
                <>
                  {isGenerating && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                      <div className="text-center px-4">
                        <Loader2 className="animate-spin text-purple-600 mx-auto mb-3" size={40} />
                        <p className="text-sm sm:text-base text-gray-600 font-medium">{t('creatingImage')}</p>
                        <p className="text-xs text-gray-500 mt-1">{t('mayTakeFewSeconds')}</p>
                      </div>
                    </div>
                  )}
                  {imageError ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-50">
                      <div className="text-center px-4">
                        <p className="text-sm sm:text-base text-red-600 font-medium mb-3">{t('failedToGenerate')}</p>
                        <Button onClick={generateImage} variant="outline" className="h-10">
                          {t('tryAgain')}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={generatedImage} alt="AI Generated" className="w-full h-full object-contain" onLoad={handleImageLoad} onError={handleImageError} />
                    </>
                  )}
                </>
              ) : (
                <div className="text-center p-6 sm:p-8">
                  <ImageIcon className="mx-auto mb-3 sm:mb-4 text-gray-300" size={48} />
                  <p className="text-sm sm:text-base text-gray-400 font-medium">{t('imageWillAppear')}</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-2">{t('enterPromptAndGenerate')}</p>
                </div>
              )}
            </div>

            {generatedImage && !isGenerating && !imageError && (
              <div className="mt-3 sm:mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs sm:text-sm text-blue-800">
                  <strong>{t('tip')}</strong> {t('regenerateTip')}
                </p>
              </div>
            )}
          </Card>

          {generatedImage && !isGenerating && !imageError && (
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{t('actions')}</h2>
              <div className="space-y-2 sm:space-y-3">
                <Button onClick={downloadImage} className="w-full bg-green-600 hover:bg-green-700 text-white h-12 sm:h-10 text-base sm:text-sm font-semibold">
                  <Download className="mr-2" size={20} />
                  {t('downloadImage')}
                </Button>
                <Button onClick={regenerateWithNewSeed} variant="outline" className="w-full h-12 sm:h-10 text-base sm:text-sm font-semibold">
                  <RefreshCw className="mr-2" size={20} />
                  {t('regenerateWithNewSeed')}
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 text-center">{t('imagesGeneratedInfo')}</p>
            </Card>
          )}

          {/* Info Card */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3 flex items-center">
              <Sparkles className="mr-2 text-purple-600" size={18} />
              <span>{t('aboutAiGeneration')}</span>
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2 mt-0.5">•</span>
                <span>{t('unlimitedGenerations')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2 mt-0.5">•</span>
                <span>{t('noSignupRequired')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2 mt-0.5">•</span>
                <span>{t('multipleModels')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2 mt-0.5">•</span>
                <span>{t('secureProcessing')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2 mt-0.5">•</span>
                <span>{t('highResOutput')}</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Floating "View Image" Button for Mobile */}
      {showScrollButton && (
        <button
          onClick={scrollToPreview}
          className="lg:hidden fixed bottom-5 right-4 left-4 sm:left-auto sm:right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-xl sm:rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 flex items-center justify-center space-x-2 animate-bounce font-semibold text-base"
          aria-label={t('viewGeneratedImage')}
        >
          <Eye size={22} />
          <span>{t('viewGeneratedImage')}</span>
        </button>
      )}
    </div>
  );
}
