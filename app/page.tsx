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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-black animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        {session == null ? (
          // Unauthenticated State
          <div className="w-full max-w-md">
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
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
                <h1 className="text-4xl font-bold text-black">Welcome</h1>
                <p className="text-gray-600 text-base">
                  Sign in to access your account and get started
                </p>
              </div>

              {/* CTA Button */}
              <Button
                asChild
                className="w-full h-12 bg-black text-white hover:bg-gray-900 rounded-lg font-medium transition-colors"
              >
                <Link href="/auth/login">Sign In / Sign Up</Link>
              </Button>

              {/* Footer Text */}
              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  New here? Create an account to get started
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Authenticated State
          <div className="w-full max-w-2xl">
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-black">
                  Welcome, {session.user.name}
                </h1>
                <p className="text-gray-600">Select an option to continue</p>
              </div>

              {/* Navigation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Profile */}
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-lg border border-gray-300 text-black hover:bg-gray-50 transition-colors font-medium"
                >
                  <Link
                    href="/profile"
                    className="flex items-center justify-center"
                  >
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

                {/* Organizations */}
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-lg border border-gray-300 text-black hover:bg-gray-50 transition-colors font-medium"
                >
                  <Link
                    href="/organizations"
                    className="flex items-center justify-center"
                  >
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

                {/* Upgrade Button */}
                <Button
                  className="h-12 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors font-medium md:col-span-1"
                  onClick={() => authClient.checkout({ slug: "pro" })}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                  Upgrade Pro
                </Button>

                {/* Admin Panel */}
                {hasAdminPermission && (
                  <Button
                    asChild
                    className="h-12 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors font-medium"
                  >
                    <Link
                      href="/admin"
                      className="flex items-center justify-center"
                    >
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

                {/* Sign Out Button */}
                <Button
                  variant="outline"
                  className="h-12 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors font-medium md:col-span-2"
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
          </div>
        )}
      </div>
    </main>
  );
}
