import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "black" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-neutral-950 bg-grid-pattern font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-24 px-6 flex-grow">
              {children}
              <SpeedInsights />
            </main>
            <footer className="w-full flex items-center justify-center py-6">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href={siteConfig.links.website}
                title="BRS Github"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">Nebula Studios</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
