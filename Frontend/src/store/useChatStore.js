import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  isMessagesLoading: false,
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
  isUsersLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/mssg/users");
      set({ users: res.data });
    } catch (error) {
      toast.error("error in getting users", error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    if (!userId) {
      console.warn("No userId provided to getMessages");
      return;
    }

    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/mssg/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    if (!selectedUser?._id) {
      toast.error("Please select a user to send message to");
      return;
    }

    if (!messageData.text?.trim() && !messageData.image) {
      toast.error("Please provide a message or image");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/mssg/send/${selectedUser._id}`,
        messageData
      );

      if (res.data) {
        set({ messages: [...messages, res.data] });
        return res.data;
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
      throw error;
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) {
      console.warn("No user selected to subscribe to messages for.");
    }

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;

      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });

    // Fetch users and messages after subscribing to messages
    get().getUsers();
    if (selectedUser?._id) {
      get().getMessages(selectedUser._id);
    }
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (user) => {
    if (!user?._id) {
      console.warn("Attempting to set invalid user:", user);
      return;
    }
    localStorage.setItem("selectedUser", JSON.stringify(user));
    set({ selectedUser: user });
  },

  clearSelectedUser: () => {
    localStorage.removeItem("selectedUser");
    set({ selectedUser: null });
  },
}));
