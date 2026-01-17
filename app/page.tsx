"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { BetterAuthActionButton } from "@/components/auth/better-auth-action-button";

export default function Home() {
  const { data: session, isPending: loading } = authClient.useSession();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-accent/5 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {session == null ? (
          // Unauthenticated state
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              {/* Decorative circles */}
              <div className="flex justify-center gap-2 opacity-40">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <div className="w-3 h-3 rounded-full bg-accent"></div>
              </div>

              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl font-bold text-balance bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Welcome to our App
                </h1>
                <p className="text-lg text-muted-foreground text-balance max-w-lg mx-auto">
                  Join us today and unlock amazing features designed just for
                  you
                </p>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-card border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-primary text-lg">⚡</span>
                </div>
                <h3 className="font-semibold mb-2">Fast & Reliable</h3>
                <p className="text-sm text-muted-foreground">
                  Lightning quick performance you can depend on
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border/50 backdrop-blur-sm hover:border-secondary/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
                  <span className="text-secondary text-lg">🎨</span>
                </div>
                <h3 className="font-semibold mb-2">Beautiful Design</h3>
                <p className="text-sm text-muted-foreground">
                  Crafted with care for the best experience
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border/50 backdrop-blur-sm hover:border-accent/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <span className="text-accent text-lg">🔒</span>
                </div>
                <h3 className="font-semibold mb-2">Secure & Safe</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is protected with industry standards
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 rounded-full font-semibold"
              >
                <Link href="/auth/login">Get Started</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full font-semibold border-primary/30 text-primary hover:bg-primary/5 bg-transparent"
              >
                <Link href="#">Learn More</Link>
              </Button>
            </div>
          </div>
        ) : (
          // Authenticated state
          <div className="space-y-8">
            <div className="text-center space-y-6">
              {/* Welcome Badge */}
              <div className="inline-block px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary font-medium text-sm">
                Welcome Back! 👋
              </div>

              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl font-bold text-balance">
                  Hey, {session.user.name}!
                </h1>
                <p className="text-lg text-muted-foreground">
                  You&apos;re all set to explore amazing features
                </p>
              </div>
            </div>

            {/* Sign Out Button */}
            <div className="flex justify-center pt-4">
              <BetterAuthActionButton
                size="lg"
                className="rounded-full px-8 font-semibold bg-destructive hover:bg-destructive/90 text-destructive-foreground cursor-pointer"
                successMessage="Signed out successfully"
                action={() => authClient.signOut()}
              >
                Sign Out
              </BetterAuthActionButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
