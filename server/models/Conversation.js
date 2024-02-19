import mongoose, { mongo } from "mongoose";

const ConversationSchema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
    }
}, {
    timestamps: true,
});

export default mongoose.model('Conversation', ConversationSchema);