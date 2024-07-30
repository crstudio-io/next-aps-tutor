import type { Metadata } from "next";
import "../styles/global.scss";
import Navigation from "@/components/navigation";
import Container from "react-bootstrap/Container";

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
    <body>
    <Navigation/>
    <Container>
      <div className="p-3">{children}</div>
    </Container>
    </body>
    </html>
  );
}
