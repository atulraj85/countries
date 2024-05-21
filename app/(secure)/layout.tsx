import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../_helpers/server";
import { Alert, Nav } from "../_components";

export default Layout;

function Layout({ children }: { children: React.ReactNode }) {
  // if not logged in redirect to login page
  if (!auth.isAuthenticated()) {
    const returnUrl = encodeURIComponent(headers().get("x-invoke-path") || "/dashboard");
    redirect(`/account/login?returnUrl=${returnUrl}`);
  }

  return (
    <html lang="en">
      <body>
        <div className="app-container bg-light">
          <Nav />
          <Alert />
        </div>
        {children}
      </body>
    </html>
  );
}
