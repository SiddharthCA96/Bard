"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { JSX } from "react";
import {Navbar} from "@repo/ui/navbar";
export default function Page(): JSX.Element {
  const session = useSession();
  return (
   <div>
      <Navbar onSignin={signIn} onSignout={signOut} user={session.data?.user}/>
   </div>
  );
}