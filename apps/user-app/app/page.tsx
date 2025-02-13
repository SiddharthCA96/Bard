"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { JSX } from "react";
import {Navbar} from "@repo/ui/navbar";
export default function Page(): JSX.Element {
  const session = useSession();
  return (
   <div>
      <Navbar/>
   </div>
  );
}