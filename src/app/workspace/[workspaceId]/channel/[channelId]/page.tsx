"use client";

import { Loader, TriangleAlert } from "lucide-react";

import { useGetChannel } from "@/features/channels/api/use-get-channel";
import { useGetMessages } from "@/features/messages/api/use-get-messages";

import { useChannelId } from "@/hooks/use-channel-id";

import { Header } from "./header";
import { ChatInput } from "./chat-input";
import { MessageList } from "@/components/message-list";
import { Button } from "@/components/ui/button";

// TODO: fix Typo in component name
const ChnnelIdPage = () => {
  const channelId = useChannelId();

  const { results, status, loadMore } = useGetMessages({ channelId });
  const { data: channel, isLoading: channelLoading } = useGetChannel({
    id: channelId,
  });

  if (channelLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-full flex-1 flex items-center justify-center">
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="h-full flex-1 flex flex-col items-center justify-center gap-y-2">
        <TriangleAlert className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Channel not found</span>
        <div className="mt-4 items-center">
          <Button size="sm" className="bg-[#3E5879]">
            Go back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header title={channel.name} />
      <MessageList
        channelName={channel.name}
        channelCreationTime={channel._creationTime}
        data={results}
        loadMore={loadMore}
        isLoadingMore={status === "LoadingMore"}
        canLoadMore={status === "CanLoadMore"}
      />
      <ChatInput placeholder={`Message # ${channel.name}`} />
    </div>
  );
};

export default ChnnelIdPage;
