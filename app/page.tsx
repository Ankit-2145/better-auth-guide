"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import Image from "next/image";

export default function Home() {
  const { data: session, isPending: loading } = authClient.useSession();

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
            <div className=" rounded-full overflow-hidden mx-auto w-24 h-24">
              <Image
                src={session.user.image as string}
                alt={session.user.name}
                width={100}
                height={100}
              />
            </div>
            <h1 className="text-3xl font-bold">Welcome {session.user.name}!</h1>
            <Button
              size="lg"
              variant="destructive"
              onClick={() => authClient.signOut()}
            >
              Sign Out
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
