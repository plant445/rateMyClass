import express from "express"
import uploadReview, { getAllReviews } from "../controllers/reviewController.js"
import { getReviewCount } from "../controllers/reviewController.js"


const router = express.Router()

router.post('/create', uploadReview)
router.get('/count', getReviewCount);
router.get('/reviews', getAllReviews)

export default router