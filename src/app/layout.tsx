import type { Metadata } from "next";
import { Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-naskh",
});

export const metadata: Metadata = {
  title: "بوصلتي | اكتشف تخصصك الأنسب للجامعات السعودية",
  description:
    "محرك تحديد الميول ومطابقة التخصصات الجامعية للطلاب والطالبات في المملكة العربية السعودية بما يتوافق مع رؤية ٢٠٣٠.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`h-full antialiased scroll-smooth ${notoNaskh.variable}`}>
      <body className="min-h-full flex flex-col bg-paper text-ink selection:bg-yellow selection:text-ink border-t-4 border-teal font-serif">
        <ClientProviders>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
