import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const APP_NAME = "Adri nweb-projekt5";
const APP_DEFAULT_TITLE = "Adri nweb-projekt5";
const APP_TITLE_TEMPLATE = "Adri nweb-projekt5";
const APP_DESCRIPTION = "Adri nweb-projekt5";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={"flex gap-6 items-center bg-gray-200 w-full p-4"}>
          <p className={"text-3xl font-bold"}>nweb-projekt5</p>
          <Link href={"/"} className={"text-lg"}>
            Popular & Search
          </Link>
          <Link href={"/upcoming"} className={"text-lg"}>
            Upcoming Movies
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
