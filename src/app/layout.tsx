import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { AuthProvider } from "@/providers/auth";
import { Footer } from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"] });
const baseUrl = process.env.HOST_URL;

export const metadata: Metadata = {
  title: "FSW Store Gaming",
  description: "Loja de informatica de Dev para Gamers.",
  openGraph: {
    title: "FSW Store Gaming",
    description: "Loja de informatica de Dev para Gamers.",
    images: [
      `${baseUrl}/_next/image?url=${encodeURI(
        "banner-home-01.png",
      )}&w=1920&q=95`,
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="mx-auto h-full w-full max-w-5xl">
            <div className="flex h-full flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
