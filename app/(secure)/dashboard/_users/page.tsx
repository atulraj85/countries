"use client";

import { useUserService } from "@/app/_services";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useEffect } from "react";

export default Home;

function Home() {
  const userService = useUserService();
  const user = userService.currentUser;

  useEffect(() => {
    userService.getCurrent();
  }, []);

  if (user) {
    return (
      <>
        <h1>Hi {user.firstName}!</h1>
        <p>You&apos;re logged in with Next.js & JWT!!</p>
        <p>
          <Link href="/dashboard/users">Manage Users</Link>
        </p>
      </>
    );
  } else {
    return <Spinner />;
  }
}
