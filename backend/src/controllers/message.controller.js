import User from '../models/user.model.js'
import Message from '../models/message.model.js'
import cloudinary from '../lib/cloudinary.js'
import { getReceiverSocketId, io } from '../lib/socket.js'

export const getUsersForSidebar = async (req, res) => {
    const loggedInUserId = req.user._id;

    console.log(`[MESSAGE] Getting users for sidebar - User: ${loggedInUserId}`);

    try {
        const filteredUsers = await User.find({
            _id: { $ne: loggedInUserId },
        }).select('-password');

        console.log(`[MESSAGE] Found ${filteredUsers.length} users for sidebar`);

        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.error(`[MESSAGE] Error getting users for sidebar:`, error.message);
        console.error(`[MESSAGE] Stack trace:`, error.stack);

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: 'INTERNAL_ERROR'
        });
    }
}

export const getMessages = async (req, res) => {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    console.log(`[MESSAGE] Getting messages between ${myId} and ${userToChatId}`);

    try {
        // Validate userToChatId
        if (!userToChatId) {
            console.log(`[MESSAGE] Get messages failed - Missing userToChatId`);
            return res.status(400).json({
                success: false,
                message: 'User ID is required',
                error: 'MISSING_USER_ID'
            });
        }

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        }).populate('senderId receiverId').sort({ createdAt: 1 });

        console.log(`[MESSAGE] Found ${messages.length} messages between users`);

        return res.status(200).json(messages);
    } catch (error) {
        console.error(`[MESSAGE] Error getting messages:`, error.message);
        console.error(`[MESSAGE] Stack trace:`, error.stack);

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch messages',
            error: 'INTERNAL_ERROR'
        });
    }
}


export const sendMessages = async (req, res) => {
    const { id: receiverId } = req.params;
    const { text, image } = req.body;
    const senderId = req.user._id;

    console.log(`[MESSAGE] Sending message from ${senderId} to ${receiverId}`);

    try {
        // Validation
        if (!receiverId) {
            console.log(`[MESSAGE] Send message failed - Missing receiverId`);
            return res.status(400).json({
                success: false,
                message: 'Receiver ID is required',
                error: 'MISSING_RECEIVER_ID'
            });
        }

        if (!text && !image) {
            console.log(`[MESSAGE] Send message failed - No content provided`);
            return res.status(400).json({
                success: false,
                message: 'Message content is required',
                error: 'MISSING_CONTENT'
            });
        }

        // Handle image upload if present
        let imageUrl;
        if (image) {
            console.log(`[MESSAGE] Uploading image to cloudinary`);
            try {
                const uploadResponse = await cloudinary.uploader.upload(image, {
                    folder: 'chat-images',
                });
                imageUrl = uploadResponse.secure_url;
                console.log(`[MESSAGE] Image uploaded successfully`);
            } catch (uploadError) {
                console.error(`[MESSAGE] Image upload failed:`, uploadError.message);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to upload image',
                    error: 'IMAGE_UPLOAD_FAILED'
                });
            }
        }

        // Create and save message
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // Real-time messaging with socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            console.log(`[MESSAGE] Emitting real-time message to socket: ${receiverSocketId}`);
            io.to(receiverSocketId).emit("newMessage", newMessage);
        } else {
            console.log(`[MESSAGE] Receiver not online - message saved but not sent in real-time`);
        }

        console.log(`[MESSAGE] Message sent successfully: ${newMessage._id}`);

        return res.status(201).json(newMessage);
    } catch (error) {
        console.error(`[MESSAGE] Error sending message:`, error.message);
        console.error(`[MESSAGE] Stack trace:`, error.stack);

        return res.status(500).json({
            success: false,
            message: 'Failed to send message',
            error: 'INTERNAL_ERROR'
        });
    }
}
