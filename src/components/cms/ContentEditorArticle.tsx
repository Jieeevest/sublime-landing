"use client";

import Link from "next/link";
import { useState } from "react";

interface Breadcrumb {
  title: string;
  href: string;
}

interface ContentEditorArticleProps {
  payload: any;
  handleChange: (key: string, value: any) => void;
  onSave: () => void;
  onPost?: () => void;
  type: "add" | "edit";
  breadcrumbs: Breadcrumb[];
  isFormValid: boolean;
  showImageUpload?: boolean;
  showAdditionalFiles?: boolean;
  showTags?: boolean;
  showReferenceLink?: boolean;
  descriptionLabel?: string;
}

export default function ContentEditorArticle({
  payload,
  handleChange,
  onSave,
  onPost,
  type,
  breadcrumbs,
  isFormValid,
  showImageUpload,
  showReferenceLink,
  descriptionLabel = "Description",
}: ContentEditorArticleProps) {
  // Basic Image Upload Handler (Simulated or implementation needed)
  // For now, simple text input for URL or file input that sets URL (if we implement upload)
  // We'll stick to text inputs for simplicity unless requested otherwise

  return (
    <div className="space-y-6 py-6 px-10">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500">
        <ol className="list-reset flex text-gray-600">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={index} className="flex items-center">
              <Link
                href={breadcrumb.href}
                className="hover:text-primary transition-colors"
              >
                {breadcrumb.title}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <span className="mx-2">/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {type === "add" ? "Tambah Artikel" : "Edit Artikel"}
        </h2>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul Artikel *
          </label>
          <input
            type="text"
            value={payload.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            placeholder="Masukkan judul artikel"
          />
        </div>

        {/* Publish Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tanggal Publish *
          </label>
          <input
            type="date"
            value={
              payload.publish_date ? payload.publish_date.split("T")[0] : ""
            }
            onChange={(e) => handleChange("publish_date", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Image URL / Upload */}
        {showImageUpload && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail URL
            </label>
            <input
              type="text"
              value={payload.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              placeholder="https://example.com/image.jpg"
            />
            {payload.imageUrl && (
              <div className="mt-2 h-40 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <img
                  src={payload.imageUrl}
                  alt="Preview"
                  className="h-full w-full object-contain"
                />
              </div>
            )}
          </div>
        )}

        {/* Reference Link */}
        {showReferenceLink && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link Referensi
            </label>
            <input
              type="url"
              value={payload.referenceLink}
              onChange={(e) => handleChange("referenceLink", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              placeholder="https://..."
            />
          </div>
        )}

        {/* Description / Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {descriptionLabel}
          </label>
          <textarea
            value={payload.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary font-mono text-sm"
            placeholder="Tulis konten artikel di sini (Markdown supported)..."
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={onSave}
            disabled={!isFormValid}
            className={`px-6 py-2 rounded-lg font-medium text-white transition-colors ${
              isFormValid
                ? "bg-primary hover:bg-primary-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Simpan
          </button>
          {type === "edit" && onPost && (
            <button
              onClick={onPost}
              className="px-6 py-2 rounded-lg font-medium text-primary border border-primary hover:bg-primary-50 transition-colors"
            >
              {payload.status === "published" ? "Unpost" : "Post"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
