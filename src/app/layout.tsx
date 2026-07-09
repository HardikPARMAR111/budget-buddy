import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://budget-buddy-fawn-theta.vercel.app/"), // your real deployed URL
  title: {
    default: "Budget Buddy — Personal Budget & Savings Tracker",
    template: "%s | Budget Buddy",
  },
  description:
    "Track income, expenses, and savings with Budget Buddy — custom categories, monthly summaries, and visual reports, all in one clean dashboard.",
  keywords: [
    "budget tracker",
    "expense tracker",
    "personal finance app",
    "savings tracker",
    "budget buddy",
    "budget app",
  ],
  openGraph: {
    title: "Budget Buddy — Personal Budget & Savings Tracker",
    description: "Track income, expenses, and savings in one clean dashboard.",
    url: "https://budget-buddy-fawn-theta.vercel.app/",
    siteName: "Budget Buddy",
    images: ["/og-image.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1F4468",
};

// Runs before paint to avoid a light/dark flash on load
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
