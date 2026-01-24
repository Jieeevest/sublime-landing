"use client";

import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface ShareReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  referralLink: string;
}

export default function ShareReferralModal({
  isOpen,
  onClose,
  referralLink,
}: ShareReferralModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Link berhasil disalin!");
    setTimeout(() => setCopied(false), 2000);
  };

  const socialMedia = [
    {
      name: "Facebook",
      icon: (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
        >
          <circle cx="20" cy="20" r="20" fill="#1877F2" />
          <path
            d="M22.688 34V20.813H26.688L27.281 16.125H22.688V13.156C22.688 11.875 23.313 11.219 25.188 11.219H27.375V7.125C27.375 7.125 25.469 6.813 23.688 6.813C19.938 6.813 17.5 9.063 17.5 13.063V16.125H13.75V20.813H17.5V34H22.688Z"
            fill="white"
          />
        </svg>
      ),
      action: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
          "_blank",
        ),
    },
    {
      name: "Instagram",
      icon: (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
        >
          <defs>
            <linearGradient
              id="instagram-gradient"
              x1="0"
              y1="0"
              x2="40"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#833AB4" />
              <stop offset="0.5" stopColor="#FD1D1D" />
              <stop offset="1" stopColor="#F77737" />
            </linearGradient>
            <radialGradient
              id="instagram-radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(10.5 35) rotate(-45) scale(35 35)"
            >
              <stop stopColor="#FFDC80" />
              <stop offset="0.2" stopColor="#FCAF45" />
              <stop offset="0.4" stopColor="#F77737" />
              <stop offset="0.6" stopColor="#F56040" />
              <stop offset="0.8" stopColor="#FD1D1D" />
              <stop offset="1" stopColor="#E1306C" />
            </radialGradient>
          </defs>
          <circle cx="20" cy="20" r="20" fill="url(#instagram-radial)" />
          <path
            d="M20 10C17.284 10 16.944 10.012 15.877 10.06C14.811 10.109 14.084 10.279 13.447 10.526C12.789 10.781 12.232 11.127 11.676 11.683C11.12 12.239 10.774 12.796 10.519 13.454C10.271 14.091 10.102 14.818 10.053 15.884C10.004 16.951 9.993 17.291 9.993 20.007C9.993 22.723 10.004 23.063 10.053 24.13C10.102 25.196 10.271 25.923 10.519 26.56C10.774 27.218 11.12 27.775 11.676 28.331C12.232 28.887 12.789 29.233 13.447 29.488C14.084 29.736 14.811 29.905 15.877 29.954C16.944 30.003 17.284 30.014 20 30.014C22.716 30.014 23.056 30.003 24.123 29.954C25.189 29.905 25.916 29.736 26.553 29.488C27.211 29.233 27.768 28.887 28.324 28.331C28.88 27.775 29.226 27.218 29.481 26.56C29.729 25.923 29.898 25.196 29.947 24.13C29.996 23.063 30.007 22.723 30.007 20.007C30.007 17.291 29.996 16.951 29.947 15.884C29.898 14.818 29.729 14.091 29.481 13.454C29.226 12.796 28.88 12.239 28.324 11.683C27.768 11.127 27.211 10.781 26.553 10.526C25.916 10.279 25.189 10.109 24.123 10.06C23.056 10.012 22.716 10 20 10ZM20 11.816C22.67 11.816 22.986 11.826 24.041 11.874C25.016 11.919 25.545 12.082 25.897 12.219C26.364 12.4 26.697 12.617 27.047 12.967C27.397 13.317 27.613 13.65 27.795 14.117C27.932 14.47 28.095 14.998 28.14 15.973C28.188 17.028 28.199 17.344 28.199 20.014C28.199 22.684 28.188 23 28.14 24.055C28.095 25.03 27.932 25.558 27.795 25.911C27.613 26.378 27.397 26.711 27.047 27.061C26.697 27.411 26.364 27.627 25.897 27.809C25.545 27.946 25.016 28.109 24.041 28.154C22.986 28.202 22.67 28.212 20 28.212C17.33 28.212 17.014 28.202 15.959 28.154C14.984 28.109 14.455 27.946 14.103 27.809C13.636 27.627 13.303 27.411 12.953 27.061C12.603 26.711 12.387 26.378 12.205 25.911C12.068 25.558 11.905 25.03 11.86 24.055C11.812 23 11.801 22.684 11.801 20.014C11.801 17.344 11.812 17.028 11.86 15.973C11.905 14.998 12.068 14.47 12.205 14.117C12.387 13.65 12.603 13.317 12.953 12.967C13.303 12.617 13.636 12.4 14.103 12.219C14.455 12.082 14.984 11.919 15.959 11.874C17.014 11.826 17.33 11.816 20 11.816ZM20 14.882C17.17 14.882 14.875 17.177 14.875 20.007C14.875 22.837 17.17 25.132 20 25.132C22.83 25.132 25.125 22.837 25.125 20.007C25.125 17.177 22.83 14.882 20 14.882ZM20 23.316C18.173 23.316 16.691 21.834 16.691 20.007C16.691 18.18 18.173 16.698 20 16.698C21.827 16.698 23.309 18.18 23.309 20.007C23.309 21.834 21.827 23.316 20 23.316ZM25.398 13.434C25.398 14.102 24.856 14.644 24.188 14.644C23.52 14.644 22.978 14.102 22.978 13.434C22.978 12.766 23.52 12.224 24.188 12.224C24.856 12.224 25.398 12.766 25.398 13.434Z"
            fill="white"
          />
        </svg>
      ),
      action: () => alert("Share to Instagram"),
    },
    {
      name: "Whatsapp",
      icon: (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
        >
          <circle cx="20" cy="20" r="20" fill="#25D366" />
          <path
            d="M11.666 28.5L12.33 26.248C11.192 24.312 10.666 22.054 10.824 19.742C11.166 14.734 15.346 10.742 20.354 10.428C25.666 10.096 30.166 14.312 30.166 19.666C30.166 24.782 26.014 28.934 20.9 28.934C18.802 28.934 16.892 28.272 15.242 27.248L11.666 28.5ZM20.898 27.276C22.68 27.276 24.302 26.568 25.532 25.338C26.762 24.108 27.47 22.486 27.47 20.704C27.47 17.078 24.524 14.132 20.898 14.132C17.272 14.132 14.326 17.078 14.326 20.704C14.326 22.25 14.864 23.636 15.702 24.802L15.114 26.502L16.88 25.962C17.988 26.684 19.346 27.276 20.898 27.276Z"
            fill="white"
          />
          <path
            d="M23.973 23.472C23.837 23.404 23.09 23.036 22.953 22.992C22.817 22.948 22.717 22.926 22.617 23.076C22.517 23.226 22.23 23.564 22.143 23.664C22.056 23.764 21.969 23.776 21.833 23.708C21.697 23.64 21.258 23.496 20.737 23.032C20.316 22.658 20.032 22.196 19.945 22.046C19.858 21.896 19.936 21.815 20.004 21.748C20.065 21.687 20.141 21.589 20.209 21.511C20.277 21.433 20.301 21.377 20.346 21.289C20.391 21.201 20.369 21.123 20.332 21.048C20.295 20.973 19.995 20.236 19.87 19.936C19.748 19.643 19.625 19.683 19.538 19.683C19.458 19.683 19.366 19.682 19.274 19.682C19.182 19.682 19.032 19.717 18.907 19.853C18.782 19.989 18.428 20.321 18.428 20.997C18.428 21.673 18.919 22.326 18.989 22.419C19.059 22.512 19.98 23.94 21.408 24.544C22.597 25.048 22.84 24.948 23.09 24.924C23.34 24.9 23.882 24.606 23.994 24.288C24.106 23.97 24.106 23.7 24.069 23.638C24.032 23.576 23.935 23.54 23.799 23.472H23.973Z"
            fill="white"
          />
        </svg>
      ),
      action: () =>
        window.open(
          `https://wa.me/?text=${encodeURIComponent(referralLink)}`,
          "_blank",
        ),
    },
    {
      name: "X",
      icon: (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
        >
          <circle cx="20" cy="20" r="20" fill="black" />
          <path
            d="M12.5 12.5L18.4444 20.4444L12.5 27.5H13.8444L18.9778 21.3778L23.1556 27.5H27.5L21.3333 18.6667L26.8444 12.5H25.5L20.8 17.7333L16.8444 12.5H12.5ZM14.4778 13.5H16.5778L25.5222 26.5H23.4222L14.4778 13.5Z"
            fill="white"
          />
        </svg>
      ),
      action: () =>
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}`,
          "_blank",
        ),
    },
    {
      name: "Telegram",
      icon: (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
        >
          <circle cx="20" cy="20" r="20" fill="#2AABEE" />
          <path
            d="M28.025 12.35L10.375 19.158C9.171 19.642 9.178 20.312 10.155 20.612L14.688 22.028L25.176 15.41C25.672 15.11 26.126 15.275 25.753 15.606L17.258 23.272H17.253L17.258 23.275L20.377 26.319C20.732 26.66 21.006 26.47 21.492 26.38L27.653 24.125C28.271 23.902 28.595 23.513 28.441 22.784L28.025 12.35Z"
            fill="white"
          />
        </svg>
      ),
      action: () =>
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(referralLink)}`,
          "_blank",
        ),
    },
    {
      name: "LinkedIn",
      icon: (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
        >
          <circle cx="20" cy="20" r="20" fill="#0077B5" />
          <path
            d="M12 17H15V28H12V17ZM13.5 12C14.4 12 15 12.6 15 13.5C15 14.4 14.4 15 13.5 15C12.6 15 12 14.4 12 13.5C12 12.6 12.6 12 13.5 12ZM17 17H20V18.5H20.1C20.5 17.8 21.4 17 22.8 17C25.8 17 26.5 19 26.5 21.6V28H23.5V22C23.5 20.6 23.2 19.6 22 19.6C21.1 19.6 20.5 20.2 20.3 20.8V28H17V17Z"
            fill="white"
          />
        </svg>
      ),
      action: () =>
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
          "_blank",
        ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-[32px] w-full max-w-[600px] p-8 shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Header Icon */}
          <div className="w-20 h-20 text-[#3197A5] mb-6 relative">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="25" cy="25" r="15" fill="#3197A5" />
              <circle cx="55" cy="20" r="12" fill="#3197A5" />
              <circle cx="55" cy="55" r="12" fill="#3197A5" />
              <line
                x1="25"
                y1="25"
                x2="55"
                y2="20"
                stroke="#3197A5"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <line
                x1="25"
                y1="25"
                x2="55"
                y2="55"
                stroke="#3197A5"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-[#1E1E1E] mb-2">
            Bagikan Kode Referral
          </h2>
          <p className="text-gray-500 mb-8 max-w-sm">
            Ajak temanmu bergabung dan dapatkan Rp25.000 setiap bulan selama
            mereka berlangganan.
          </p>

          {/* Link Section */}
          <div className="w-full relative mb-8">
            <span className="absolute -top-3 left-4 bg-white px-2 text-xs text-gray-400">
              Link Referral
            </span>
            <div className="flex items-center w-full border border-dashed border-gray-300 rounded-xl px-4 py-4">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="flex-1 text-gray-600 outline-none text-sm font-medium bg-transparent truncate mr-4"
              />
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[#3197A5] text-sm font-medium hover:text-[#288a96] transition-colors"
              >
                {copied ? "Copied" : "Copy"}
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Social Share Section */}
          <div className="w-full text-left">
            <h4 className="text-sm font-bold text-[#1E1E1E] mb-4">
              Bagikan ke
            </h4>
            <div className="flex justify-between items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {socialMedia.map((social, idx) => (
                <button
                  key={idx}
                  onClick={social.action}
                  className="flex flex-col items-center gap-2 group min-w-[64px]"
                >
                  <div className="transform group-hover:scale-110 transition-transform duration-200">
                    {social.icon}
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                    {social.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
