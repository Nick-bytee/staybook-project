import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Staybook Task",
  description: "Staybook Task Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster/>
      </body>
    </html>
  );
}
