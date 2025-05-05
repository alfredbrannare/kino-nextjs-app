import Header from "src/components/Header";
import "./globals.css";
import Footer from "src/components/Footer";

export const metadata = {
  title: "Kino Uppsala",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
