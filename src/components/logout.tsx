"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

const LogoutButton = () => {
  const router = useRouter();

  const signoutHandler = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/login");
        },
      },
    });
  };

  return <Button onClick={signoutHandler}>Logout</Button>;
};

export default LogoutButton;
