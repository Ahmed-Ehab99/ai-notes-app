"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { Loader2, LogOut } from "lucide-react";
import { useState } from "react";

export function SignOutButton() {
  const { signOut } = useAuthActions();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true);
        signOut();
        setIsLoading(false);
      }}
      disabled={isLoading}
      title="Sign out"
    >
      {isLoading ? <Loader2 className="animate-spin" /> : <LogOut />}
    </Button>
  );
}
