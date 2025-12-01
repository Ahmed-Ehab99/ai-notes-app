import logo from "@/assets/logo.png";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "./sign-out-button";


export function Navbar() {
  return (
    <nav className="bg-card flex justify-center border-b p-4">
      <div className="container mx-auto flex items-center justify-between xl:max-w-6xl">
        {/* Logo */}
        <Link
          href="/notes"
          className="text-card-foreground flex items-center gap-3 text-xl font-semibold transition-opacity hover:opacity-80"
        >
          <Image
            src={logo}
            alt="Smart Notes Logo"
            width={32}
            height={32}
            className="rounded"
          />
          Smart Notes
        </Link>

        {/* Mode Toggle & Signout Button */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          <SignOutButton />
        </div>
      </div>
    </nav>
  );
}
