"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(1); // Default open second item as per screenshot

  const faqs = [
    {
      question: "Apa itu Strovia ?",
      answer:
        "Strovia adalah produk audio subliminal berbasis frekuensi khusus yang bertujuan untuk membangkitkan kemampuan pemulihan mandiri (self healing) dalam diri penderita stroke",
    },
    {
      question: "Untuk Siapa Strovia dibuat ?",
      answer:
        "Strovia dibuat khusus bagi Anda yang mengalami serangan Stroke dan bertekad untuk pulih dari kondisi tersebut lewat kemampuan yang dimiliki oleh tubuh Anda untuk memulihkan dirinya sendiri.",
    },
    {
      question: "Berapa biaya untuk menggunakan Strovia ?",
      answer:
        "Biaya paket berlangganan akses Strovia dapat Anda peroleh dengan jelas di halaman berlangganan dan paket tersebut tidak menggukan perpanjangan otomatis, sehingga Anda bisa menetukan kapan saja ingin berlangganan Strovia sesuai kebutuhan dan situasi Anda.",
    },
    {
      question:
        "Apakah saya bisa mendengarkan audio Strovia lebih dari sekali dalam sehari?",
      answer:
        "Tidak ada batasan untuk berapa kali Anda dapat mendengarkan audio Strovia. Anda dapat mengatur sendiri berapa kali Anda ingin mendengarkan audio Strovia di saat yang memang kondusif bagi situasi Anda.",
    },
    {
      question: "Apakah Strovia dapat membantu kondisi stroke?",
      answer:
        "Afirmasi dalam audio Strovua dirancang sedemikian rupa untuk dapat memicu pemulihan mandiri dari berbagai macam kondisi stroke yang Anda alami.",
    },
    {
      question: "Bagaimana cara kerja terapi subliminal ?",
      answer:
        "Dalam audio Strovia juga disematkan afirmasi (pesan) yang bersifat subliminal (tersembunyi), dimana pesan tersebut tidak terdengar pada frekuensi pendengaran norma manusia sehingga tidak tertangkap oleh pikiran sadar tapi dapat tertangkap oleh pikiran bawah sadar. Hal tersebut untuk menghindari resistansi (penolakan) oleh pikiran sadar tapi pesan tersebut dapat ditangkap sepenuhnya oleh pikiran bawah sadar, yaitu bagian dari pikiran (otak) yang 95% mengontrol aktifitas fisik bahkan kehidupan kita sehari hari.",
    },
    {
      question: "Apakah saya memerlukan alat khusus ?",
      answer:
        "Anda dapat menggunakan alat pemutar/ penyetel audio apapun, akan lebih baik bila Anda dapat menggunakan earphoene, earbud, headset dll. Tapi Media apapun tidak akan mengurangi fungsi dari Audio Strovia, selama audio dapat Anda dengarkan dengan nyaman dan jelas, itu sudah cukup efektif.",
    },
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
