import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Image with Overlay */}
      <div className="relative lg:w-1/2 min-h-[400px] lg:min-h-screen bg-gradient-to-br from-primary-300 via-primary to-primary-300">
        {/* Logo */}
        <div className="absolute top-8 left-8 z-20">
          <Link href="/">
            <Image
              src="/strovia-logo-white.png"
              alt="Strovia Logo"
              width={141}
              height={28}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Main Image */}
        <div className="relative w-full h-full">
          <Image
            src="/female-headphones.png"
            alt="Woman with headphones"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Decorative Wave Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />

        {/* Text Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 bg-gradient-to-t from-white/90 via-white/70 to-transparent backdrop-blur-sm">
          <h1 className="font-hero text-3xl lg:text-4xl font-bold text-secondary mb-2">
            {title}
          </h1>
          <p className="font-sans text-base lg:text-lg text-secondary/80">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-background">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
