import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solve | tutor.CRStudio.io",
  description: "CRStudio.io APS Tutor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
