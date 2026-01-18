"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignUpTab } from "../_components/sign-up-tab";
import { SignInTab } from "../_components/sign-in-tab";
import { Separator } from "@/components/ui/separator";
import { SocialAuthButtons } from "../_components/social-auth-buttons";
import { EmailVerification } from "../_components/email-verification";

type Tab = "signin" | "signup" | "email-verification";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [selectedTab, setSelectedTab] = useState<Tab>("signin");

  return (
    <Tabs
      value={selectedTab}
      onValueChange={(t) => setSelectedTab(t as Tab)}
      className="max-w-xl mx-auto w-full my-6 px-4"
    >
      {(selectedTab === "signin" || selectedTab === "signup") && (
        <TabsList>
          <TabsTrigger className="cursor-pointer" value="signin">
            Sign In
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="signup">
            Sign Up
          </TabsTrigger>
        </TabsList>
      )}
      <TabsContent value="signin">
        <Card>
          <CardHeader className="text-2xl font-bold">
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <SignInTab />
          </CardContent>

          <Separator />

          <CardFooter className="grid grid-cols-2 gap-3">
            <SocialAuthButtons />
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="signup">
        <Card>
          <CardHeader className="text-2xl font-bold">
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <SignUpTab />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="email-verification">
        <Card>
          <CardHeader className="text-2xl font-bold">
            <CardTitle>Verify Your Email</CardTitle>
          </CardHeader>
          <CardContent>
            <EmailVerification email={email} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
