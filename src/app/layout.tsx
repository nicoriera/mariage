import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Dancing_Script, Poppins } from "next/font/google";
import Navigation from "../components/Navigation";
import GlobalErrorBoundary from "../components/GlobalErrorBoundary";
import SkipLink from "../components/SkipLink";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sandra & Nicolas - Notre Mariage | 21 Mai 2026 à Seignosse",
  description: "Confirmez votre présence pour notre mariage le 21 mai 2026 à 18h au Restaurant Le Surfing à Seignosse. Entre traditions basques et bretonnes, venez célébrer notre amour !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${dancingScript.variable} ${poppins.variable} antialiased`}
      >
        <GlobalErrorBoundary>
          <SkipLink />
          <Navigation />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}
