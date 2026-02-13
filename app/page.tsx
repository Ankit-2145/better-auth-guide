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
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-muted border-t-primary animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-background via-background to-muted/30">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        {session == null ? (
          <div className="w-full max-w-lg text-center space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-accent mb-4">
                <svg
                  className="w-8 h-8 text-primary-foreground"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h1 className="text-5xl font-bold text-foreground">Welcome</h1>
              <p className="text-lg text-muted-foreground">
                Start your journey with us today
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="h-12 text-base rounded-xl w-full bg-linear-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              <Link href="/auth/login">Sign In / Sign Up</Link>
            </Button>

            <div className="pt-4 text-sm text-muted-foreground">
              New here? Sign up to unlock all features
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl space-y-8">
            <div className="space-y-3 text-center">
              <h1 className="text-5xl font-bold bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Welcome {session.user.name}!
              </h1>
              <p className="text-muted-foreground">
                What would you like to do today?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-xl text-base border-2 border-muted hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <Link href="/profile">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Profile
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 rounded-xl text-base border-2 border-muted hover:border-accent hover:bg-accent/5 transition-colors"
              >
                <Link href="/organizations">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Organizations
                </Link>
              </Button>

              <Button
                className="h-12 rounded-xl text-base bg-linear-to-r from-secondary to-accent hover:shadow-lg hover:shadow-secondary/20 transition-all text-secondary-foreground"
                onClick={() => authClient.checkout({ slug: "pro" })}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                Upgrade to Pro
              </Button>

              {hasAdminPermission && (
                <Button
                  asChild
                  className="h-12 rounded-xl text-base bg-linear-to-r from-primary to-purple-500 hover:shadow-lg hover:shadow-primary/20 transition-all text-primary-foreground"
                >
                  <Link href="/admin">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Admin Panel
                  </Link>
                </Button>
              )}

              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-xl text-base border-2 border-destructive/30 hover:bg-destructive/5 hover:border-destructive transition-colors text-destructive md:col-span-2"
                onClick={() => authClient.signOut()}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
