// src/app/layout.js
import "./globals.css";
import AuthProvider from "../components/AuthProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export const metadata = { title: "AnimeDex", description: "Explore your next anime" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}