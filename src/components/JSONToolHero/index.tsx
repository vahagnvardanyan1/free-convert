import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

interface JSONToolHeroProps {
  icon: LucideIcon;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features: string[];
}

export default function JSONToolHero({ icon: Icon, title, description, imageSrc, imageAlt, features }: JSONToolHeroProps) {
  return (
    <div className="mb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 md:p-12 mb-8">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Icon className="w-5 h-5" />
              <span className="text-sm font-semibold">Free Online Tool</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6">{description}</p>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <span key={index} className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  ✓ {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white/20 bg-white/10 backdrop-blur-sm">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={600}
                height={400}
                className="w-full h-auto"
                priority
                onError={e => {
                  // Fallback: hide image on error
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full blur-2xl opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-400 rounded-full blur-2xl opacity-50"></div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
      </div>
    </div>
  );
}
