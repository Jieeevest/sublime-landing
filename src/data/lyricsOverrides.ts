const SUBLIMINAL_STROKE_LYRICS: string[] = [
  "Aku menyatu dengan kecerdasan dalam pikiran bawah sadarku.",
  "Tubuhku dan seluruh organ-organnya di ciptakan oleh kecerdasan dalam pikiran bawah sadarku dan Ia tahu bagaimana menyembuhkan ku.",
  "Aku melepaskan semua tegangan, memori trauma, dan hambatan di sarafku; energi kesembuhan mengalir dengan lancar di dalam tubuhku.",
  "Aku berhenti melawan kondisiku, membuka diri sepenuhnya, dan membiarkan tubuhku melakukan keajaibannya.",
  "Setiap sumbatan mental, sumbatan batin dan sumbatan fisik ditransmutasi menjadi energi spritual yang lebih tinggi.",
  "Pikiran bawah sadarku adalah pencipta tubuhku; ia tahu persis cara memperbaiki jaringan otak, sel saraf, dan ototku.",
  "Aku selaras dengan frekuensi cinta; setiap sel otaku bergetar dalam energi kehidupan yang tinggi.",
  "Aku mensyukuri setiap kemajuan kecil sebagai pembuka pintu kesembuhan paripurmaku.",
  "Aku mentransmutasikan rasa takut, cemas dan semua energi negatif dalam diriku dan menetap di ruang kedamaian di mana kesembuhan adalah sifat alamiku.",
  "Kecerdasan bawah sadarku terus mengalirkan vitalitas, mengaktifkan kembali seluruh jalur saraf yang tertidur.",
  "Pemulihanku terjadi saat ini; aku hidup dalam perasaan bahwa aku sudah pulih sepenuhnya.",
  "Kaki dan tanganku kembali kokoh, lincah, bergerak bebas, mandiri, disertai suara yang jernih dan lancar.",
  "Otakku terhubung kembali secara sempurna; aku melihat diriku bergerak normal di layar pikiranku.",
  "Terima kasih karena apa yang aku rasakan di dalam batin kini bermanifestasi menjadi kenyataan fisik yang nyata.",
  "Setiap pesan ini adalah benih subur yang menciptakan sirkuit saraf baru yang jauh lebih kuat.",
  "Aku adalah cahaya, aku adalah energi, dan aku adalah kesehatan yang tak terhentikan.",
  "Daya penyembuh bawah sadarku bekerja otomatis 24 jam nonstop memulihkan koordinasi tubuhku, baik saat terjaga maupun saat tidur.",
  "Aku bersyukur atas proses penyembuhan yang terjadi sekarang, sungguh menakjubkan karya kecerdasan kreatif di dalam diriku.",
  "Aku menjadi utuh dan sempurna sesuai rancangan Ilahi.",
  "Semua terjadi dalam harmoni dan selaras sesuai tatanan Ilahi.",
];

export function getLyricsOverride(
  title: string | undefined | null,
): string[] | undefined {
  if (!title) return undefined;
  if (/stroke|pemulihan|recovery/i.test(title)) {
    return SUBLIMINAL_STROKE_LYRICS;
  }
  if (/ladang|awareness|field/i.test(title)) {
    return [];
  }
  return undefined;
}
