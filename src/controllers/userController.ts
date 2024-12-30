import { User } from "../models/index.js";
import { Request, Response } from "express";
import { Thought } from "../models/Thought.js";
import mongoose from "mongoose";


export const getUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const users = await User.find().populate({
            path: 'thoughts',
            select: 'thoughtText createdAt reactionCount',
            populate: {
                path: 'reactions',
                select: 'reactionBody username createdAt',
            },
        })
        .select('-__v');
        return res.json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};

export const getSingleUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
        
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = await User.create(req.body);
      return res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  };

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
  
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
  
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      return res.json({ message: 'User deleted' });
    } catch (err) {
    return res.status(500).json(err);
      
    }
  };


export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user found by that ID' });
      }
  
      if (user.thoughts.length > 0) {
        await Thought.updateMany(
          { _id: { $in: user.thoughts } },
          { $set: { updatedField: 'New Value' } }
        );
      }
  
      return res.json({ message: 'Updated user', user });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: 'Error, could not update user', error: err });
    }
  };
  

export const addFriend = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userId, friendsId } = req.params;

        const user = await User.findById(userId);

        if (!user)
            return res.status(404).json({ message: 'No user found by that ID'});
    
        const friendsObjectId = new mongoose.Types.ObjectId(friendsId);
    
        if (user.friends.includes(friendsObjectId)) {
            return res.status(400).json({ message: 'You are already friends!'})
        }

        user.friends.push(friendsObjectId);
        await user.save();

        return res.json({ message: 'Friend added successfully', user });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: 'Error, could not add friend', error: err });
    }
};

export const deleteFriend = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userId, friendsId } = req.params;

        const user = await User.findById(userId);

        if (!user)
            return res.status(404).json({ message: 'No user found by that ID'});
    
        const friendsObjectId = new mongoose.Types.ObjectId(friendsId);
    
        if (!user.friends.some((id) => id.equals(friendsObjectId))) {
            return res.status(404).json({ message: 'You are not friends'})
        }

        user.friends = user.friends.filter((id) => !id.equals(friendsObjectId));
        await user.save();

        return res.json({ message: 'Friend delted successfully', user });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: 'Error, failed to delete friend', error: err });
    }
};