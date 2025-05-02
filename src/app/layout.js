import Header from "src/components/Header";
import "./globals.css";

export const metadata = {
  title: "Kino Uppsala",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
