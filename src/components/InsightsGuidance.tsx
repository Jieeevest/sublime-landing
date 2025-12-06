import Image from "next/image";
import Card from "./ui/Card";

export default function InsightsGuidance() {
  const insights = [
    {
      image: "/user-1.png",
      name: "Sarah M.",
      title: "Managing Daily Stress",
      description:
        "Sublime has become an essential part of my daily routine. The guided sessions help me stay centered and manage work stress effectively.",
    },
    {
      image: "/user-2.png",
      name: "Jennifer K.",
      title: "Better Sleep & Relaxation",
      description:
        "After struggling with insomnia for years, the sleep-focused sessions have transformed my nights. I finally feel rested and refreshed.",
    },
    {
      image: "/user-3.png",
      name: "Michael R.",
      title: "Supporting Mental Wellness",
      description:
        "As someone who values mental health, Sublime provides the professional support I need in a convenient, accessible format.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Insights and Guidance to Help You Stay Calm, Balanced, and Fulfilled
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our community members about how Sublime has supported
            their wellness journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative w-full h-64 mb-4 -mx-6 -mt-6">
                <Image
                  src={insight.image}
                  alt={insight.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {insight.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {insight.description}
                </p>
                <p className="text-primary font-medium">— {insight.name}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
