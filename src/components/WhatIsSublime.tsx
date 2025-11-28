import Image from 'next/image';
import Card from './ui/Card';

export default function WhatIsSublime() {
  const features = [
    {
      title: "Personalized Sessions",
      description: "Audio therapy tailored to your specific recovery needs and mental health goals."
    },
    {
      title: "Expert Guidance",
      description: "Created by licensed therapists and wellness professionals with years of experience."
    },
    {
      title: "Anytime, Anywhere",
      description: "Access your healing sessions whenever you need them, from any device."
    },
    {
      title: "Progress Tracking",
      description: "Monitor your journey and celebrate milestones as you move forward."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            What is Sublime?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sublime is your companion for guided healing through professionally crafted audio therapy sessions 
            designed to support your mental wellness journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left Features */}
          <div className="space-y-6">
            {features.slice(0, 2).map((feature, index) => (
              <Card key={index} className="text-center lg:text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>

          {/* Center Phone Mockup */}
          <div className="flex justify-center animate-fade-in">
            <div className="relative w-64 h-[500px]">
              <Image
                src="/phone-mockup-main.png"
                alt="Sublime app interface"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right Features */}
          <div className="space-y-6">
            {features.slice(2, 4).map((feature, index) => (
              <Card key={index} className="text-center lg:text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
