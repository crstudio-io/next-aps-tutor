import type { Metadata } from "next";
import "@/styles/global.scss";
import Navigation from "@/components/navigation";
import Container from "react-bootstrap/Container";
import StoreProvider from "@/app/store-provider";

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
    <StoreProvider>
      <html lang="en">
      <body>
      <Navigation/>
      <Container className="mt-3">
        <div className="p-3">{children}</div>
      </Container>
      </body>
      </html>
    </StoreProvider>
  );
}
