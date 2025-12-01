import logo from "@/assets/logo.webp";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <main className="mx-auto max-w-4xl space-y-8 text-center">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src={logo}
            alt="Smart Notes Logo"
            width={120}
            height={120}
            className="mx-auto"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Smart Notes
        </h1>

        {/* Description */}
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed sm:text-xl">
          A simple note-taking app with AI chatbot integration. Ask the chatbot
          anything about your notes to retrieve and summarize that information.
        </p>

        {/* CTA Button: Call to Action Button */}
        <div className="pt-4">
          <Button asChild size="lg" className="px-8 py-3 text-lg">
            <Link href="/notes">Get Started</Link>
          </Button>
        </div>

        {/* Built with section */}
        <div className="text-muted-foreground pt-8 text-sm">
          <p>Built with Convex and the Vercel AI SDK</p>
        </div>
      </main>
    </div>
  );
}
