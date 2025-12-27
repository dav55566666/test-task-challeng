import type { Metadata } from "next";
import "./core/styles/globals.css";
import "./core/styles/style.scss"
import { HomeWrapper } from "./core";

export const metadata: Metadata = {
  title: "Discover And Create NFTs",
  description: "Discover, Create and Sell NFTs On Our NFT Marketplace With Over Thousands Of NFTs And Get a $20 bonus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HomeWrapper children={children} />
      </body>
    </html>
  );
}
