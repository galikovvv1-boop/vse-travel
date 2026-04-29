import { useState, useCallback } from "react";
import { trpc } from "@/providers/trpc";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Здравствуйте! 👋 Я ваш персональный менеджер по аренде транспорта VSE-Travel.\n\nС радостью помогу подобрать идеальный автомобиль или автобус для вашей поездки. Расскажите, сколько человек и на какое мероприятие вам нужен транспорт?\n\nТакже вы можете написать нам напрямую в Telegram: @INTELEGENT_Spb",
  createdAt: new Date(),
};

export function useAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: data.reply,
          createdAt: new Date(),
        },
      ]);
    },
    onError: (error) => {
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content:
            error.message || "Извините, произошла ошибка. Попробуйте позже.",
          createdAt: new Date(),
        },
      ]);
    },
  });

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || chatMutation.isPending) return;

      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        content: text.trim(),
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");

      const history = [...messages, userMsg]
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        }));

      // Keep last 10 messages to stay within token limits
      const recentHistory = history.slice(-10);

      chatMutation.mutate({ messages: recentHistory });
    },
    [messages, chatMutation]
  );

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      sendMessage(input);
    },
    [input, sendMessage]
  );

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
  }, []);

  return {
    messages,
    isOpen,
    toggleOpen,
    input,
    setInput,
    handleSubmit,
    sendMessage,
    isLoading: chatMutation.isPending,
    clearChat,
  };
}
