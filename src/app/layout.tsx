import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import AuthProvider from "@/providers/AuthProvider";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "Apptivate Flights",
  description:
    "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "shadcn/ui sidebar",
    description:
      "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "shadcn/ui sidebar",
    description:
      "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.className} h-screen bg-cover bg-no-repeat bg-fixed`}
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/009/328/817/non_2x/travel-by-air-on-an-airplane-around-the-world-passenger-plane-and-planet-earth-on-a-gradient-blue-background-travel-poster-copy-space-illustration-vector.jpg')",
          backgroundPosition: "center", // Center the background image
          backgroundSize: "cover" // Ensure the image covers the entire background
          // opacity: 0.5 // Set the opacity of the background image (can adjust as needed)
        }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <ContentLayout title="Apptivate Flights">{children}</ContentLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
