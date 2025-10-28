import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saipien [LABS] – AI dev pods that ship production",
  description: "AI-accelerated dev pods that ship production in weeks — with enterprise discipline, security controls, and budget guardrails.",
  keywords: ["AI development", "dev pods", "90-day MVP", "integration-first", "enterprise AI", "governed AI"],
  authors: [{ name: "Saipien Labs" }],
  openGraph: {
    title: "Saipien [LABS] – AI dev pods that ship production",
    description: "90-Day MVPs. Integration-first. Governed.",
    type: "website",
    locale: "en_US",
    siteName: "Saipien Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saipien [LABS] – AI dev pods that ship production",
    description: "90-Day MVPs. Integration-first. Governed.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
