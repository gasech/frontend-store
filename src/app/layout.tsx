import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import NextAuthSessionProvider from "@/providers/SessionProvider";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/providers/CartProvider";
import { getServerSession } from "next-auth";
import { ProductsProvider } from "@/providers/ProductsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend Store",
  description:
    "Welcome to the Frontend Store! Sign in to add products and checkout!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider session={session}>
          <ProductsProvider>
            <CartProvider>
              <NavBar />
              <main className="bg-blue-200">{children}</main>
              <Toaster />
            </CartProvider>
          </ProductsProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
