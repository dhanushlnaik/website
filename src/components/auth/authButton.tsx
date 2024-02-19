import { signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { getCurrentUser } from "@/lib/session";
import { useEffect, useState } from "react";

export default function AuthButton() {
  const [user, setUser] = useState(null);
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
            <Button>You</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Button onClick={() => signOut()}>Sign out</Button>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
