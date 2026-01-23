"use client";

import z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth/auth-client";

const ForgotPasswordSchema = z.object({
  email: z.email().min(1),
});

type ForgotPasswordForm = z.infer<typeof ForgotPasswordSchema>;

export function ForgotPassword({
  openSignInTab,
}: {
  openSignInTab: () => void;
}) {
  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleForgotPassword(data: ForgotPasswordForm) {
    await authClient.requestPasswordReset(
      {
        ...data,
        redirectTo: "/auth/reset-password",
      },
      {
        onError: (error) => {
          toast.error(error.error.message || "Something went wrong");
        },
        onSuccess: () => {
          toast.success("Password reset email sent");
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(handleForgotPassword)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={openSignInTab}>
            Back
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer"
          >
            <LoadingSwap isLoading={isSubmitting}>Send Reset Email</LoadingSwap>
          </Button>
        </div>
      </form>
    </Form>
  );
}
