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
import { Loader, MessageSquare, Copy, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useContext } from "react";
import EditorContext from "@/lib/editor-context";

interface Message {
  role: "user" | "assistant";
  content: string;
  code?: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export function AiChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setCode, code } = useContext(EditorContext);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };

    if (!currentConversation) {
      // Create new conversation
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: input.slice(0, 30) + (input.length > 30 ? "..." : ""),
        messages: [userMessage],
        createdAt: new Date(),
      };
      setConversations((prev) => [newConversation, ...prev]);
      setCurrentConversation(newConversation);
    } else {
      // Update existing conversation
      const updatedConversation = {
        ...currentConversation,
        messages: [...currentConversation.messages, userMessage],
      };
      setCurrentConversation(updatedConversation);
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === updatedConversation.id ? updatedConversation : conv
        )
      );
    }

    setInput("");
    setIsLoading(true);

    try {
      // Simulated AI response for now - replace with actual API call
      const response: Message = {
        role: "assistant",
        content: "Here's a sample code snippet that might help:",
        code: "# Example code\ndef example_function():\n    print('Hello from AI!')",
      };

      setTimeout(() => {
        if (currentConversation) {
          const updatedConversation = {
            ...currentConversation,
            messages: [...currentConversation.messages, userMessage, response],
          };
          setCurrentConversation(updatedConversation);
          setConversations((prev) =>
            prev.map((conv) =>
              conv.id === updatedConversation.id ? updatedConversation : conv
            )
          );
        }
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

  const startNewChat = () => {
    setCurrentConversation(null);
    setShowHistory(false);
  };

  const openConversation = (conversation: Conversation) => {
    setCurrentConversation(conversation);
    setShowHistory(false);
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4"
        onClick={() => setOpen(true)}
      >
        <MessageSquare className="h-5 w-5" />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <div className="flex items-center gap-2">
              {!showHistory && currentConversation && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowHistory(true)}
                  className="animate-fade-in"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <SheetTitle>
                {showHistory
                  ? "Chat History"
                  : currentConversation?.title || "New Chat"}
              </SheetTitle>
            </div>
            <SheetDescription>
              {showHistory
                ? "Your previous conversations"
                : "Ask questions and get code suggestions"}
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col h-[calc(100vh-200px)] mt-4">
            <ScrollArea className="flex-1 pr-4">
              {showHistory ? (
                <div className="space-y-2 animate-fade-in">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={startNewChat}
                  >
                    + New Chat
                  </Button>
                  {conversations.map((conv) => (
                    <Button
                      key={conv.id}
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => openConversation(conv)}
                    >
                      <div className="truncate">
                        <p className="font-medium">{conv.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {conv.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {currentConversation?.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex flex-col ${
                        message.role === "assistant"
                          ? "items-start"
                          : "items-end"
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
              )}
            </ScrollArea>
            {!showHistory && (
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
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
