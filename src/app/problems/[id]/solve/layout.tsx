import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solve",
};

export default function SolveLayout({
                                      children,
                                    }: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
