import React from "react";

type Variant = "primary" | "secondary" | "light";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  leadingIcon?: React.ReactNode;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  leadingIcon,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-[transform,box-shadow,background-color,color,border] duration-200 ease-out will-change-transform select-none focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 active:scale-95";

  const variantStyles: Record<Variant, string> = {
    primary:
      "bg-primary text-white hover:bg-primary-600 focus:ring-primary shadow-sm hover:shadow-md",
    secondary:
      "bg-white text-[#1F1F1F] border border-[#E1E1E1] hover:border-primary hover:text-primary focus:ring-primary shadow-sm hover:shadow-md",
    light:
      "bg-white/80 text-[#1F1F1F] backdrop-blur border border-white/50 hover:bg-white focus:ring-primary",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {leadingIcon ? (
        <span aria-hidden className="shrink-0">
          {leadingIcon}
        </span>
      ) : null}
      <span className="inline-flex items-center">{children}</span>
    </button>
  );
}
