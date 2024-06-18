"use client";

import { ListFilter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ThemeSwitch from "./theme-switch";
import Conversation from "./conversation";
import { UserButton } from "@clerk/nextjs";

import UserListDialog from "./user-list-dialog";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect } from "react";
import { useConversationStore } from "@/store/chat-store";

type LeftPanelProps = {
    onUserClick: (userId: string) => void;
};

const LeftPanel = ({ onUserClick }: LeftPanelProps) => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const conversations = useQuery(api.conversations.getMyConversations, isAuthenticated ? undefined : "skip");

    const { selectedConversation, setSelectedConversation } = useConversationStore();

    const sortedConversations = conversations?.sort((a, b) => {
        const timeA = a.lastMessage?._creationTime ? new Date(a.lastMessage._creationTime).getTime() : new Date(a._creationTime).getTime();
        const timeB = b.lastMessage?._creationTime ? new Date(b.lastMessage._creationTime).getTime() : new Date(b._creationTime).getTime();
        return timeB - timeA;
    });

    useEffect(() => {
        const conversationIds = sortedConversations?.map((conversation) => conversation._id);
        if (selectedConversation && conversationIds && !conversationIds.includes(selectedConversation._id)) {
            setSelectedConversation(null);
        }
    }, [sortedConversations, selectedConversation, setSelectedConversation]);

    if (isLoading) return null;

    return (
        <div className='border-gray-600 border-r h-full flex flex-col'>
            <div className='sticky top-0 bg-left-panel z-10'>
                {/* Header */}
                <div className='flex justify-between bg-gray-primary p-3 items-center'>
                    <UserButton />

                    <div className='flex items-center gap-3'>
                        {isAuthenticated && <UserListDialog />}
                        <ThemeSwitch />
                    </div>
                </div>
                <div className='p-3 flex items-center'>
                    {/* Search */}
                    <div className='relative h-10 mx-3 flex-1'>
                        <Search
                            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10'
                            size={18}
                        />
                        <Input
                            type='text'
                            placeholder='Search or start a new chat'
                            className='pl-10 py-2 text-sm w-full rounded shadow-sm bg-gray-primary focus-visible:ring-transparent'
                        />
                    </div>
                    <ListFilter className='cursor-pointer' />
                </div>
            </div>

            {/* Chat List */}
            <div className='my-3 flex-1 overflow-auto'>
                {/* Conversations will go here*/}
                {sortedConversations?.map((conversation) => (
                    <div
                        key={conversation._id}
                        onClick={() => onUserClick(conversation._id)}
                    >
                        <Conversation key={conversation._id} conversation={conversation} />
                    </div>
                ))}

                {sortedConversations?.length === 0 && (
                    <>
                        <p className='text-center text-gray-500 text-sm mt-3'>No conversations yet</p>
                        <p className='text-center text-gray-500 text-sm mt-3'>
                            We understand {"you're"} an introvert, but {"you've"} got to start somewhere 😊
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default LeftPanel;













