import { Review } from "../models/review.js";
import mongoose from "mongoose";

const uploadReview = async (req, res) => {
    try {
        const body = req.body
        const newReview = new Review({...body, userId:'67e4c6a6e646253ed51aef1e'})
        await newReview.save()
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
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (err) {
        console.error("Error fetching reviews:", err);
        res.status(500).json({ error: "Failed to get reviews" });
    }
}

export default uploadReview