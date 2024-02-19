import MessageModel from '../models/Messages.js';
import { pusher } from '../utils/pusher.js';
import ConversationModel from '../models/Conversation.js';

export const getAll = async (req, res) => {
    try {
        const messages = await MessageModel.find().populate('seen').exec();

        res.json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'We Cant Find Messages'
        })
    }
}

export const updateSeen = async (req, res) => {
    try {
        const { message, userId } = req.body;

        if(!message || !userId){
            return null;
        }
        const lastMessage = message.slice(-1)[0];

        if(lastMessage?.user?._id === userId){
            return null;
        }

        const updatedMessage = await MessageModel.findOneAndUpdate({
            _id: lastMessage?._id,
            seen: {
                $ne: userId
            }
        }, {
            $push: { seen: userId  },
        }, {
            returnDocument: 'after'
        }).populate(['user', 'seen'])

        await pusher.trigger(lastMessage.conversation, 'message:update', updatedMessage);
        res.json(updatedMessage);
    } catch (error) {
        return null;
    }
}

export const create = async (req, res) => {
    try {
        const conversationId = req.params.id;
        const {text, imageUrl, userId} = req.body;

        const doc = new MessageModel({
            user: userId,
            conversation: conversationId,
            text: text,
            imageUrl: imageUrl
        })

        const message = await doc.save();

        if(!message){
            res.status(500).json({
                message: 'We cant find user',
            })
            return null;
        }

        await ConversationModel.findOneAndUpdate({
            _id: conversationId
        }, {
            lastMessage: message,
            $push: { message: message  }
        })

        await pusher.trigger(conversationId, 'message:new', await message.populate(['user', 'seen']));
        res.json(await message.populate(['user', 'seen']));
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
}
