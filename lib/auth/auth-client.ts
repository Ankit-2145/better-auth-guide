import { auth } from "./auth";
import { createAuthClient } from "better-auth/react";
import {
  adminClient,
  inferAdditionalFields,
  organizationClient,
  twoFactorClient,
} from "better-auth/client/plugins";
import { passkeyClient } from "@better-auth/passkey/client";
import { ac, admin, user } from "@/components/auth/permissions";
import { polarClient } from "@polar-sh/better-auth";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/auth/2fa";
      },
    }),
    passkeyClient(),
    adminClient({
      ac,
      roles: {
        admin,
        user,
      },
    }),
    organizationClient(),
    polarClient(),
  ],
});
