import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solution",
};

export default function SolutionLayout({
                                         children,
                                       }: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
