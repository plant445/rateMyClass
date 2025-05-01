import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const { username } = useParams()
    const [reviews, setReviews] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [reviewId, setReviewId] = useState('')

    const handleClose = (reviewId) => {
        console.log('Selected for delete:', reviewId);
        setReviewId(reviewId)
        setShowModal(true)
    }

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`/api/reviews/${reviewId}`, { withCredentials: true})
            console.log('Before delete:', reviews);
            setReviews(prev => prev.filter(r => r._id.toString() !== reviewId))
            console.log('After delete:', reviews);
            setShowModal(false)
            setReviewId('')
        } catch (err) {
            console.error('Failed to delete Review', err)
        }
    }

    useEffect(() => {
        async function fetchReviews() {
            try {
                const res = await axios.get('/api/my-reviews', {withCredentials: true})
                setReviews(res.data)

            } catch(err) {
                console.error('Error fetching user reviews:', err)
            }
        }

        fetchReviews()

    }, [])

    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-4 font-atma flex justify-center mt-15">My Reviews</h1>

            {showModal && (
                <div className="fixed flex justify-center items-center z-50 inset-0 bg-black/30 transition-opacity">
                    <div className="border bg-white p-6 rounded shadow-md max-w-sm w-full text-center">
                            <h1 className="font-atma mb-5 text-2xl">Are you sure you want to delete this review?</h1>

                        <button className="mr-5 border-black border-1 p-1.5 text-sm rounded-sm bg-red-600 text-white hover:bg-red-400" onClick={handleConfirmDelete}>Delete</button>
                        <button className="border p-1.5 text-sm rounded-sm hover:bg-gray-300" onClick={() => {setShowModal(false)
                        setReviewId('')
                        }}>Cancel</button>
                    </div>
                </div>
            )}

            {reviews.length === 0 && (
                <div className="flex justify-center">
                     <h1 className="text-gray-500 font-atma text-lg mt-10">
                        You have not uploaded any reviews.
                    </h1>
                </div>
           
            )}
            <div className="mt-10 space-y-6 flex flex-col items-center">
                {reviews.map((review) => (
                    <div key={review._id} className="border border-gray-300 rounded-lg p-4 shadow w-200 relative">
                        <h2 className="text-xl font-semibold">{review.course} - {review.professor}</h2>
                        <button onClick={() => handleClose(review._id)} className="absolute top-2 right-3 hover:opacity-40"><img src="../../images/bin.png" className="mt-1 w-5 h-5"/></button>
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

export default Profile