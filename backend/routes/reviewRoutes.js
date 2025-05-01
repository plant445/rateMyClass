import express from "express"
import uploadReview, { getAllReviews } from "../controllers/reviewController.js"
import { getReviewCount, getMyReviews, deleteMyReview } from "../controllers/reviewController.js"
import { login, register, verifyToken, getMe, logout } from "../controllers/userController.js"

const router = express.Router()

router.post('/reviews', verifyToken, uploadReview)
router.get('/reviews/count', getReviewCount)
router.get('/reviews', getAllReviews)
router.delete('/reviews/:id', verifyToken, deleteMyReview)

//auth
router.post('/login', login)
router.post('/register', register)
router.get('/me', verifyToken, getMe);
router.post('/logout', logout);
router.get('/my-reviews', verifyToken, getMyReviews);

export default router