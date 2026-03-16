import type { Metadata, Viewport } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import WelcomeScreen from "@/components/WelcomeScreen";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/auth/AuthProvider";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
});

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${leagueSpartan.variable} antialiased min-h-screen`}>
        <AuthProvider>
          <WelcomeScreen>
            <div className="min-h-screen flex flex-col">
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </WelcomeScreen>
        </AuthProvider>
      </body>
    </html>
  );
}
