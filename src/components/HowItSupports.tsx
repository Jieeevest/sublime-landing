"use client";

export default function HowItSupports() {
  return (
    <section
      className="relative flex flex-col items-center isolate"
      style={{
        padding: "80px 120px",
        gap: "40px",
        width: "1440px",
        maxWidth: "100vw",
        background: "#F5F9FA",
      }}
    >
      {/* Title Section */}
      <div
        className="flex flex-col items-center"
        style={{
          padding: "0px",
          gap: "16px",
          width: "1200px",
          maxWidth: "100%",
          zIndex: 0,
        }}
      >
        {/* Badge */}
        <div
          className="flex flex-row justify-center items-center rounded-[99px]"
          style={{
            padding: "4px 16px",
            gap: "4px",
            width: "125px",
            background: "rgba(49, 151, 165, 0.08)",
            border: "1px solid rgba(49, 151, 165, 0.07)",
          }}
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
              fill="#3197A5"
            />
            <path
              d="M12 4L12.8 7.2L16 8L12.8 8.8L12 12L11.2 8.8L8 8L11.2 7.2L12 4Z"
              fill="#3197A5"
              opacity="0.5"
            />
          </svg>

          <span
            className="font-medium"
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "14px",
              lineHeight: "28px",
              color: "#3197A5",
            }}
          >
            Cara Kerja
          </span>
        </div>

        {/* Main Heading */}
        <h2
          className="font-bold text-center"
          style={{
            width: "1200px",
            maxWidth: "100%",
            fontFamily: "'PP Neue Montreal', sans-serif",
            fontSize: "64px",
            lineHeight: "77px",
            color: "#3197A5",
          }}
        >
          Bagaimana Sublime Mendukung Proses Pemulihan Anda
        </h2>

        {/* Description */}
        <p
          className="font-normal text-center"
          style={{
            width: "1200px",
            maxWidth: "100%",
            fontFamily: "'PP Neue Montreal', sans-serif",
            fontSize: "24px",
            lineHeight: "32px",
            color: "#1F1F1F",
          }}
        >
          Sublime menggunakan pendekatan terapi audio yang lembut untuk membantu
          menciptakan kondisi pikiran dan emosi yang lebih tenang, sehingga
          tubuh dapat menjalani proses pemulihan secara alami.
        </p>
      </div>

      {/* Content Cards */}
      <div
        className="flex flex-col items-flex-start"
        style={{
          padding: "0px",
          gap: "24px",
          width: "1200px",
          maxWidth: "100%",
          zIndex: 1,
        }}
      >
        {/* Card 1 - Frekuensi Terapi 528 Hz */}
        <div
          className="flex flex-col items-start rounded-2xl"
          style={{
            padding: "24px",
            gap: "24px",
            alignSelf: "stretch",
            background: "rgba(49, 151, 165, 0.04)",
            isolation: "isolate",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow =
              "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div
            className="flex flex-col justify-center items-start"
            style={{
              padding: "0px",
              gap: "8px",
              alignSelf: "stretch",
              zIndex: 0,
            }}
          >
            <h3
              className="font-semibold"
              style={{
                fontFamily: "'PP Neue Montreal', sans-serif",
                fontSize: "24px",
                lineHeight: "32px",
                color: "#1F1F1F",
                alignSelf: "stretch",
              }}
            >
              Frekuensi Terapi 528 Hz
            </h3>
            <div
              className="font-normal"
              style={{
                fontFamily: "'PP Neue Montreal', sans-serif",
                fontSize: "16px",
                lineHeight: "24px",
                color: "#1F1F1F",
                alignSelf: "stretch",
              }}
            >
              <p style={{ marginBottom: "16px" }}>
                Setiap audio Sublime dirancang menggunakan frekuensi 528 Hz,
                yang sering dikaitkan dengan ketenangan, keseimbangan, dan
                relaksasi mendalam. Beberapa penelitian ilmiah menunjukkan bahwa
                stimulasi suara non-invasif dapat membantu:
              </p>
              <ul style={{ marginLeft: "24px", marginBottom: "16px" }}>
                <li>Menurunkan tingkat stres</li>
                <li>Menenangkan sistem saraf</li>
                <li>Mendorong kondisi relaksasi otak</li>
              </ul>
              <p>
                Studi yang dipublikasikan di jurnal ilmiah dan dirujuk oleh{" "}
                <strong>National Institutes of Health (NIH)</strong> menunjukkan
                bahwa stimulasi audio dapat memengaruhi aktivitas otak dan
                membantu regulasi stres — faktor penting dalam pemulihan
                neurologis.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 - Afirmasi Subliminal */}
        <div
          className="flex flex-col justify-center items-center rounded-2xl"
          style={{
            padding: "24px",
            gap: "24px",
            alignSelf: "stretch",
            background: "rgba(49, 151, 165, 0.04)",
            isolation: "isolate",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow =
              "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div
            className="flex flex-col justify-center items-start"
            style={{
              padding: "0px",
              gap: "8px",
              alignSelf: "stretch",
              zIndex: 0,
            }}
          >
            <h3
              className="font-semibold"
              style={{
                fontFamily: "'PP Neue Montreal', sans-serif",
                fontSize: "24px",
                lineHeight: "32px",
                color: "#1F1F1F",
                alignSelf: "stretch",
              }}
            >
              Afirmasi Subliminal
            </h3>
            <p
              className="font-normal"
              style={{
                fontFamily: "'PP Neue Montreal', sans-serif",
                fontSize: "16px",
                lineHeight: "24px",
                color: "#1F1F1F",
                alignSelf: "stretch",
              }}
            >
              Sublime juga menyematkan afirmasi positif subliminal secara halus
              di dalam audio. Afirmasi ini tidak terdengar secara sadar, namun
              tetap dapat diterima oleh alam bawah sadar. Penelitian di jurnal{" "}
              <em>Frontiers in Human Neuroscience</em> menunjukkan bahwa
              rangsangan subliminal dapat mengaktifkan area otak yang
              berhubungan dengan emosi dan motivasi. Sementara itu, publikasi
              dari <strong>Harvard Medical School</strong> menjelaskan bahwa
              pola pikir dan ekspektasi positif dapat memperkuat respons alami
              tubuh terhadap pemulihan.
            </p>
          </div>
        </div>
      </div>

      {/* Blur Effect - Right */}
      <div
        className="absolute"
        style={{
          width: "401px",
          height: "304px",
          right: "-448px",
          top: "92px",
          background: "#3197A5",
          filter: "blur(195px)",
          transform: "rotate(-90deg)",
          zIndex: -1,
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      {/* Blur Effect - Bottom */}
      <div
        className="absolute"
        style={{
          width: "401px",
          height: "304px",
          left: "calc(50% - 401px/2 - 170.5px)",
          bottom: "-505px",
          background: "#3197A5",
          filter: "blur(195px)",
          transform: "rotate(-90deg)",
          zIndex: -1,
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
