import Markdown from "@/components/markdown";
import { cn } from "@/lib/utils";
import { UIMessage } from "ai";
import { Bot } from "lucide-react";

interface ChatMessageProps {
  message: UIMessage;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const currentStep = message.parts[message.parts.length - 1];

  return (
    <div
      className={cn(
        "prose dark:prose-invert mb-2 flex max-w-[80%] flex-col",
        message.role === "user" ? "ml-auto items-end" : "mr-auto items-start",
      )}
    >
      <div
        className={cn(
          "prose dark:prose-invert rounded-lg px-3 py-2 text-sm",
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted first:prose-p:mt-0",
        )}
      >
        {message.role === "assistant" && (
          <div className="text-muted-foreground mb-1 flex items-center gap-1 text-xs font-medium">
            <Bot className="text-primary size-3" />
            AI Assistant
          </div>
        )}
        {currentStep?.type === "text" && (
          <Markdown>{currentStep.text}</Markdown>
        )}
        {currentStep.type === "tool-findRelevantNotes" && (
          <div className="animate-pulse italic">Searching notes...</div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
