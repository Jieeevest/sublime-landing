"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(1); // Default open second item as per screenshot

  const faqs = [
    {
      question: "Apa itu Strovia?",
      answer:
        "Strovia adalah platform terapi audio digital yang dirancang khusus untuk membantu proses pemulihan pasien stroke melalui stimulasi gelombang otak dan afirmasi positif.",
    },
    {
      question: "Untuk siapa Strovia dibuat?",
      answer:
        "Saat ini, Strovia difokuskan untuk mendukung pemulihan pasien stroke. Ke depannya, Strovia juga akan menghadirkan kategori lain seperti motivasi, kesehatan umum, keseimbangan emosi, dan pemulihan fisik.",
    },
    {
      question: "Berapa biaya menggunakan Strovia?",
      answer:
        "Strovia menawarkan paket berlangganan yang terjangkau. Silakan cek halaman harga atau aplikasi kami untuk informasi terbaru mengenai paket yang tersedia.",
    },
    {
      question: "Kapan waktu terbaik untuk mendengarkan Strovia?",
      answer:
        "Waktu terbaik adalah saat Anda merasa rileks, seperti di pagi hari setelah bangun tidur atau di malam hari sebelum tidur. Namun, Anda dapat mendengarkannya kapan saja sesuai kenyamanan Anda.",
    },
    {
      question: "Apakah saya bisa mendengarkan lebih dari sekali sehari?",
      answer:
        "Ya, Anda boleh mendengarkan sesi lebih dari satu kali sehari. Namun, kami sarankan untuk memberi jeda dan tidak memaksakan diri agar otak dapat memproses stimulasi dengan optimal.",
    },
    {
      question: "Apakah Strovia bisa membantu semua kondisi stroke?",
      answer:
        "Strovia dirancang sebagai pendamping pemulihan untuk mendukung aspek neurologis dan emosional. Konsultasikan dengan dokter Anda untuk memastikan kesesuaian dengan kondisi medis spesifik Anda.",
    },
    {
      question: "Bagaimana cara kerja terapi subliminal?",
      answer:
        "Terapi subliminal bekerja dengan menyampaikan pesan positif di bawah ambang kesadaran, yang dapat diterima langsung oleh alam bawah sadar untuk membantu membentuk pola pikir positif dan mendukung neuroplastisitas.",
    },
    {
      question: "Apakah saya memerlukan alat khusus?",
      answer:
        "Tidak, Anda hanya memerlukan smartphone dan earphone atau headphone stereo yang nyaman untuk mendapatkan pengalaman audio binaural yang optimal.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
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
            Pertanyaan Umum tentang Strovia
          </h2>
        </div>

        {/* FAQ List */}
        <div className={`${styles.faqList} flex flex-col items-start`}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`${styles.faqItem} flex flex-col justify-center items-center`}
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
                    {faq.question}
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
                    <p className={styles.faqAnswer}>{faq.answer}</p>
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
