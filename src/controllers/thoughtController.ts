import { User, Thought } from '../models/index.js'
import { Request, Response } from 'express';

export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Get a single thought
  export const getSingleThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
}
 
  export const createThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.create(req.body);
  
      // Push the created thought's _id to the associated user's thoughts array field
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
  
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

  export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
  
      // Remove the thought's _id from the associated user's thoughts array field
      await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
  
      res.json({ message: 'Thought GONE' });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const createReaction = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
  
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const deleteReaction = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
  
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }
