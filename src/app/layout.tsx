import type { Metadata } from "next";
import Script from "next/script";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Aziz Kabore — Développeur web",
    template: "%s · Aziz Kabore",
  },
  description: "Portfolio d’Adelazize Kabore, développeur web full-stack junior.",
};

const themeScript = "try { var savedTheme = localStorage.getItem('aziz-theme'); if (savedTheme === 'light' || savedTheme === 'dark') { document.documentElement.dataset.theme = savedTheme; } } catch (_) {}";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body>{children}</body>
      <Script id="theme-script" strategy="beforeInteractive">
        {themeScript}
      </Script>
    </html>
  );
}
