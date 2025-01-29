import type { Metadata } from "next";
import { Press_Start_2P as GameFont } from "next/font/google";
import "./globals.css";

const gameFont = GameFont({
  weight: "400"
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
      <body
        className={`${gameFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
