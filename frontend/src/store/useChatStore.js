import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    console.log('[CHAT] Fetching users for sidebar...');
    set({ isUsersLoading: true });

    try {
      const res = await axiosInstance.get("/message/users");

      // Ensure we have valid data and it's an array
      const users = Array.isArray(res.data) ? res.data : [];

      console.log(`[CHAT] Fetched ${users.length} users successfully`);
      console.log('[CHAT] Users data:', users);

      set({ users });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch users';

      console.error('[CHAT] Error fetching users:', errorMessage);
      console.error('[CHAT] Full error:', error);

      // Set empty array on error
      set({ users: [] });
      toast.error(errorMessage);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    console.log(`[CHAT] Fetching messages for user: ${userId}`);
    set({ isMessagesLoading: true });

    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const res = await axiosInstance.get(`/message/${userId}`);

      // Ensure we have valid data and it's an array
      const messages = Array.isArray(res.data) ? res.data : [];

      console.log(`[CHAT] Fetched ${messages.length} messages successfully`);
      console.log('[CHAT] Messages data:', messages);

      set({ messages });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch messages';

      console.error('[CHAT] Error fetching messages:', errorMessage);
      console.error('[CHAT] Full error:', error);

      // Clear messages on error
      set({ messages: [] });
      toast.error(errorMessage);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    console.log(`[CHAT] Sending message to user: ${selectedUser?._id}`);

    try {
      if (!selectedUser) {
        throw new Error('No user selected');
      }

      if (!messageData.text && !messageData.image) {
        throw new Error('Message content is required');
      }

      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);

      console.log('[CHAT] Message sent successfully');
      set({ messages: [...messages, res.data] });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to send message';

      console.error('[CHAT] Error sending message:', errorMessage);
      toast.error(errorMessage);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();

    if (!selectedUser) {
      console.log('[CHAT] Cannot subscribe to messages - no user selected');
      return;
    }

    const socket = useAuthStore.getState().socket;

    if (!socket) {
      console.log('[CHAT] Cannot subscribe to messages - no socket connection');
      return;
    }

    console.log(`[CHAT] Subscribing to messages for user: ${selectedUser._id}`);

    socket.on("newMessage", (newMessage) => {
      console.log('[CHAT] Received new message via socket:', newMessage._id);

      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) {
        console.log('[CHAT] Message not from selected user, ignoring');
        return;
      }

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    console.log('[CHAT] Unsubscribing from messages');

    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
