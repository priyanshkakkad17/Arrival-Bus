import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arrival Bus Pvt. Ltd. — Premium Bus Body Manufacturing",
  description: "Engineering safer, smarter and stronger bus bodies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
