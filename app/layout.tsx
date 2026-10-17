import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STRYDE — Footwear for a brighter tomorrow",
  description:
    "Discover the latest sneakers and everyday essentials at STRYDE. Step into a brighter season.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
