import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 20,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 100
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }] 
})

const User = mongoose.model("User", userSchema);


export {User}