import type { Metadata } from "next";
import "./globals.css";
import Header from "./header";

export const metadata: Metadata = {
  title: "Crypt Colors",
  description: "Learn about public key cryptography by mixing paint colors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
