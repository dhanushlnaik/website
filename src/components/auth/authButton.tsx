"use client";
import { signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { getCurrentUser } from "@/lib/session";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AuthButton() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    async function fetchUser() {
      await getCurrentUser().then((user: any) => {
        setUser(user);
      });
    }
    fetchUser();
  });
  return (
    <>
      {!user ? (
        <Button onClick={() => signIn("google")}>Sign in</Button>
      ) : (
        <Popover>
          <PopoverTrigger>
            <Image
              src={user?.image}
              alt={user?.name}
              height={500}
              width={500}
              className="w-12 h-12 rounded-full"
            />
          </PopoverTrigger>
          <PopoverContent>
            <Button onClick={() => signOut()} className="w-full">
              Sign out
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
