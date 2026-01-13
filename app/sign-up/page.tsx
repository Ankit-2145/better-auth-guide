"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data } = await authClient.signUp.email(
      {
        email: email,
        password: password,
        name: name,
      },
      {
        onRequest: () => {
          console.log("request in progress");
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          // display the error message
          console.log(ctx.error.message);
        },
      }
    );

    console.log(data);
  }

  return (
    <main>
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg border border-border p-8">
            <h1 className="text-2xl font-bold mb-6 text-foreground">Sign Up</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button type="submit" className="w-full mt-2">
                Signup
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
