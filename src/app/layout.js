import Header from "src/components/Header";
import "./globals.css";

export const metadata = {
  title: "Kino bio Uppsala",
  icons: {
    icon: "/favicon.ico", // путь из public
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
