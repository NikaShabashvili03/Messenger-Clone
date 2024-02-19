import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        require: true
    },
    Message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
    conversation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
    }],
    avatarUrl: String,
}, {
    timestamps: true,
});

export default mongoose.model('User', UserSchema);