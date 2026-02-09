"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { useEffect, useState } from "react";

export default function Home() {
  const [hasAdminPermission, setHasAdminPermission] = useState(false);
  const { data: session, isPending: loading } = authClient.useSession();

  useEffect(() => {
    authClient.admin
      .hasPermission({ permission: { user: ["list"] } })
      .then(({ data }) => {
        setHasAdminPermission(data?.success ?? false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="my-6 px-4 max-w-md mx-auto">
      <div className="text-center space-y-6">
        {session == null ? (
          <>
            <h1 className="text-3xl font-bold">Welcome to our App</h1>
            <Button asChild size="lg">
              <Link href="/auth/login">Sign In / Sign Up</Link>
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">Welcome {session.user.name}!</h1>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/profile">Profile</Link>
              </Button>
              <Button asChild size="lg">
                <Link href="/organizations">Organizations</Link>
              </Button>

              <Button onClick={() => authClient.checkout({ slug: "pro" })}>
                Polar Payments
              </Button>

              {hasAdminPermission && (
                <Button variant="outline" asChild size="lg">
                  <Link href="/admin">Admin</Link>
                </Button>
              )}
              <Button
                size="lg"
                variant="destructive"
                onClick={() => authClient.signOut()}
              >
                Sign Out
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
