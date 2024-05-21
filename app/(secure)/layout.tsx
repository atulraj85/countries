import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../_helpers/server";
import { Alert, Nav } from "../_components";
import Header from "@/components/layout/header";
import "../globals.css";
import Sidebar from "@/components/layout/sidebar";

export default Layout;

export const metadata = {
  title: "Global Biz Dashboard",
};

function Layout({ children }: { children: React.ReactNode }) {
  // if not logged in redirect to login page
  if (!auth.isAuthenticated()) {
    const returnUrl = encodeURIComponent(
      headers().get("x-invoke-path") || "/dashboard"
    );
    redirect(`/account/login?returnUrl=${returnUrl}`);
  }

  return (
    <html lang="en">
      <body>
        <Header />
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="w-full pt-16">
            <Alert />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
