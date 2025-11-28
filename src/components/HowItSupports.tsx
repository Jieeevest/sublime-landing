export default function HowItSupports() {
  const supportPoints = [
    {
      title: "Reduce Stress and Anxiety",
      description: "Our guided sessions use proven techniques to help calm your mind, reduce racing thoughts, and create a sense of peace and stability in your daily life."
    },
    {
      title: "Improve Sleep Quality",
      description: "Experience better rest with our specialized sleep-focused audio sessions designed to help you relax, unwind, and achieve deeper, more restorative sleep."
    },
    {
      title: "Build Emotional Resilience",
      description: "Develop stronger coping mechanisms and emotional regulation skills through consistent practice with our therapeutic audio content."
    },
    {
      title: "Support Recovery Journey",
      description: "Whether you're recovering from trauma, managing chronic conditions, or working through life transitions, our sessions provide consistent support."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            How Sublime Supports Your Recovery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the many ways our audio therapy sessions can enhance your mental wellness 
            and support your healing journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {supportPoints.map((point, index) => (
            <div 
              key={index} 
              className="flex gap-4 p-6 rounded-xl hover:bg-teal-50 transition-colors duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {index + 1}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
