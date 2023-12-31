import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryClientProvider from "@/lib/provider";
import { Providers } from "@/redux";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book store",
  description: "Book store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <Providers>{children} </Providers>
        </QueryClientProvider>
      </body>
    </html>
  );
}
