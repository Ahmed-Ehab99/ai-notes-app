"use client";

import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { useState } from "react";
import AiChatBox from "./ai-chat-box";

export const convexSiteUrl = process.env.NEXT_PUBLIC_CONVEX_URL?.replace(
  /.cloud$/,
  ".site",
);

export function AIChatButton() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setChatOpen(true)} variant="outline">
        <Bot />
        <span>Ask AI</span>
      </Button>
      <AiChatBox open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
