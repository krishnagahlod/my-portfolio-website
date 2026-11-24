import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { CurtainProvider } from "@/components/Curtain";
import { LiveProvider } from "@/components/Live";
import { SmoothScroll } from "@/components/motion";
import Nav from "@/components/Nav";

const host = Host_Grotesk({ variable: "--font-host", subsets: ["latin"] });

const description =
  "Krishna Gahlod builds AI products and ships them. Founder of Golash, CTO at Tarashio, Chemical Engineering at IIT Bombay. Open to internships now and full-time roles from 2027, ideally AI product manager or forward deployed engineer.";

export const metadata: Metadata = {
  metadataBase: new URL("https://krishna-gahlod.golash.in"),
  title: { default: "Krishna Gahlod, AI product builder", template: "%s | Krishna Gahlod" },
  description,
  // Case study pages set their own preview, so a shared project link shows that project.
  openGraph: {
    title: "Krishna Gahlod, AI product builder",
    description,
    url: "/",
    type: "website",
    siteName: "Krishna Gahlod",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "Krishna Gahlod builds AI products and ships them. A halftone portrait stands beside the headline." }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${host.variable} antialiased`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper">
          Skip to content
        </a>
        <SmoothScroll>
          <CurtainProvider>
            <LiveProvider>
              <Nav />
              <main id="main">{children}</main>
            </LiveProvider>
          </CurtainProvider>
        </SmoothScroll>
        {/* Counts visits, without cookies */}
        <Analytics />
      </body>
    </html>
  );
}
