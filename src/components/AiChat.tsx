"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { Loader, MessageSquare, Copy, BotIcon } from "lucide-react";
import { toast } from "sonner";
import { useContext } from "react";
import EditorContext from "@/lib/editor-context";

interface Message {
  role: "user" | "assistant";
  content: string;
  code?: string;
}

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setCode, code } = useContext(EditorContext);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulated AI response for now - replace with actual API call
      const response = {
        role: "assistant" as const,
        content: "Here's a sample code snippet that might help:",
        code: "# Example code\ndef example_function():\n    print('Hello from AI!')",
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, response]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Failed to get AI response");
      setIsLoading(false);
    }
  };

  const insertCode = (newCode: string) => {
    setCode(code + "\n" + newCode);
    toast.success("Code inserted successfully!");
  };

  return (
    <>
      <Button
        variant="default"
        className="absolute bottom-6 right-6"
        onClick={() => setOpen(true)}
      >
        <BotIcon className="h-5 w-5" />
        Use AI
      </Button>

      <Sheet open={open} onOpenChange={(v) => setOpen(v)}>
        <SheetContent className="w-[400px] sm:w-[540px] outline-none">
          <SheetHeader>
            <SheetTitle>AI Assistant</SheetTitle>
            <SheetDescription>
              Ask questions and get code suggestions
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col h-[calc(100vh-120px)] mt-4">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      message.role === "assistant" ? "items-start" : "items-end"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-3 max-w-[80%] ${
                        message.role === "assistant"
                          ? "bg-secondary"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      {message.code && (
                        <div className="mt-2 relative">
                          <pre className="bg-background rounded p-2 text-sm overflow-x-auto">
                            <code>{message.code}</code>
                          </pre>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => insertCode(message.code!)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-secondary rounded-lg p-3">
                      <Loader className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading}>
                  Send
                </Button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
