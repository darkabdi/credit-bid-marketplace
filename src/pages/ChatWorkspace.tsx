import { useState } from "react";
import { Send, Paperclip, Plus, Check, Clock, DollarSign, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "@/components/ui/link";
import MilestoneModal from "@/components/workspace/MilestoneModal";

interface Message {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  time: string;
  isOwn: boolean;
}

interface Milestone {
  id: number;
  title: string;
  amount: number;
  status: "pending" | "in_progress" | "completed" | "paid";
  deadline: string;
}

const mockMessages: Message[] = [
  {
    id: 1,
    sender: "Sarah Chen",
    avatar: "",
    content: "Hi! I've reviewed your project requirements. I can start on the first milestone this week.",
    time: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    sender: "You",
    avatar: "",
    content: "That sounds great! Do you need any additional information about the API specifications?",
    time: "10:35 AM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Sarah Chen",
    avatar: "",
    content: "Yes, if you could share the API documentation that would be helpful. I'll also need access to the staging environment.",
    time: "10:40 AM",
    isOwn: false,
  },
  {
    id: 4,
    sender: "You",
    avatar: "",
    content: "I'll send over the docs and credentials by end of day.",
    time: "10:45 AM",
    isOwn: true,
  },
];

const mockMilestones: Milestone[] = [
  { id: 1, title: "Project Setup & Architecture", amount: 500, status: "completed", deadline: "Dec 1, 2024" },
  { id: 2, title: "Core Features Development", amount: 1500, status: "in_progress", deadline: "Dec 15, 2024" },
  { id: 3, title: "Testing & QA", amount: 800, status: "pending", deadline: "Dec 22, 2024" },
  { id: 4, title: "Final Delivery", amount: 700, status: "pending", deadline: "Dec 30, 2024" },
];

const getStatusBadge = (status: Milestone["status"]) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-[hsl(var(--moss-light))] text-[hsl(var(--moss))] hover:bg-[hsl(var(--moss-light))]">Completed</Badge>;
    case "in_progress":
      return <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50">In Progress</Badge>;
    case "paid":
      return <Badge className="bg-[hsl(var(--moss))] text-[hsl(var(--moss-foreground))]">Paid</Badge>;
    default:
      return <Badge variant="secondary">Pending</Badge>;
  }
};

const ChatWorkspace = () => {
  const [newMessage, setNewMessage] = useState("");
  const [milestones, setMilestones] = useState(mockMilestones);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage("");
    }
  };

  const handleMarkComplete = (id: number) => {
    setMilestones(milestones.map(m => 
      m.id === id ? { ...m, status: "completed" as const } : m
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" />
                <AvatarFallback className="bg-[hsl(var(--moss-light))] text-[hsl(var(--moss))]">SC</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-semibold text-foreground">Sarah Chen</h1>
                <p className="text-sm text-muted-foreground">Web Development Project</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-card border-border h-[600px] flex flex-col">
              <CardHeader className="border-b border-border py-4">
                <CardTitle className="text-lg">Messages</CardTitle>
              </CardHeader>
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${message.isOwn ? "flex-row-reverse" : ""}`}>
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={message.avatar} />
                          <AvatarFallback className={message.isOwn ? "bg-primary text-primary-foreground" : "bg-[hsl(var(--nordic-grey))]"}>
                            {message.sender.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            message.isOwn
                              ? "bg-[hsl(var(--moss))] text-[hsl(var(--moss-foreground))]"
                              : "bg-[hsl(var(--nordic-grey))] text-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.isOwn ? "text-white/70" : "text-muted-foreground"}`}>
                            {message.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t border-border">
                <div className="flex gap-3">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-[hsl(var(--moss))] hover:bg-[hsl(var(--moss))]/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Milestones Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-card border-border">
              <CardHeader className="border-b border-border py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Milestones</CardTitle>
                  <Button 
                    size="sm" 
                    className="bg-[hsl(var(--moss))] hover:bg-[hsl(var(--moss))]/90 gap-1"
                    onClick={() => setIsMilestoneModalOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm text-foreground">{milestone.title}</h4>
                        {getStatusBadge(milestone.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5" />
                          ${milestone.amount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {milestone.deadline}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {milestone.status === "in_progress" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-xs h-8 gap-1"
                            onClick={() => handleMarkComplete(milestone.id)}
                          >
                            <Check className="h-3 w-3" />
                            Mark Complete
                          </Button>
                        )}
                        {milestone.status === "completed" && (
                          <Link href="/checkout">
                            <Button 
                              size="sm"
                              className="text-xs h-8 bg-[hsl(var(--moss))] hover:bg-[hsl(var(--moss))]/90"
                            >
                              Release Payment
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card className="shadow-card border-border mt-6">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Budget</span>
                  <span className="font-semibold">$3,500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Paid</span>
                  <span className="font-semibold text-[hsl(var(--moss))]">$500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className="font-semibold">$3,000</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <MilestoneModal 
        isOpen={isMilestoneModalOpen} 
        onClose={() => setIsMilestoneModalOpen(false)} 
      />
    </div>
  );
};

export default ChatWorkspace;
