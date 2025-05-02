import Header from "src/components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <h1>Test</h1>
        {children}
      </body>
    </html>
  );
}
