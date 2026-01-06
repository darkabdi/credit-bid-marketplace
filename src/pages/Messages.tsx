import { useState } from "react";
import { MessageSquare, Search, Circle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  projectTitle: string;
  online: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "",
    lastMessage: "I'll send over the docs and credentials by end of day.",
    time: "10:45 AM",
    unread: 2,
    projectTitle: "Web Development Project",
    online: true,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    avatar: "",
    lastMessage: "The design mockups look great! Let me review them.",
    time: "Yesterday",
    unread: 0,
    projectTitle: "Mobile App UI Design",
    online: false,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    avatar: "",
    lastMessage: "Can we schedule a call to discuss the requirements?",
    time: "Dec 12",
    unread: 0,
    projectTitle: "Backend API Integration",
    online: true,
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "",
    lastMessage: "The first milestone is complete. Please review.",
    time: "Dec 10",
    unread: 1,
    projectTitle: "E-commerce Platform",
    online: false,
  },
];

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{t('messages.title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('messages.subtitle')}
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('messages.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Conversations List */}
        <Card className="shadow-card border-border">
          <ScrollArea className="h-[600px]">
            <CardContent className="p-0">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">{t('messages.noConversations')}</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredConversations.map((conversation) => (
                    <Link
                      key={conversation.id}
                      to="/workspace"
                      className="block hover:bg-accent/50 transition-colors"
                    >
                      <div className="p-4 flex items-start gap-4">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={conversation.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {conversation.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-green-500 text-green-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-foreground truncate">
                              {conversation.name}
                            </h3>
                            <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                              {conversation.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1 truncate">
                            {conversation.projectTitle}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground truncate">
                              {conversation.lastMessage}
                            </p>
                            {conversation.unread > 0 && (
                              <Badge className="ml-2 bg-primary text-primary-foreground h-5 min-w-[20px] flex items-center justify-center">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Messages;