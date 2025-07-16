import type { Metadata, Viewport } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import WelcomeScreen from "@/components/WelcomeScreen";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
})
export const metadata: Metadata = {
  title: "Entrepreneurship Club",
  description: "Empower, Execute, Excel.",
  openGraph: {
    title: "Entrepreneurship Club",
    description: "Empower, Execute, Excel.",
    url: "https://entrepreneurship-club.vercel.app",
    siteName: "Entrepreneurship Club",
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${leagueSpartan.variable} antialiased px-3`}
      >
        <WelcomeScreen >
          <Header />
          {children}
          <Footer />
        </WelcomeScreen>
      </body>
    </html>
  );
}
