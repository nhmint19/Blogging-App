import type { Metadata } from "next";
import "./globals.css";
import Provider from "./_trpc/Provider";

export const metadata: Metadata = {
  title: "Minh",
  description: "Minh's blogging app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
