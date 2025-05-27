import Header from "../components/Header";
import "./globals.css";
import Footer from "../components/Footer";
import { AuthDataProvider } from "../components/user/AuthData";
import CookieBanner from "../components/user/CookieBanner";

export const metadata = {
  title: "Kino Uppsala",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body data-theme="dark" className="min-h-screen flex flex-col">
        <AuthDataProvider>
          <Header />
          <main className="flex-1">
            <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <Footer />
        </AuthDataProvider>
        <CookieBanner />
      </body>
    </html>
  );
}