import express from "express"
import uploadReview, { getAllReviews } from "../controllers/reviewController.js"
import { getReviewCount } from "../controllers/reviewController.js"
import { login, register, verifyToken, getMe, logout } from "../controllers/userController.js"

const router = express.Router()

router.post('/create', verifyToken, uploadReview)
router.get('/count', getReviewCount)
router.get('/reviews', getAllReviews)

//auth
router.post('/login', login)
router.post('/register', register)
router.get('/me', verifyToken, getMe);
router.post('/logout', logout);

export default router