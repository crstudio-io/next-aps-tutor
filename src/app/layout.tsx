import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | tutor.CRStudio.io",
    default: "Loading...",
  },
  description: "CRStudio.io APS Tutor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
