"use client";

import { createContext, useContext, useState } from "react";

type Lang = "id" | "en";

type Dict = Record<string, Record<string, string>>;

const dict: Dict = {
  id: {
    cmsTitle: "Admin CMS",
    menu_dashboard: "Dashboard",
    menu_article: "Artikel",
    menu_audio: "Audio",
    menu_subscriptions: "Subs",
    menu_affiliates: "Affiliates",
    menu_prompts: "Prompts",
    add_title: "Tambah Artikel Baru",
    add_subtitle: "Tambahkan konten artikel edukasi baru",
    add_formTitle: "Form Artikel Baru",
    edit_title: "Edit Artikel",
    edit_subtitle: "Perbarui konten artikel",
    edit_formTitle: "Form Edit Artikel",
    view_detailTitle: "Detail Artikel",
    view_subtitle: "Pratinjau konten artikel",
    view_back: "Kembali",
    view_edit: "Edit",
    info_title: "Informasi",
    status_published: "Published",
    status_draft: "Draft",
    info_category: "Kategori",
    info_created: "Dibuat",
    info_updated: "Diperbarui",
    tags_title: "Tags",
    tags_empty: "Tidak ada tags",
    seo_title: "SEO",
    seo_title_label: "SEO Title",
    seo_desc_label: "SEO Description",
    list_title: "Artikel",
    list_subtitle: "Kelola artikel dan konten edukasi",
    list_search_placeholder: "Cari artikel...",
    list_add_button: "Tambah Artikel",
    untitled: "Tanpa Judul",
    form_title_label: "Judul Artikel",
    form_category_label: "Kategori",
    form_category_placeholder: "Pilih Kategori",
    form_excerpt_label: "Excerpt (Ringkasan Singkat)",
    form_excerpt_placeholder: "Ringkasan singkat artikel...",
    form_body_label: "Konten Artikel (Body)",
    form_body_placeholder: "Tulis konten artikel di sini...",
    form_cover_label: "Cover Image",
    form_tags_label: "Tags (Pisahkan dengan koma)",
    form_tags_placeholder: "Contoh: kesehatan, mental, tips",
    form_featured_label: "Artikel Pilihan",
    form_publish_label: "Terbitkan",
    form_cancel_button: "Batal",
    form_save_button: "Simpan Artikel",
    seo_settings_title: "Pengaturan SEO",
    table_thumbnail: "Thumbnail",
    table_title_desc: "Judul & Deskripsi",
    table_category: "Kategori",
    table_status: "Status",
    table_action: "Aksi",
    empty_no_data: "Tidak ada data.",
    action_view: "Lihat",
    action_edit: "Edit",
    action_post: "Terbitkan",
    action_unpost: "Batalkan Terbit",
    action_delete: "Hapus",
    common_loading: "Memuat...",
    common_success: "Berhasil!",
    common_deleted: "Terhapus!",
    breadcrumb_home: "Beranda",
    unknown: "Tidak Dikenal",
    unknown_user: "Pengguna Tidak Dikenal",
    unknown_plan: "Paket Tidak Dikenal",
    affiliates_title: "Manajemen Afiliasi",
    affiliates_subtitle: "Pantau afiliasi dan kelola pembayaran",
    affiliates_table_user: "Pengguna Afiliasi",
    affiliates_table_referral_code: "Kode Rujukan",
    affiliates_table_total_referrals: "Total Rujukan",
    affiliates_table_commission: "Komisi Diperoleh",
    affiliates_table_balance: "Saldo",
    affiliates_table_actions: "Aksi",
    affiliates_none: "Tidak ada afiliasi",
    affiliates_payout_process: "Proses Pembayaran",
    affiliates_payout_tbi: "Fitur pembayaran akan diterapkan",
    affiliates_payout_confirm: "Proses payout untuk afiliasi ini?",
    affiliates_payout_success: "Payout berhasil diproses",
    affiliates_payout_failed: "Gagal memproses payout",
    subscriptions_title: "Manajemen Langganan",
    subscriptions_subtitle: "Kelola langganan pengguna dan paket harga",
    subscriptions_tab_subscribers: "Daftar Pelanggan",
    subscriptions_tab_plans: "Manajemen Paket",
    subscriptions_table_user: "Pengguna",
    subscriptions_table_plan: "Paket",
    subscriptions_table_status: "Status",
    subscriptions_table_start: "Tanggal Mulai",
    subscriptions_table_next_billing: "Tagihan Berikutnya",
    subscriptions_unknown_user: "Pengguna Tidak Dikenal",
    subscriptions_unknown_plan: "Paket Tidak Dikenal",
    subscriptions_none: "Tidak ada langganan",
    plans_create_button: "+ Buat Paket Baru",
    plans_loading: "Memuat Paket...",
    plans_confirm_delete: "Yakin ingin menghapus paket ini?",
    plans_delete_failed: "Gagal menghapus paket",
    audio_title: "Manajemen Audio",
    audio_subtitle: "Kelola konten audio dan track",
    audio_search_placeholder: "Cari audio...",
    audio_add_button: "Tambah Audio",
    audio_loading: "Memuat Data...",
    audio_success_status_updated: "Status berhasil diperbarui.",
    audio_deleted_success: "Audio berhasil dihapus.",
    audio_confirm_unpublish: "Batalkan publikasi audio ini?",
    audio_confirm_publish: "Publikasikan audio ini?",
    audio_action_failed: "Aksi gagal",
    audio_delete_confirm: "Yakin ingin menghapus audio ini?",
    audio_delete_failed: "Gagal menghapus",
    audio_add_page_title: "Tambah Audio Baru",
    audio_add_page_subtitle: "Tambahkan konten audio baru ke perpustakaan",
    audio_form_new_title: "Form Audio Baru",
    audio_add_success: "Audio berhasil ditambahkan!",
    audio_add_failed: "Gagal menambahkan audio",
    audio_edit_page_title: "Edit Audio",
    audio_edit_page_subtitle: "Perbarui detail konten audio",
    audio_form_edit_title: "Form Edit Audio",
    audio_update_success: "Audio berhasil diperbarui!",
    audio_update_failed: "Gagal memperbarui audio",
    audio_form_label_title: "Judul Audio",
    audio_form_placeholder_title: "Contoh: Deep Focus",
    audio_form_label_subtitle: "Subtitle",
    audio_form_placeholder_subtitle: "Contoh: Musik untuk fokus bekerja",
    audio_form_label_category: "Kategori",
    audio_form_select_category: "Pilih Kategori",
    audio_form_label_frequency: "Frekuensi",
    audio_form_placeholder_frequency: "Contoh: 528Hz",
    audio_form_label_description: "Deskripsi",
    audio_form_placeholder_description:
      "Deskripsi singkat tentang audio ini...",
    audio_form_label_audio_file: "File Audio",
    audio_form_current: "Saat ini",
    audio_form_label_thumbnail: "Thumbnail",
    audio_form_alt_current_thumbnail: "Thumbnail saat ini",
    audio_form_label_duration: "Durasi",
    audio_form_placeholder_duration: "Contoh: 15:00",
    audio_form_label_premium: "Konten Premium",
    audio_form_button_cancel: "Batal",
    audio_form_button_save: "Simpan Audio",
    audio_form_submit_failed: "Terjadi kesalahan saat menyimpan data",
    dashboard_title: "Dashboard Admin",
    dashboard_subtitle: "Ringkasan performa platform",
    dashboard_card_total_users: "Total Pengguna",
    dashboard_card_active_subs: "Langganan Aktif",
    dashboard_card_total_revenue: "Pendapatan (Total)",
    dashboard_card_total_audios: "Total Audio",
    dashboard_revenue_trend: "Grafik Pendapatan",
    dashboard_top_audios: "Audio Teratas",
    dashboard_recent_users: "Pengguna Terbaru",
    dashboard_plays_suffix: "pemutaran",
    dashboard_empty_data: "Tidak ada data",
    ud_search_placeholder: "Cari",
    ud_subscribe_start: "Mulai Berlangganan",
    // Dashboard Hero
    dash_hero_badge: "Pilihan Bahasa Audio",
    dash_hero_title: "Program Audio Yang Memicu Pemulihan Mandiri Pasca Stroke",
    dash_hero_desc:
      "Strovia menghadirkan audio afirmasi subliminal yang berbasis frekuensi 528Hz yang memicu pemulihan mandiri.",
    dash_hero_stats: "Digunakan oleh 1,809 Pengguna | Update Februari 2026",
    // End Dashboard Hero
    // Dashboard Audio List
    dash_audio_title: "Audio Strovia untuk Anda",
    dash_audio_sub_msg: "Silakan berlangganan untuk menikmati audio",
    dash_audio_sub_btn: "Berlangganan Sekarang",
    dash_audio_empty_title: "Belum ada audio saat ini",
    dash_audio_empty_desc: "Nantikan audio pilihan menarik untuk Anda segera.",
    // Dashboard Articles
    dash_articles_title: "Artikel terkait",
    dash_articles_view_all: "Lihat Semua",
    dash_articles_loading: "Memuat artikel...",
    dash_articles_empty_title: "Belum ada artikel saat ini",
    dash_articles_empty_desc:
      "Nantikan artikel menarik seputar kesehatan dan audio therapy segera.",
    // End Dashboard Items
    ud_menu_articles: "Artikel",
    ud_articles_label: "Artikel",
    ud_articles_loading: "Memuat artikel...",
    ud_articles_empty_title: "Belum ada artikel",
    ud_articles_empty_desc:
      "Silakan kembali lagi nanti untuk membaca artikel terbaru kami.",
    ud_menu_ai_chat: "AI Chat",
    ai_new_chat: "Obrolan Baru",
    ai_search_chats_placeholder: "Cari Obrolan",
    ai_sidebar_your_chats: "Obrolan Anda",
    ai_delete_chat: "Hapus Obrolan",
    ai_robot_alt: "Robot AI",
    ai_hero_hi: "Hai",
    ai_hero_question: "Ada yang bisa saya bantu?",
    ai_hero_desc:
      "Siap membantu kapanpun Anda butuh dukungan informasi dan diskusi.",
    ai_suggestion_1: "Rekomendasikan audio terapi yang cocok untuk kondisiku.",
    ai_suggestion_2:
      "Apa yang harus saya lakukan saat merasa cemas atau tidak stabil?",
    ai_suggestion_3:
      "Jelaskan manfaat subliminal message untuk pemulihan stroke.",
    ai_input_placeholder: "Tanya apapun...",
    ai_dummy_1: "Lorem ipsum dolor sit amet consectetur. Eu ri...",
    ai_dummy_2: "Lorem ipsum dolor sit amet consectetur. Aug...",
    ai_dummy_3: "Apa yang harus saya lakukan saat merasa ce...",
    ai_dummy_4: "Lorem ipsum dolor sit amet consectetur. Con...",
    ai_dummy_5: "Lorem ipsum dolor sit amet consectetur. In vit...",
    ai_dummy_6: "Lorem ipsum dolor sit amet consectetur. Habi...",
    ai_locked_title: "Fitur Premium Terkunci",
    ai_locked_desc:
      "Silakan berlangganan untuk membuka akses ke AI Chat (Dokter Via) dan mulai diskusikan proses pemulihan Anda.",
    ai_locked_btn: "Berlangganan Sekarang",

    // Promo Cards
    promo_berlangganan: "Berlangganan",
    promo_nikmati: "Nikmati 30 hari hanya",
    promo_price: "Rp.138,000,-",
    promo_akses: "Untuk mengakses",
    promo_audio_strovia: "Audio Strovia",
    promo_desc:
      "Tanpa perpanjangan otomatis. Tidak ada autodebet. Kamu tetap sepenuhnya mengontrol proses berlanggananmu.",
    promo_btn: "Mulai Berlangganan",
    promo_chat_title:
      "Butuh bimbingan dan dukungan informasi sepanjang proses pemulihan diri anda?",
    promo_chat_desc: "Diskusi dengan Dokter Via kapan saja.",
    promo_chat_btn: "Chat Sekarang",

    // Subscription Page
    subs_header_title:
      "Ayo mulai perjalanan proses pemulihan mandiri stroke Anda bersama Strovia",
    subs_header_subtitle: "Bayar dengan berbagai cara. Batalkan kapan saja.",
    subs_payment_others: "+4 lainnya",
    subs_card_popular: "Populer",
    subs_card_price: "Rp 138.000",
    subs_card_period: "per 30 hari",
    subs_feat_1: "Akses semua audio",
    subs_feat_2: "Chat AI",
    subs_feat_3: "Artikel eksklusif",
    subs_feat_4: "Tanpa autodebet",

    // ─── Landing page ──────────────────────────────────────────────
    // Navbar
    nav_tentang: "Tentang Kami",
    nav_cara_kerja: "Cara Kerja",
    nav_manfaat: "Manfaat",
    nav_artikel: "Artikel",
    nav_faq: "FAQ",
    nav_login: "Masuk / Daftar",
    nav_logout: "Keluar",
    // Hero
    hero_heading:
      "Audio subliminal yang di set pada frekuensi 528HZ yang memicu pemulihan mandiri bagi penderita stroke.",
    hero_cta_primary: "Mulai Perjalanan Anda",
    hero_cta_secondary: "Unduh Aplikasi",
    hero_audio_label: "Audio Pilihan untuk Anda",
    hero_audio_see_all: "Lihat Semua",
    hero_audio_title: "Audio Strovia Versi Bahasa Indonesia",
    hero_audio_desc:
      "Pikiranku mulai pulih. Tubuhku ingat cara memulihkan diri.",
    hero_affirmation_title: "Audio Subliminal Strovia",
    hero_affirm_1: "Pikiranku mulai pulih.",
    hero_affirm_2: "Tubuhku ingat cara memulihkan diri.",
    hero_affirm_3: "Aku semakin kuat setiap hari.",
    // WhatIsSublime
    about_badge: "Tentang Kami",
    about_heading: "Apa itu Strovia?",
    about_desc:
      "Strovia adalah produk audio subliminal berbasis frekuensi khusus yang bertujuan untuk membangkitkan kemampuan pemulihan mandiri (self healing) dalam diri penderita stroke.",
    about_card1_title: "Audio Strovia 528 Hz",
    about_card1_desc:
      "Produk audio Strovia di set pada frekuensi khusus 528Hz, frejuensi yangmempengaruhi gelombang otak agar tubuh dapat mengalami relaksasi mendalam.",
    about_card1_audio_title: "Audio Strovia Versi Bahasa Indonesia",
    about_card1_audio_desc:
      "Pikiranku mulai pulih. Tubuhku ingat cara memulihkan diri.",
    about_card2_title: "Afirmasi Subliminal",
    about_card2_desc:
      'Afirmasi positif yang "disembunyikan" dalam gelombang audio sehingga dapat menembus pikiran sadar kemudia langsung diterima olaeh pikiran bawah sadar agar afirmasi tersebut dapat bekerja dengan efektif.',
    about_card3_title: "Pendamping AI Personal",
    about_card3_desc:
      "Layanan informasi berbasis AI yang siap memberikan segala informasi yang Anda butuhkan.",
    about_ai_greeting: "Hi, Kiara",
    about_ai_question: "Ada yang bisa aku bantu hari ini?",
    about_ai_ready:
      "Siap mendampingi, kapanpun kamu butuh informasi dan panduan.",
    about_ai_suggestion:
      "Rekomendasikan audio terapi yang cocok untuk kondisiku.",
    about_ai_placeholder: "Tanya apapun...",
    // HowItSupports
    how_badge: "Cara Kerja",
    how_heading: "Bagaimana Strovia Membantu Proses Pemulihan Anda",
    how_card1_title: "Frekuensi 528 Hz",
    how_card1_body1:
      "Produk audio Strovia dirancang pada frekuensi 528Hz, dalam penelitian ilmiah (science) dan penelitian medis frekuensi ini telah dibuktikan dapat mempengaruhi gelombang otak untuk mengalami relaksasi yang mendalam yang otomatis dapat menenangkan sistem syaraf, menurunkan stres, menciptakan ketenangan dan kesimbangan dalam tubuh.",
    how_card1_body2:
      "Studi yang dipublikasikan di jurnal ilmiah dan dirujuk oleh National Institutes of Health (NIH) menunjukkan bahwa stimulasi audio dapat memengaruhi aktivitas otak dan membantu regulasi stres — faktor penting dalam pemulihan neurologis.",
    how_card1_nih: "National Institutes of Health (NIH)",
    how_card2_title: "Afirmasi Subliminal",
    how_card2_body1:
      "Dalam audio Strovia juga disematkan afirmasi (pesan) yang bersifat subliminal (tersembunyi), dimana pesan tersebut tidak terdengar pada frekuensi pendengaran norma manusia sehingga tidak tertangkap oleh pikiran sadar tapi dapat tertangkap oleh pikiran bawah sadar. Hal tersebut untuk menghindari resistansi (penolakan) oleh pikiran sadar tapi pesan tersebut dapat ditangkap sepenuhnya oleh pikiran bawah sadar, yaitu bagian dari pikiran (otak) yang 95% mengontrol aktifitas fisik bahkan kehidupan kita sehari hari.",
    how_card2_journal: "Frontiers in Human Neuroscience",
    how_card2_body2:
      "Penelitian di jurnal menunjukkan bahwa rangsangan subliminal dapat mengaktifkan area otak yang berhubungan dengan emosi dan motivasi. Sementara itu, publikasi dari Harvard Medical School menjelaskan bahwa pola pikir dan ekspektasi positif dapat memperkuat respons alami tubuh terhadap pemulihan.",
    how_card2_harvard: "Harvard Medical School",
    // KeyAdvantages
    adv_badge: "Manfaat",
    adv_heading: "Keunggulan Utama Strovia",
    adv_1_title: "Membuat otak (pikiran) & tubuh relaks",
    adv_1_desc:
      "Produk audio Strovia yang di set pada frekuensi 528Hz akan mempengaruhi otak dan tubuh untuk masuk dalam kondisi relaksasi yang mendalam sehingga kdeuanya dapat mencapai kesimbangan.",
    adv_2_title: "Memicu Pemulihan Mandiri",
    adv_2_desc:
      "Afirmasi (pesan) subliminal audio strovia akan memicu kemampuan tubuh kita untuk dapat memulihkan semua kerusakan akibat serangan stroke, baik secara neurologis, kemampuan motorik dll.",
    adv_3_title: "Dukungan Informasi",
    adv_3_desc:
      "Layanan informasi apapun yang berbasis teknologi AI terbaru akan selalu melayani kebutuhan Anda akan berbagai macam informasi yang Anda perlukan.",
    adv_4_title: "Biaya Yang Terjangkau & Penggunaan Yang sangat Mudah",
    adv_4_desc:
      "Satu paket dalam 30 hari, tanpa perpanjangan otomatis, sehingga Anda dapat mengatur proses berlangganan sesuai kebutuhan Anda. Juga aplikasi yang di rancang sedemikian rupa sehingga mudah digunakan oleh semua usia & khususnya penderita stroke.",
    // InsightsGuidance
    ig_badge: "Artikel",
    ig_heading: "Artikel Dan Informasi",
    ig_view_all: "Lihat Semua",
    ig_loading: "Memuat artikel...",
    ig_error: "Gagal memuat artikel. Silakan coba lagi nanti.",
    ig_empty: "Belum ada artikel yang tersedia.",
    // FAQ
    faq_badge: "FAQ",
    faq_heading: "Pertanyaan Umum tentang Strovia",
    faq_q1: "Apa itu Strovia ?",
    faq_a1:
      "Strovia adalah produk audio subliminal berbasis frekuensi khusus yang bertujuan untuk membangkitkan kemampuan pemulihan mandiri (self healing) dalam diri penderita stroke",
    faq_q2: "Untuk Siapa Strovia dibuat ?",
    faq_a2:
      "Strovia dibuat khusus bagi Anda yang mengalami serangan Stroke dan bertekad untuk pulih dari kondisi tersebut lewat kemampuan yang dimiliki oleh tubuh Anda untuk memulihkan dirinya sendiri.",
    faq_q3: "Berapa biaya untuk menggunakan Strovia ?",
    faq_a3:
      "Biaya paket berlangganan akses Strovia dapat Anda peroleh dengan jelas di halaman berlangganan dan paket tersebut tidak menggukan perpanjangan otomatis, sehingga Anda bisa menetukan kapan saja ingin berlangganan Strovia sesuai kebutuhan dan situasi Anda.",
    faq_q4:
      "Apakah saya bisa mendengarkan audio Strovia lebih dari sekali dalam sehari?",
    faq_a4:
      "Tidak ada batasan untuk berapa kali Anda dapat mendengarkan audio Strovia. Anda dapat mengatur sendiri berapa kali Anda ingin mendengarkan audio Strovia di saat yang memang kondusif bagi situasi Anda.",
    faq_q5: "Apakah Strovia dapat membantu kondisi stroke?",
    faq_a5:
      "Afirmasi dalam audio Strovua dirancang sedemikian rupa untuk dapat memicu pemulihan mandiri dari berbagai macam kondisi stroke yang Anda alami.",
    faq_q6: "Bagaimana cara kerja terapi subliminal ?",
    faq_a6:
      "Dalam audio Strovia juga disematkan afirmasi (pesan) yang bersifat subliminal (tersembunyi), dimana pesan tersebut tidak terdengar pada frekuensi pendengaran norma manusia sehingga tidak tertangkap oleh pikiran sadar tapi dapat tertangkap oleh pikiran bawah sadar. Hal tersebut untuk menghindari resistansi (penolakan) oleh pikiran sadar tapi pesan tersebut dapat ditangkap sepenuhnya oleh pikiran bawah sadar, yaitu bagian dari pikiran (otak) yang 95% mengontrol aktifitas fisik bahkan kehidupan kita sehari hari.",
    faq_q7: "Apakah saya memerlukan alat khusus ?",
    faq_a7:
      "Anda dapat menggunakan alat pemutar/ penyetel audio apapun, akan lebih baik bila Anda dapat menggunakan earphoene, earbud, headset dll. Tapi Media apapun tidak akan mengurangi fungsi dari Audio Strovia, selama audio dapat Anda dengarkan dengan nyaman dan jelas, itu sudah cukup efektif.",
    // CTASection
    cta_heading:
      "Selamat memulai perjalanan pemulihan mandiri Anda bersama Strovia",
    cta_primary: "Mulai Perjalanan Anda",
    cta_secondary: "Unduh Aplikasi",
  },
  en: {
    cmsTitle: "CMS Admin",
    menu_dashboard: "Dashboard",
    menu_article: "Articles",
    menu_audio: "Audio",
    menu_subscriptions: "Subs",
    menu_affiliates: "Affiliates",
    menu_prompts: "Prompts",
    add_title: "Add New Article",
    add_subtitle: "Add a new educational article",
    add_formTitle: "New Article Form",
    edit_title: "Edit Article",
    edit_subtitle: "Update article content",
    edit_formTitle: "Edit Article Form",
    view_detailTitle: "Article Detail",
    view_subtitle: "Preview article content",
    view_back: "Back",
    view_edit: "Edit",
    info_title: "Information",
    status_published: "Published",
    status_draft: "Draft",
    info_category: "Category",
    info_created: "Created",
    info_updated: "Updated",
    tags_title: "Tags",
    tags_empty: "No tags",
    seo_title: "SEO",
    seo_title_label: "SEO Title",
    seo_desc_label: "SEO Description",
    list_title: "Articles",
    list_subtitle: "Manage articles and educational content",
    list_search_placeholder: "Search articles...",
    list_add_button: "Add Article",
    untitled: "Untitled",
    form_title_label: "Article Title",
    form_category_label: "Category",
    form_category_placeholder: "Select Category",
    form_excerpt_label: "Excerpt",
    form_excerpt_placeholder: "Short article summary...",
    form_body_label: "Article Content (Body)",
    form_body_placeholder: "Write article content here...",
    form_cover_label: "Cover Image",
    form_tags_label: "Tags (Comma separated)",
    form_tags_placeholder: "Example: wellness, mental, tips",
    form_featured_label: "Featured Article",
    form_publish_label: "Publish",
    form_cancel_button: "Cancel",
    form_save_button: "Save Article",
    seo_settings_title: "SEO Settings",
    table_thumbnail: "Thumbnail",
    table_title_desc: "Title & Description",
    table_category: "Category",
    table_status: "Status",
    table_action: "Actions",
    empty_no_data: "No data.",
    action_view: "View",
    action_edit: "Edit",
    action_post: "Publish",
    action_unpost: "Unpublish",
    action_delete: "Delete",
    common_loading: "Loading...",
    common_success: "Success!",
    common_deleted: "Deleted!",
    breadcrumb_home: "Home",
    unknown: "Unknown",
    unknown_user: "Unknown User",
    unknown_plan: "Unknown Plan",
    affiliates_title: "Affiliate Management",
    affiliates_subtitle: "Track affiliates and manage payouts",
    affiliates_table_user: "Affiliate User",
    affiliates_table_referral_code: "Referral Code",
    affiliates_table_total_referrals: "Total Referrals",
    affiliates_table_commission: "Commission Earned",
    affiliates_table_balance: "Balance",
    affiliates_table_actions: "Actions",
    affiliates_none: "No affiliates found",
    affiliates_payout_process: "Process Payout",
    affiliates_payout_tbi: "Payout feature to be implemented",
    affiliates_payout_confirm: "Process payout for this affiliate?",
    affiliates_payout_success: "Payout processed successfully",
    affiliates_payout_failed: "Failed to process payout",
    subscriptions_title: "Subscription Management",
    subscriptions_subtitle: "Manage user subscriptions and pricing plans",
    subscriptions_tab_subscribers: "Subscribers List",
    subscriptions_tab_plans: "Plans Management",
    subscriptions_table_user: "User",
    subscriptions_table_plan: "Plan",
    subscriptions_table_status: "Status",
    subscriptions_table_start: "Start Date",
    subscriptions_table_next_billing: "Next Billing",
    subscriptions_unknown_user: "Unknown User",
    subscriptions_unknown_plan: "Unknown Plan",
    subscriptions_none: "No subscriptions found",
    plans_create_button: "+ Create New Plan",
    plans_loading: "Loading Plans...",
    plans_confirm_delete: "Are you sure you want to delete this plan?",
    plans_delete_failed: "Failed to delete plan",
    audio_title: "Audio Management",
    audio_subtitle: "Manage audio content and tracks",
    audio_search_placeholder: "Search audio...",
    audio_add_button: "Add Audio",
    audio_loading: "Loading Data...",
    audio_success_status_updated: "Status updated successfully.",
    audio_deleted_success: "Audio deleted successfully.",
    audio_confirm_unpublish: "Unpublish this audio?",
    audio_confirm_publish: "Publish this audio?",
    audio_action_failed: "Action failed",
    audio_delete_confirm: "Are you sure you want to delete this audio?",
    audio_delete_failed: "Delete failed",
    audio_add_page_title: "Add New Audio",
    audio_add_page_subtitle: "Add new audio content to library",
    audio_form_new_title: "New Audio Form",
    audio_add_success: "Audio added successfully!",
    audio_add_failed: "Failed to add audio",
    audio_edit_page_title: "Edit Audio",
    audio_edit_page_subtitle: "Update audio content details",
    audio_form_edit_title: "Edit Audio Form",
    audio_update_success: "Audio updated successfully!",
    audio_update_failed: "Failed to update audio",
    audio_form_label_title: "Audio Title",
    audio_form_placeholder_title: "Example: Deep Focus",
    audio_form_label_subtitle: "Subtitle",
    audio_form_placeholder_subtitle: "Example: Music for focusing at work",
    audio_form_label_category: "Category",
    audio_form_select_category: "Select Category",
    audio_form_label_frequency: "Frequency",
    audio_form_placeholder_frequency: "e.g. 528Hz",
    audio_form_label_description: "Description",
    audio_form_placeholder_description: "Short description about this audio...",
    audio_form_label_audio_file: "Audio File",
    audio_form_current: "Current",
    audio_form_label_thumbnail: "Thumbnail",
    audio_form_alt_current_thumbnail: "Current thumbnail",
    audio_form_label_duration: "Duration",
    audio_form_placeholder_duration: "e.g. 15:00",
    audio_form_label_premium: "Premium Content",
    audio_form_button_cancel: "Cancel",
    audio_form_button_save: "Save Audio",
    audio_form_submit_failed: "An error occurred while saving data",
    dashboard_title: "Admin Dashboard",
    dashboard_subtitle: "Overview of platform performance",
    dashboard_card_total_users: "Total Users",
    dashboard_card_active_subs: "Active Subs",
    dashboard_card_total_revenue: "Revenue (Total)",
    dashboard_card_total_audios: "Total Audios",
    dashboard_revenue_trend: "Revenue Trend",
    dashboard_top_audios: "Top Audios",
    dashboard_recent_users: "Recent Users",
    dashboard_plays_suffix: "plays",
    dashboard_empty_data: "No data available",
    ud_search_placeholder: "Search",
    ud_subscribe_start: "Start Subscription",
    // Dashboard Hero
    dash_hero_badge: "Audio Language Selection",
    dash_hero_title: "Post-Stroke Mental Support Audio Program",
    dash_hero_desc:
      "Strovia presents guided affirmation and relaxation audio based on a 528Hz frequency to help maintain calmness, strengthen focus, and build spirit during the recovery process.",
    dash_hero_stats: "Used by 1,809 Users | Updated February 2026",
    // End Dashboard Hero
    // Dashboard Audio List
    dash_audio_title: "Selected Audio for You",
    dash_audio_sub_msg: "Please subscribe to enjoy the audio",
    dash_audio_sub_btn: "Subscribe Now",
    dash_audio_empty_title: "No audio available currently",
    dash_audio_empty_desc: "Stay tuned for exciting curated audio coming soon.",
    // Dashboard Articles
    dash_articles_title: "Articles for Your Recovery",
    dash_articles_view_all: "View All",
    dash_articles_loading: "Loading articles...",
    dash_articles_empty_title: "No articles available currently",
    dash_articles_empty_desc:
      "Stay tuned for interesting articles on health and audio therapy soon.",
    // End Dashboard Items
    ud_menu_articles: "Articles",
    ud_articles_label: "Articles",
    ud_articles_loading: "Loading articles...",
    ud_articles_empty_title: "No articles yet",
    ud_articles_empty_desc: "Please check back later for our latest articles.",
    ud_menu_ai_chat: "AI Chat",
    ai_new_chat: "New Chat",
    ai_search_chats_placeholder: "Search Chats",
    ai_sidebar_your_chats: "Your Chats",
    ai_delete_chat: "Delete Chat",
    ai_robot_alt: "AI Robot",
    ai_hero_hi: "Hi",
    ai_hero_question: "How can I help you?",
    ai_hero_desc:
      "Ready to assist whenever you need information and discussion.",
    ai_suggestion_1: "Recommend therapy audio suitable for my condition.",
    ai_suggestion_2: "What should I do when I feel anxious or unstable?",
    ai_suggestion_3:
      "Explain the benefits of subliminal messages for stroke recovery.",
    ai_input_placeholder: "Ask anything...",
    ai_dummy_1: "Sample chat one...",
    ai_dummy_2: "Sample chat two...",
    ai_dummy_3: "Sample chat three...",
    ai_dummy_4: "Sample chat four...",
    ai_dummy_5: "Sample chat five...",
    ai_dummy_6: "Sample chat six...",
    ai_locked_title: "Premium Feature Locked",
    ai_locked_desc:
      "Please subscribe to unlock access to AI Chat (Doctor Via) and start discussing your recovery process.",
    ai_locked_btn: "Subscribe Now",

    // Promo Cards
    promo_berlangganan: "Subscribe",
    promo_nikmati: "Enjoy 30 days for only",
    promo_price: "Rp.138,000",
    promo_akses: "To access",
    promo_audio_strovia: "Audio Strovia",
    promo_desc:
      "No automatic renewal. No auto-debit. You stay fully in control of your subscription process.",
    promo_btn: "Start Subscription",
    promo_chat_title:
      "Need guidance and information support throughout your recovery process?",
    promo_chat_desc: "Discuss with Doctor Via anytime.",
    promo_chat_btn: "Chat Now",

    // Subscription Page
    subs_header_title:
      "Let's start your independent stroke recovery journey with Strovia",
    subs_header_subtitle: "Pay in multiple ways. Cancel anytime.",
    subs_payment_others: "+4 others",
    subs_card_popular: "Popular",
    subs_card_price: "Rp 138,000",
    subs_card_period: "per 30 days",
    subs_feat_1: "Access all audios",
    subs_feat_2: "AI Chat",
    subs_feat_3: "Exclusive articles",
    subs_feat_4: "No auto-debit",

    // ─── Landing page ──────────────────────────────────────────────
    // Navbar
    nav_tentang: "About Us",
    nav_cara_kerja: "How It Works",
    nav_manfaat: "Benefits",
    nav_artikel: "Articles",
    nav_faq: "FAQ",
    nav_login: "Sign In / Register",
    nav_logout: "Sign Out",
    // Hero
    hero_heading:
      "A subliminal audio set at 528 Hz frequency that triggers self-recovery for stroke patients.",
    hero_cta_primary: "Start Your Journey",
    hero_cta_secondary: "Download App",
    hero_audio_label: "Recommended Audio for You",
    hero_audio_see_all: "See All",
    hero_audio_title: "Strovia Audio — English Version",
    hero_audio_desc:
      "My mind is beginning to heal. My body remembers how to recover.",
    hero_affirmation_title: "Strovia Subliminal Audio",
    hero_affirm_1: "My mind is beginning to heal.",
    hero_affirm_2: "My body remembers how to recover.",
    hero_affirm_3: "I grow stronger every day.",
    // WhatIsSublime
    about_badge: "About Us",
    about_heading: "What is Strovia?",
    about_desc:
      "Strovia is a subliminal audio product based on a special frequency designed to awaken the self-healing ability within stroke patients.",
    about_card1_title: "Strovia Audio 528 Hz",
    about_card1_desc:
      "Strovia audio is set at the special 528 Hz frequency, which influences brainwaves to bring the body into a state of deep relaxation.",
    about_card1_audio_title: "Strovia Audio — English Version",
    about_card1_audio_desc:
      "My mind is beginning to heal. My body remembers how to recover.",
    about_card2_title: "Subliminal Affirmations",
    about_card2_desc:
      'Positive affirmations "hidden" within the audio waves so they can bypass conscious thought and be received directly by the subconscious mind, allowing them to work effectively.',
    about_card3_title: "Personal AI Companion",
    about_card3_desc:
      "An AI-powered information service ready to provide any information you need.",
    about_ai_greeting: "Hi, Kiara",
    about_ai_question: "How can I help you today?",
    about_ai_ready:
      "Here to assist you whenever you need information and guidance.",
    about_ai_suggestion: "Recommend therapy audio suitable for my condition.",
    about_ai_placeholder: "Ask anything...",
    // HowItSupports
    how_badge: "How It Works",
    how_heading: "How Strovia Supports Your Recovery Process",
    how_card1_title: "528 Hz Frequency",
    how_card1_body1:
      "Strovia audio is designed at the 528 Hz frequency. Scientific and medical research has proven that this frequency can influence brainwaves to achieve deep relaxation, automatically calming the nervous system, reducing stress, and creating peace and balance in the body.",
    how_card1_body2:
      "Studies published in scientific journals and referenced by the National Institutes of Health (NIH) show that audio stimulation can influence brain activity and help regulate stress — a critical factor in neurological recovery.",
    how_card1_nih: "National Institutes of Health (NIH)",
    how_card2_title: "Subliminal Affirmations",
    how_card2_body1:
      "Strovia audio also embeds subliminal affirmations (hidden messages) that are inaudible at normal human hearing frequencies. These messages bypass conscious awareness and are received directly by the subconscious mind — the part of the brain that controls 95% of our physical activities and daily life — avoiding resistance while maximizing effectiveness.",
    how_card2_journal: "Frontiers in Human Neuroscience",
    how_card2_body2:
      "Research in the journal shows subliminal stimulation can activate brain areas related to emotion and motivation. A publication from Harvard Medical School explains that positive mindsets and expectations can strengthen the body's natural healing response.",
    how_card2_harvard: "Harvard Medical School",
    // KeyAdvantages
    adv_badge: "Benefits",
    adv_heading: "Key Advantages of Strovia",
    adv_1_title: "Relaxes the Mind & Body",
    adv_1_desc:
      "Strovia audio set at 528 Hz influences the brain and body to enter a state of deep relaxation, allowing both to achieve balance.",
    adv_2_title: "Triggers Self-Recovery",
    adv_2_desc:
      "Strovia's subliminal audio affirmations trigger the body's ability to recover from all damage caused by stroke — neurologically, motor function, and more.",
    adv_3_title: "Information Support",
    adv_3_desc:
      "AI-powered information services are always ready to serve all your informational needs, whenever you need them.",
    adv_4_title: "Affordable & Very Easy to Use",
    adv_4_desc:
      "One package for 30 days, no auto-renewal, so you can manage your subscription as needed. The app is also designed to be easy to use for all ages — especially stroke patients.",
    // InsightsGuidance
    ig_badge: "Articles",
    ig_heading: "Articles & Information",
    ig_view_all: "See All",
    ig_loading: "Loading articles...",
    ig_error: "Failed to load articles. Please try again later.",
    ig_empty: "No articles available yet.",
    // FAQ
    faq_badge: "FAQ",
    faq_heading: "Frequently Asked Questions about Strovia",
    faq_q1: "What is Strovia?",
    faq_a1:
      "Strovia is a subliminal audio product based on a special frequency designed to awaken the self-healing ability within stroke patients.",
    faq_q2: "Who is Strovia made for?",
    faq_a2:
      "Strovia is made for those who have experienced a stroke and are determined to recover through their body's own healing ability.",
    faq_q3: "How much does Strovia cost?",
    faq_a3:
      "Subscription pricing is clearly listed on the subscription page, and there is no auto-renewal, so you can choose when to subscribe based on your needs and situation.",
    faq_q4: "Can I listen to Strovia audio more than once a day?",
    faq_a4:
      "There is no limit to how many times you can listen to Strovia audio. You can decide how often you want to listen at times that are most conducive to your situation.",
    faq_q5: "Can Strovia help with stroke recovery?",
    faq_a5:
      "The affirmations in Strovia audio are specifically designed to trigger self-recovery from various stroke conditions.",
    faq_q6: "How does subliminal therapy work?",
    faq_a6:
      "Strovia audio embeds subliminal affirmations (hidden messages) inaudible at normal human hearing frequencies, so they bypass conscious awareness and are received fully by the subconscious mind — the part that controls 95% of our physical activities and daily life.",
    faq_q7: "Do I need any special equipment?",
    faq_a7:
      "You can use any audio playback device. Using earphones, earbuds, or headsets is recommended, but any medium is fine — as long as the audio can be heard comfortably and clearly, it will be effective.",
    // CTASection
    cta_heading: "Begin your self-recovery journey with Strovia today",
    cta_primary: "Start Your Journey",
    cta_secondary: "Download App",
  },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  code: string;
};

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "id";
    const saved = localStorage.getItem("cms_lang");
    return saved === "en" || saved === "id" ? (saved as Lang) : "id";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("cms_lang", l);
  };

  const t = (key: string) => {
    const table = dict[lang] || dict.id;
    return table[key] ?? key;
  };

  const code = lang === "en" ? "EN" : "ID";

  return (
    <I18nCtx.Provider value={{ lang, setLang, t, code }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("I18nProvider missing");
  return ctx;
}
