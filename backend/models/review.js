import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    professor: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    ratings: {
        overall: { type: Number, required: true, min: 1, max: 5 },
        difficulty: { type: Number, required: true, min: 1, max: 5 },
        engaging: { type: Number, required: true, min: 1, max: 5 },
        takeAgain: { type: Number, required: true, min: 1, max: 5 }
    },
    created_at: { type: Date, default: Date.now }
})

const Review = mongoose.model("Review", reviewSchema);

export {Review}