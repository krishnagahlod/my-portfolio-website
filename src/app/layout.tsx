import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { LiveProvider } from "@/components/Live";
import { SmoothScroll } from "@/components/motion";
import Nav from "@/components/Nav";

const host = Host_Grotesk({ variable: "--font-host", subsets: ["latin"] });

const description =
  "Krishna Gahlod builds AI products and ships them. Founder of Golash, CTO at Tarashio, Chemical Engineering at IIT Bombay, previously at Accenture and Hinduja Group.";

export const metadata: Metadata = {
  metadataBase: new URL("https://krishna-gahlod.golash.in"),
  title: { default: "Krishna Gahlod, AI product builder", template: "%s | Krishna Gahlod" },
  description,
  openGraph: { title: "Krishna Gahlod, AI product builder", description, type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${host.variable} antialiased`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper">
          Skip to content
        </a>
        <SmoothScroll>
          <LiveProvider>
            <Nav />
            <main id="main">{children}</main>
          </LiveProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
