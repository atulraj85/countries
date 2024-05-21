import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "./_components/main/Navbar";

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
