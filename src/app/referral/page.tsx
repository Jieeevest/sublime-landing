import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReferralLandingClient from "@/components/referral/ReferralLandingClient";

export const metadata: Metadata = {
  title: "Program Referral - Strovia",
  description:
    "Ajak teman ke Strovia dan dapatkan komisi 20% dari setiap pengguna yang mendaftar dan berlangganan melalui kode referralmu.",
};

export default function ReferralLandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <ReferralLandingClient />
      <Footer />
    </main>
  );
}
