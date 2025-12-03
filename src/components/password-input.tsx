"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React from "react";

export interface PasswordInputProps extends Omit<
  React.ComponentProps<"input">,
  "type" // Give me all the props that a normal HTML <input> element accepts. and remove the type property from the allowed input props.
> {
  className?: string;
}

function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pr-10", className)}
        {...props}
      />

      <button
        type="button"
        className="absolute top-0 right-0 h-full px-3 py-2"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={props.disabled}
      >
        {showPassword ? (
          <EyeOff className="text-muted-foreground h-4 w-4" />
        ) : (
          <Eye className="text-muted-foreground h-4 w-4" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </button>
    </div>
  );
}

export { PasswordInput };
