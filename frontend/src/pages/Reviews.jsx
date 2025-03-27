import React, { useEffect, useState } from 'react'
import '../index.css';
import Header from '../components/Header.jsx'
import axios from 'axios'

const Reviews = () => {
    const [count, setCount] = useState(0);
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const fetchCount = async () =>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/count`);
                setCount(res.data.count);
            } catch {
                console.error("Error fetching review count:", err);
            }
        }

        const fetchReviews = async () => {
            try {
              const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/reviews`);
              setReviews(res.data);
            } catch (err) {
              console.error("Failed to fetch reviews:", err);
            }
        };

        fetchReviews()
        fetchCount()
    }, [])



    return (
        <div>
            <div class='mb-20'><Header /></div>
            <div class='flex flex-col text-center mb-15'>
                <h1 class="text-6xl font-bold mb-4 font-atma text-gray-200 tracking-wide text-outline">Course Reviews</h1>
                <p class="text-lg text-black font-atma ">Browse all {count} reviews</p>
            </div>

            <div className="mt-10 space-y-6 flex flex-col items-center">
                {reviews.map((review) => (
                    <div key={review._id} className="border border-gray-300 rounded-lg p-4 shadow w-200 ">
                        <h2 className="text-xl font-semibold">{review.course} - {review.professor}</h2>
                        <p className="text-gray-700 italic mb-2">{review.department}</p>
                        <p className="text-sm">{review.comment}</p>
                        <div className="mt-2 text-sm text-gray-500">
                            Overall: {review.ratings?.overall} | Difficulty: {review.ratings?.difficulty} | Engaging: {review.ratings?.engaging} | Take Again: {review.ratings?.takeAgain}
                        </div>
                    </div>
                ))}
            </div>


        </div>

        
    )
}

export default Reviews