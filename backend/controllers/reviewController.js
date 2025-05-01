import { Review } from "../models/review.js";
import mongoose from "mongoose";
import { User } from "../models/user.js";

const uploadReview = async (req, res) => {
    try {
        const { id: userId} = req.user
        const body = req.body
        const newReview = new Review({...body, userId})
        await newReview.save()

        await User.findByIdAndUpdate(
            userId,
            { $push: {reviews: newReview._id}}
        )
        res.status(201).json({ message: "Review created" });
        
    } catch (error) {
        console.error('Error uploading review:', error);
        res.status(500).json({ error: 'Failed to upload review' });
    }
}

export const getReviewCount = async (req, res) => {
    try {
      const count = await Review.countDocuments();
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ message: "Failed to get count", error });
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 }).select('course department professor comment ratings created_at');
        res.status(200).json(reviews);
    } catch (err) {
        console.error("Error fetching reviews:", err);
        res.status(500).json({ error: "Failed to get reviews" });
    }
}

export const getMyReviews = async (req, res) => {
    try {
        const { id:userId } = req.user
        const reviews = await Review.find({userId}).sort({ created_at: -1 })
        .select('course department professor comment ratings created_at');
        res.status(200).json(reviews)
    } catch (err) {
        console.error('Error fetching user reviews', err)
        res.status(500).json({error: 'Fetched user review failed'})
    }
}

export const deleteMyReview = async (req, res) => {
    try {
        const { id:uid } = req.user
        const { id:reviewId } = req.params

        const review = await Review.findById(reviewId)
        if(!review){
            return res.status(404).json({error: 'Could not find review'})
        }
        if(review.userId != uid){
            return res.status(403).json({error: 'Not authorized to delete this review'})
        }

        await review.deleteOne();
        await User.findByIdAndUpdate(
            uid,
            { $pull: {reviews: review._id}}
        )
        res.sendStatus(200)
    } catch (err) {
        console.error('Error Deleting review', err)
        res.status(500).json({error: 'Delete user review failed'})
    }
}

export default uploadReview