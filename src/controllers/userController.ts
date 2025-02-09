import { User, Thought } from '../models/index.js'
import { Request, Response } from 'express';

  // Get all users
  export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Get a single user
  export const getSingleUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // create a new user
  export const createUser = async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId});
      
      if(!user) {
        res.status(404).json({
          message: 'No user with that ID'
        });
      } else {
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and thoughts deleted!' });
      }
      
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };
  export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

  export const addFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
  
      res.json(user);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

  export const removeFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
  
      res.json(user);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };