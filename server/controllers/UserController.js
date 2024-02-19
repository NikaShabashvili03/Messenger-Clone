import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
    try{
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
  
      const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash: hash
      })
  
      const user = await doc.save();
      
      const token = jwt.sign({
        _id: user._id
      }, 
      'secret123',
      {
        expiresIn: '30d'
      }
      );
  
      const {
        passwordHash,
        ...userData
      } = user._doc;
  
      res.json({
        ...userData,
        token
      });
  
    }catch(err) {
      console.log(err);
      res.status(500).json({
        message: 'Something went wrong',
      })
    }
  };

export const login = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const user = await UserModel.findOne({
        email: req.body.email,
      })
  
      if(!user){
        return res.status(404).json({
          message: 'Email not found'
        });
      }
  
      const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
  
      if(!isValidPass){
        return res.status(404).json({
          message: 'Password is not correct'
        });
      }
  
      const token = jwt.sign({
        _id: user._id
      }, 
      'secret123',
      {
        expiresIn: '30d'
      }
      );
  
      const {
        passwordHash,
        ...userData
      } = user._doc;
  
      res.json({
        ...userData,
        token
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Something went wrong',
      })
    }
  }

export const getMe = async (req, res) => {
    try{
      const user = await UserModel.findById(req.userId);
  
      if(!user){
        return res.status(404).json({
          message: 'User not found'
        })
      }
  
     const {
        passwordHash,
        ...userData
      } = user._doc;
  
      res.json(userData);
    }catch(err){
      console.log(err);
      res.status(500).json({
        message: 'You dont have access',
      })
    }
}

export const getAll = async (req, res) => {
  try {
      const userId = req.params.id
      const users = await UserModel.find({
        _id: {
          $ne: userId 
        }
      });

      res.json(users);
  } catch (error) {
      console.log(err);
      res.status(500).json({
          message: 'You cant find user',
      })
  }
}

export const getOne = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
      const userId = req.params.id;

      const user = await UserModel.findById(userId).populate('post');

      if(!user){
          return res.status(500).json({
              message: 'We cant find user',
          })
      }

      res.json(user);
  } catch (err) {
      console.log(err);
      res.status(500).json({
          message: 'You cant find post',
      })
  }
}