import { useState, useCallback } from "react";
import { X, MessageSquare, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleOpen}
        className={cn(
          "fixed bottom-6 right-6 z-[100] flex items-center justify-center",
          "w-14 h-14 bg-primary text-primary-foreground rounded-full",
          "transition-all duration-300 hover:scale-110 hover:shadow-xl",
          "shadow-lg"
        )}
        aria-label={isOpen ? "Закрыть чат" : "Открыть чат"}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageSquare className="w-5 h-5" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-[100] flex flex-col bg-background border border-border shadow-2xl rounded-lg overflow-hidden"
          style={{
            width: "clamp(320px, 90vw, 380px)",
            height: "auto",
            maxHeight: "500px",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary border-b">
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                Консультант
              </span>
            </div>
            <button
              onClick={toggleOpen}
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-4 px-5 py-6">
            <p className="text-sm text-foreground leading-relaxed">
              🤖 Бот временно не работает.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Обратитесь к менеджеру — мы ответим быстро:
            </p>

            <a
              href="https://t.me/INTELEGENT_Spb"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2 w-full px-4 py-2.5",
                "bg-[#229ED9] text-white text-sm font-medium rounded-md",
                "hover:bg-[#1a8bc2] transition-colors"
              )}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              Написать в Telegram
            </a>

            <a
              href="tel:+79052794030"
              className="text-center text-sm text-foreground hover:text-primary transition-colors"
            >
              +7 (905) 279-40-30
            </a>
          </div>
        </div>
      )}
    </>
  );
}
