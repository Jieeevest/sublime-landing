"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";
import { useI18n } from "@/i18n";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const { t } = useI18n();

  const faqKeys = [
    { q: "faq_q1", a: "faq_a1" },
    { q: "faq_q2", a: "faq_a2" },
    { q: "faq_q3", a: "faq_a3" },
    { q: "faq_q4", a: "faq_a4" },
    { q: "faq_q5", a: "faq_a5" },
    { q: "faq_q6", a: "faq_a6" },
    { q: "faq_q7", a: "faq_a7" },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className={`${styles.section} flex flex-col justify-center items-flex-start relative`}
    >
      {/* Content Container */}
      <div className={`${styles.contentContainer} flex flex-col items-center`}>
        {/* Title Section */}
        <div className={`${styles.titleSection} flex flex-col items-center`}>
          {/* Badge */}
          <div
            className={`${styles.badge} flex flex-row justify-center items-center`}
          >
            {/* Star Icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{
                transform: "matrix(-1, 0, 0, 1, 0, 0)",
              }}
            >
              <path
                d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
                fill="#FFFFFF"
              />
              <path
                d="M12 4L12.8 7.2L16 8L12.8 8.8L12 12L11.2 8.8L8 8L11.2 7.2L12 4Z"
                fill="#FFFFFF"
                opacity="0.5"
              />
            </svg>

            <span className={styles.badgeText}>FAQ</span>
          </div>

          {/* Heading */}
          <h2 className={`${styles.heading} font-bold text-center`}>
            {t("faq_heading")}
          </h2>
        </div>

        {/* FAQ List */}
        <div className={`${styles.faqList} flex flex-col items-start`}>
          {faqKeys.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`${styles.faqItem} flex flex-col justify-center items-center w-full`}
              >
                {/* Question Header - Clickable */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex flex-row items-center w-full focus:outline-none"
                  style={{
                    padding: "0px",
                    gap: "4px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <h3 className={`${styles.faqQuestion} font-medium flex-grow`}>
                    {t(faq.q)}
                  </h3>

                  {/* Toggle Icon Button */}
                  <div
                    className="flex flex-col justify-center items-center rounded-full"
                    style={{
                      padding: "12px",
                      width: "44px",
                      height: "44px",
                    }}
                  >
                    {isOpen ? (
                      /* Minus Icon */
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M15.8333 10H4.16666"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      /* Plus Icon */
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 4.16666V15.8333"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.8333 10H4.16666"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={styles.faqAnswerContainer}
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div
                    className={`flex flex-col justify-center items-start w-full ${isOpen ? styles.faqAnswerBorder : ""}`}
                  >
                    <p className={styles.faqAnswer}>{t(faq.a)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
