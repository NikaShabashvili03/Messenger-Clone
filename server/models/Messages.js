import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    seen : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }],
    imageUrl: [{
        type: String,
    }]
}, {
    timestamps: true,
});

export default mongoose.model('Message', MessageSchema);