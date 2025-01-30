import type { Metadata } from "next";
import { Press_Start_2P as GameFont } from "next/font/google";
import "./globals.css";

const gameFont = GameFont({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "8-bit Chat",
  description: "A chat application with an 8-bit theme.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${gameFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
