import ConversationModel from '../models/Conversation.js';

export const create = async (req, res) => {
    try {
        const { userId, isGroup, name } = req.body;


        if(isGroup){
            const doc = new ConversationModel({
                user: userId,
                isGroup: true,
                name: name
            })
            
            const conversation = await doc.save();
            res.json(conversation);
            return null;
        }
        
        const firstUser = userId[0];
        const secondUser = userId[1];


        const execConversation = await ConversationModel.findOne({
            $or: [
                { user: [firstUser, secondUser] },
                { user: [secondUser, firstUser] }
            ]
        }).exec();

        if(execConversation){
            res.json(execConversation)
            return null;
        }

        const doc = new ConversationModel({
            user: userId,
        })

        const conversation = await doc.save();
        
        // await pusher.trigger(secondUser, 'conversation:new', await conversation.populate(['user', 'lastMessage']));
        // res.json(conversation);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const conversationId = req.params.id;
        const conversation = await ConversationModel.findById(conversationId).populate(['user', {
            path: 'message',
            populate: [
                {
                    path: 'user',
                },
                {
                    path: 'seen',
                },
            ],
        }]);

        if(!conversation){
            return res.status(500).json({
                message: 'We cant find user',
            })
        }
  
        res.json(conversation);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong2'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const { id } = req.body;
        const conversation = await ConversationModel.find({
            user: {
                $in: id
            }
        }).populate(['user', {
            path: 'lastMessage',
            populate: [
                {
                    path: 'user',
                },
            ],
        }])
        
        if(!conversation){
            res.json([])
            return null
        }

        res.json(conversation);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong2'
        })
    }
}