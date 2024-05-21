import { Navbar } from "./_components/navbar/Navbar";
import "./globals.css";

export const metadata = {
  title: "Next.js 13 - User Registration and Login Example",
};

export default Layout;

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
