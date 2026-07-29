import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "Bausalty (بوصالتي) | RIASEC College Major Alignment for Saudi Students",
  description:
    "Holland Code (RIASEC) personality-to-college-major recommendation engine for Saudi students. Discover top academic majors aligned with Saudi Vision 2030. Part of Tahseen AI Group.",
  keywords: [
    "Bausalty",
    "بوصالتي",
    "RIASEC",
    "Holland Code",
    "Saudi College Majors",
    "Saudi Vision 2030",
    "Tahseen AI Group",
    "Cybersecurity Major Saudi Arabia",
    "AI Major Saudi Arabia",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans selection:bg-yellow selection:text-ink border-t-4 border-teal">
        <ClientProviders>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
