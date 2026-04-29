import { useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Trash2,
  Loader2,
} from "lucide-react";
import { TelegramIcon } from "@/components/TelegramIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Using native scrollable div instead of Radix ScrollArea for reliability
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAiChat } from "@/hooks/useAiChat";
import { cn } from "@/lib/utils";

function formatTime(date: Date) {
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ChatWidget() {
  const {
    messages,
    isOpen,
    toggleOpen,
    input,
    setInput,
    handleSubmit,
    isLoading,
    clearChat,
  } = useAiChat();

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          const viewport = scrollRef.current.querySelector(
            "[data-slot='scroll-area-viewport']"
          );
          if (viewport) {
            viewport.scrollTo({
              top: viewport.scrollHeight,
              behavior: "smooth",
            });
          }
        }
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating toggle button */}
      <Button
        onClick={toggleOpen}
        size="icon-lg"
        className={cn(
          "fixed bottom-6 right-6 z-50 rounded-full shadow-lg transition-transform hover:scale-105",
          isOpen && "rotate-90 scale-0 opacity-0 pointer-events-none"
        )}
        aria-label={isOpen ? "Закрыть чат" : "Открыть чат"}
      >
        <MessageCircle className="size-6" />
      </Button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 flex flex-col w-[90vw] max-w-[380px] h-[500px] max-h-[80vh] bg-background rounded-2xl shadow-2xl border transition-all duration-300 origin-bottom-right",
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-0 opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-primary/5 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-9 rounded-full bg-primary text-primary-foreground">
              <Bot className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">
                Менеджер Travel
              </p>
              <p className="text-xs text-muted-foreground">
                {isLoading ? "Печатает..." : "Онлайн"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <a
              href="https://t.me/INTELEGENT_Spb"
              target="_blank"
              rel="noopener noreferrer"
              title="Написать в Telegram"
              className="inline-flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            >
              <TelegramIcon className="size-5" />
            </a>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={clearChat}
              title="Очистить чат"
              className="text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleOpen}
              title="Закрыть"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3" ref={scrollRef}>
          <div className="flex flex-col gap-3 min-h-0">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-2.5",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <Avatar className="size-7 mt-0.5">
                  <AvatarFallback
                    className={cn(
                      "text-[10px] font-medium",
                      msg.role === "assistant"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {msg.role === "assistant" ? (
                      <Bot className="size-3.5" />
                    ) : (
                      <User className="size-3.5" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "flex flex-col gap-0.5 max-w-[75%]",
                    msg.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                      msg.role === "assistant"
                        ? "bg-muted text-foreground rounded-tl-sm"
                        : "bg-primary text-primary-foreground rounded-tr-sm"
                    )}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-muted-foreground px-1">
                    {formatTime(msg.createdAt)}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5">
                <Avatar className="size-7 mt-0.5">
                  <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">
                    <Bot className="size-3.5" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-2.5">
                  <Loader2 className="size-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-3 py-3 border-t"
        >
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Напишите сообщение..."
            className="flex-1 h-9 rounded-full px-4 text-sm"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="size-9 rounded-full shrink-0"
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </>
  );
}
