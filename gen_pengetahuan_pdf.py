"""Generate `public/pdf/pengetahuan-pendamping.pdf` with a branded background.

Runs with: python gen_pengetahuan_pdf.py
Requires: pip install fpdf2
"""

import os
from fpdf import FPDF

BG_PATH = r"C:\Users\LENOVO LOQ\Downloads\Strovia Teks PDF_Background.png"
OUT_PATH = r"C:\Users\LENOVO LOQ\Projects\sublime-fe\sublime-landing\public\pdf\pengetahuan-pendamping.pdf"

# A4 in mm
PAGE_W, PAGE_H = 210, 297
MARGIN_L, MARGIN_R = 22, 22
MARGIN_TOP, MARGIN_BOTTOM = 34, 26
CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R

TEAL = (49, 151, 165)
DARK = (31, 31, 31)


class BrandedPDF(FPDF):
    def header(self):
        if os.path.exists(BG_PATH):
            # Fill entire page with the branded background
            self.image(BG_PATH, x=0, y=0, w=PAGE_W, h=PAGE_H)

    def footer(self):
        pass


def paragraph(pdf: BrandedPDF, text: str, size: float = 10.5, bold: bool = False,
              italic: bool = False, line_h: float = 5.6, space_after: float = 3.0):
    style = ""
    if bold:
        style += "B"
    if italic:
        style += "I"
    pdf.set_font("Helvetica", style, size)
    pdf.set_text_color(*DARK)
    pdf.set_x(MARGIN_L)
    pdf.multi_cell(CONTENT_W, line_h, text)
    pdf.ln(space_after)


def h_subtitle(pdf: BrandedPDF, text: str):
    pdf.ln(1.5)
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(*TEAL)
    pdf.set_x(MARGIN_L)
    pdf.multi_cell(CONTENT_W, 6, text)
    pdf.ln(2)


def title(pdf: BrandedPDF, text: str):
    pdf.set_font("Helvetica", "B", 20)
    pdf.set_text_color(*DARK)
    pdf.set_x(MARGIN_L)
    pdf.multi_cell(CONTENT_W, 9, text)
    pdf.ln(4)


def main():
    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)

    pdf = BrandedPDF(orientation="P", unit="mm", format="A4")
    pdf.set_auto_page_break(auto=True, margin=MARGIN_BOTTOM)
    pdf.set_margins(MARGIN_L, MARGIN_TOP, MARGIN_R)
    pdf.add_page()

    # Start body a bit below the logo baked into the background
    pdf.set_y(MARGIN_TOP)

    title(pdf, "YANG PERLU ANDA PAHAMI")

    paragraph(pdf, (
        "Ada beberapa hal yang perlu Anda pahami saat memulai penyembuhan-mandiri "
        "(self-healing) dari stroke yang Anda alami. Audio Strovia tidak dapat "
        "menyembuhkan Anda dari stroke karena Anda sendirilah yang akan menyembuhkan "
        "diri sendiri. Audio Strovia hanya akan membantu membangkitkan kemampuan tubuh "
        "Anda untuk menyembuhkan dirinya sendiri dari stroke. Yang juga penting untuk "
        "dipahami adalah: Audio Strovia tidak dimaksudkan untuk menggantikan proses "
        "penyembuhan medis dalam bentuk apa pun yang sedang Anda jalani. Keduanya dapat "
        "berjalan beriringan dan saling mendukung untuk mempercepat proses penyembuhan Anda."
    ))

    paragraph(pdf, (
        "Tubuh Anda adalah mesin organik ajaib yang mampu menyembuhkan dirinya sendiri "
        "sehingga Anda seharusnya tidak pernah mengalami penyakit."
    ))

    h_subtitle(pdf, "Pertanyaannya kemudian: Kenapa kita bisa mengalami penyakit?")

    paragraph(pdf, (
        "Berdasarkan pembelajaran dan pengalaman saya sepanjang hidup, semua penyakit "
        "yang kita alami disebabkan oleh ketidakseimbangan aliran energi di dalam tubuh. "
        "Aliran energi menjadi tidak seimbang disebabkan oleh sumbatan-sumbatan energi "
        "yang kita ciptakan sendiri tanpa sadar. Sumbatan-sumbatan ini tercipta karena "
        "kita sering kali mempertahankan energi yang seharusnya mengalir bebas melewati "
        "diri kita. Ini terjadi karena kita tidak sanggup memproses energi secara "
        "menyeluruh, membiarkannya bersirkulasi dan melewati sistem kita. Misalnya, "
        "ketika kita mengalami sebuah pengalaman traumatis, kita tidak membiarkan energi "
        "dari pengalaman tersebut melewati kita. Kita tidak bisa letting it go. "
        "Alih-alih, kita menyimpan memori dari pengalaman traumatis tersebut di dalam "
        "diri kita. Memori mengandung energi, dan energi yang negatif dari pengalaman "
        "traumatis tersebut akhirnya menjadi sumbatan energi dan pada akhirnya "
        "termanifestasi menjadi penyakit."
    ))

    paragraph(pdf, (
        "Emosi-emosi negatif seperti amarah, sakit hati, kekecewaan, ketakutan, dan "
        "kecemasan yang muncul ketika pengalaman traumatis terjadi tidak kita hadapi "
        "sepenuhnya sampai selesai. Banyak dari kita yang cenderung \"melarikan diri\" "
        "dari masalah. Kita tidak berani menghadapi emosi-emosi negatif yang muncul "
        "karena rasanya memang tidak mengenakkan. Emosi (e-motion) adalah energi yang "
        "mengalir (energy in motion). Alhasil, energi tersebut tidak mengalir melewati "
        "sistem kita. Kita tidak memprosesnya sampai tuntas sehingga energi tersebut "
        "bertahan di dalam tubuh kita dan menjadi sumbatan aliran energi yang "
        "menyebabkan penyakit."
    ))

    paragraph(pdf, (
        "Anda harus berani menghadapi masalah apa pun yang terjadi dalam hidup Anda, "
        "menjalani hidup dengan kesadaran penuh, agar sumbatan-sumbatan energi di dalam "
        "diri Anda terlepas dan energi kembali mengalir lancar, dan ini pada gilirannya "
        "akan membuat penyakit-penyakit yang disebabkan olehnya pun turut terlepas. Ada "
        "beberapa buku yang bisa membantu Anda untuk melakukan praktik pelepasan energi "
        "negatif, yang bisa Anda temukan di halaman artikel."
    ))

    paragraph(pdf, (
        "Dan yang terakhir tapi terpenting dari keseluruhan proses pemulihan Anda, "
        "adalah: apapun metode/cara pemulihan yang Anda pilih, pada akhirnya yang "
        "membuatnya berhasil memulihkan Anda adalah keyakinan atau iman Anda sendiri. "
        "Anda harus memiliki iman bahwa Anda SUDAH sembuh saat ini, bukan nanti atau "
        "akan. Karena iman dan keyakinan Anda sendirilah yang menyembuhkan Anda, "
        "Strovia hanyalah sebuah media yang diperlukan bagi proses pemulihan Anda."
    ))

    pdf.output(OUT_PATH)
    print("OK:", OUT_PATH)


if __name__ == "__main__":
    main()
