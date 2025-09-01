import Providers from "@/lib/Providers";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "HRM",
  description: "Frontend-only HRM demo with Next.js + Redux Toolkit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased ${poppins.className}`}>
        <Providers>
          <main className="p-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
