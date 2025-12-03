import { X, Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isOwn: boolean;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockMessages: Message[] = [
  { id: 1, sender: "Sarah Miller", content: "Hi! I saw your job posting for the web development project.", time: "10:30 AM", isOwn: false },
  { id: 2, sender: "You", content: "Hello Sarah! Yes, we're looking for an experienced developer. What's your background?", time: "10:32 AM", isOwn: true },
  { id: 3, sender: "Sarah Miller", content: "I have 5 years of experience with React and Node.js. I've completed similar projects before.", time: "10:35 AM", isOwn: false },
];

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-xl border border-border bg-card shadow-elevated">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground font-semibold">
              SM
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Sarah Miller</h3>
              <p className="text-xs text-success">Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-5 space-y-4">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-4 py-2.5 ${
                  msg.isOwn
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={`mt-1 text-xs ${msg.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-secondary transition-colors">
              <Paperclip className="h-5 w-5 text-muted-foreground" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 h-10 rounded-lg border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button size="icon" className="h-10 w-10">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
