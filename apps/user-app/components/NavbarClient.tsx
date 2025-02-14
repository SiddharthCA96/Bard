"use client";

import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "@repo/ui/navbar";
export function NavbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
    <div>
      <Navbar
        onSignin={signIn}
        onSignout={async () => {
          //signout the user
          await signOut();
          //route the user to loginn page
          router.push("/api/auth/signin");
        }}
        user={session.data?.user}
      />
    </div>
  );
}
