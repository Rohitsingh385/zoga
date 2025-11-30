import FloatingButtons from "@/components/FloatingButtons";
import { ThemeProvider } from "@/lib/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zoga - Digital Agency",
  description:
    "Premium digital engineering lab building scalable web & mobile solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-[#030014] text-slate-900 dark:text-slate-100 transition-colors duration-500`}
      >
        <ThemeProvider defaultTheme="dark">
          {children}
          <FloatingButtons />
        </ThemeProvider>
      </body>
    </html>
  );
}
