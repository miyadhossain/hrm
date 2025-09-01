import Providers from "@/lib/Providers";
import "./globals.css";

export const metadata = {
  title: "HRM Mini",
  description: "Frontend-only HRM demo with Next.js + Redux Toolkit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="p-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
