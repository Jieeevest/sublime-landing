"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is Sublime?",
      answer:
        "Sublime is a guided audio therapy platform designed to support your mental wellness and recovery journey. Our professionally crafted sessions use evidence-based therapeutic techniques to help you manage stress, improve sleep, and build emotional resilience.",
    },
    {
      question: "How does audio therapy work?",
      answer:
        "Audio therapy combines guided meditation, therapeutic narration, and carefully designed soundscapes to help calm your mind, reduce anxiety, and promote healing. Our sessions are created by licensed therapists and use proven techniques from cognitive behavioral therapy, mindfulness, and relaxation practices.",
    },
    {
      question: "Is Sublime suitable for beginners?",
      answer:
        "Absolutely! Sublime is designed for everyone, whether you're new to meditation and therapy or have years of experience. We offer sessions of varying lengths and difficulty levels, so you can start wherever feels comfortable and progress at your own pace.",
    },
    {
      question: "Can I use Sublime offline?",
      answer:
        "Yes! Once you download your favorite sessions, you can access them anytime, anywhere, even without an internet connection. This makes it easy to maintain your wellness routine while traveling or in areas with limited connectivity.",
    },
    {
      question: "How often should I use Sublime?",
      answer:
        "We recommend using Sublime daily for the best results, but you can use it as often as feels right for you. Many users find that a 10-15 minute session each morning or evening helps them stay centered and balanced. Consistency is more important than duration.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "Your privacy is our top priority. We use industry-standard encryption to protect your data, and we never share your personal information with third parties. You have full control over your account and can delete your data at any time.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-secondary to-secondary-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Your Questions, Explained with Clarity
          </h2>
          <p className="text-xl text-white/80">
            Find answers to common questions about Sublime and audio therapy.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-secondary-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-secondary-700 hover:border-primary transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-secondary-700/30 transition-colors duration-200"
              >
                <span className="text-lg font-semibold pr-8">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 text-white/80 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
