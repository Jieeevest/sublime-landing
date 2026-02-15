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
