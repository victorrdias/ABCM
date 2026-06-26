import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header/header";
import { AuthProvider } from "@/lib/auth/auth-context";
import { QueryProvider } from "@/components/providers/query-provider";
import { FirebaseAnalytics } from "@/components/providers/firebase-analytics";
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
  title: {
    default: "ABCM | Associação Brasileira de Cannabis Medicinal",
    template: "%s | ABCM",
  },
  description:
    "Associação que acolhe, orienta e facilita o acesso à cannabis medicinal com segurança e humanização.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <QueryProvider>
          <AuthProvider>
            <FirebaseAnalytics />
            <Header />
            <main className="flex-1">{children}</main>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
