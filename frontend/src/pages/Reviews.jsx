import React, { useEffect, useState } from 'react'
import '../index.css';
import Header from '../components/Header.jsx'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';

const Reviews = () => {
    const [count, setCount] = useState(0)
    const [reviews, setReviews] = useState([])


    const [searchParams] = useSearchParams()
    const initial = searchParams.get('search') || ''
    const [search, setSearch] = useState(initial)

    const filteredReviews = search ? reviews.filter((review) => 
        review.course.toLowerCase().includes(search.toLowerCase()) || 
        review.professor.toLowerCase().includes(search.toLowerCase())
    ) : reviews

    useEffect(() => {
        const fetchCount = async () =>{
            try {
                const res = await axios.get(`/api/reviews/count`)
                setCount(res.data.count)
            } catch (err) {
                console.error("Error fetching review count:", err)
            }
        }

        const fetchReviews = async () => {
            try {
              const res = await axios.get(`/api/reviews`)
              setReviews(res.data)
            } catch (err) {
              console.error("Failed to fetch reviews:", err)
            }
        };

        fetchReviews()
        fetchCount()
    }, [])



    return (
        <div>
            <div class='flex flex-col text-center mb-15'>
                <h1 class="text-6xl font-bold mb-4 font-atma text-gray-200 tracking-wide text-outline">Course Reviews</h1>
                <p class="text-lg text-black font-atma ">Browse all {count} reviews</p>
            </div>
            <div className='flex justify-center '>
                <input
                    type='text'
                    placeholder='Search by course or professor...'
                    value = {search}
                    onChange={(e)=> setSearch(e.target.value)}
                    className='border p-2 rounded-md mb-6 w-full max-w-md font-atma'
                />
            </div>

            <div className="mt-10 space-y-6 flex flex-col items-center">
                {filteredReviews.map((review) => (
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