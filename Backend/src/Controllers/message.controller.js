import User from "../Models/user.model.js";
import Message from "../Models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, getSocketIO } from "../lib/socketio.js";


export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getMessages = async (req, res) => {
 try {
   const { id: userToChatId } = req.params;
   const myId = req.user._id;

   const messages = await Message.find({
     $or: [
       { senderId: myId, receiverId: userToChatId },
       { senderId: userToChatId, receiverId: myId },
     ],
   });

   res.status(200).json(messages);
 } catch (error) {
   console.log("Error in getMessages controller: ", error.message);
   res.status(500).json({ error: "Internal server error" });
 }
};

export const sendMessage = async (req, res) => {
  try {
    const receiverID = req.params.id;
    const senderID = req.user._id;
    const { text, image } = req.body;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId: senderID,
      receiverId: receiverID,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const io = getSocketIO();
    const receiverSocketId = getReceiverSocketId(receiverID);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage); 
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

 