import express from 'express';
import mongoose from 'mongoose';
import { ConversationController, MessageController, UserController } from './controllers/index.js';
import { loginValidation, messageCreateValidation, registerValidation } from './utils/validations.js';
import handleValidationError from './utils/handleValidationError.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import checkAuth from './utils/checkAuth.js';
import { pusher } from './utils/pusher.js';
import multer from 'multer';

mongoose
  .connect('mongodb+srv://shabashvilinika:shabashvilinika@cluster0.woeth8l.mongodb.net/Cluster0?retryWrites=true&w=majority')
  .then(() => console.log('DB OK'))
  .catch((error) => console.log('DB error'));

const app = express();
const PORT = process.env.PORT || 5300;

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));


// Image
app.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// Auth
app.post('/api/auth/login', loginValidation, handleValidationError, UserController.login);
app.post('/api/auth/register', registerValidation, handleValidationError, UserController.register);
app.get('/api/auth/me', checkAuth, UserController.getMe);

// Users
app.get('/api/users/:id', checkAuth, UserController.getAll);

// Conversations
app.post('/api/conversation', checkAuth, ConversationController.create);
app.get('/api/conversation/:id', checkAuth, ConversationController.getOne);
app.patch('/api/conversation', checkAuth, ConversationController.getAll)
// Messages
app.post('/api/conversation/:id/message', checkAuth, messageCreateValidation, handleValidationError, MessageController.create);
app.patch('/api/message/update', checkAuth, MessageController.updateSeen);

// Pusher
app.post('/api/pusher/auth/:email', (req, res) => {
  const sockedId = req.body.socket_id;
  const channel = req.body.channel_name;

  const data = {
    user_id: req.params.email
  };

  const authResponse = pusher.authorizeChannel(sockedId, channel, data);
  res.send(authResponse)
})

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
});