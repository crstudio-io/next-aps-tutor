import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions",
};

export default function SolutionsLayout({
                                          children,
                                        }: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
