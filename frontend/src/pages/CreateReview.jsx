import React, { useState } from 'react';
import '../index.css';
import Header from '../components/Header.jsx';
import { Rating } from 'react-simple-star-rating';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateReview = () => {
    const [formData, setFormData] = useState({
        course: '',
        department: '',
        professor: '',
        comment: '',
        ratings: {
          overall: 0,
          difficulty: 0,
          engaging: 0,
          takeAgain: 0,
        }
        
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
      e.preventDefault();
      const { course, department, professor, comment, ratings } = formData;
      const { overall, difficulty, engaging, takeAgain } = ratings;

      if (
        !course ||
        !department ||
        !professor ||
        !comment ||
        overall === 0 ||
        difficulty === 0 ||
        engaging === 0 ||
        takeAgain === 0
      ) {
        setError("Please fill in all fields!");
        return;
      }
      setError('');
      try {
          const response = await axios.post(`/api/create`, formData)
          if (response.status === 201) {
            navigate('/reviews')
          }
      } catch(err) {
          console.log(err);
          setError("Something went wrong submitting your review.");
      }
    }

    return (
      <div>
        <div class="mb-12">
            <Header />
        </div>

        <div>
          <h1 className='font-atma text-5xl flex justify-center mb-10'>Upload your Review!</h1>
        </div>
        {error && (
          <div className="text-red-500 text-center mb-4 font-atma">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* FILL IN PART */}
          <div className="flex flex-col text-center space-y-10 font-atma">
            <div>
              <label className="mr-2 text-lg">COURSE NAME</label>
              <input
                name="course"
                placeholder="ex: Calc 3"
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
                className="border border-black px-3 py-2 rounded font-atma w-100"
              />
            </div>

            <div>
              <label className="mr-4 text-lg">DEPARTMENT</label>
              <input
                name="department"
                placeholder="ex: Math"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="border border-black px-3 py-2 rounded font-atma w-100"
              />
            </div>

            <div>
              <label className="mr-7 text-lg">PROFESSOR</label>
              <input
                name="professor"
                placeholder="ex: Lebron James"
                value={formData.professor}
                onChange={(e) =>
                  setFormData({ ...formData, professor: e.target.value })
                }
                className="border border-black px-3 py-2 rounded font-atma w-100"
              />
            </div>
          </div>
          
          {/* RATING DATA */}
          <div className="flex flex-col text-center space-y-5 font-atma mt-10">
            <div >
              <label className='font-atma mr-2'>OVERALL</label>
              <Rating
                    onClick={(rate) =>
                      setFormData({
                        ...formData,
                        ratings: {
                          ...formData.ratings,
                          overall: rate,
                        },
                      }) // converts from 0-100 scale to 0–5
                    }
                    initialValue={formData.ratings.overall}
                    allowFraction
                    size={30}
                    fillColor="#facc15"
                    emptyColor="#e5e7eb"
              />
              <p className="ml-2 inline text-sm text-gray-500">{formData.ratings.overall} / 5</p>
            </div>

            <div >
              <label className='font-atma mr-2'>DIFFICULTY</label>
              <Rating
                    onClick={(rate) =>
                      setFormData({
                        ...formData,
                        ratings: {
                          ...formData.ratings,
                          difficulty: rate,
                        },
                      })
                    }
                    initialValue={formData.ratings.difficulty}
                    allowFraction
                    size={30}
                    fillColor="#facc15"
                    emptyColor="#e5e7eb"
              />
              <p className="ml-2 inline text-sm text-gray-500">{formData.ratings.difficulty} / 5</p>
            </div>

            <div >
              <label className='font-atma mr-2'>ENGAGING</label>
              <Rating
                    onClick={(rate) =>
                      setFormData({
                        ...formData,
                        ratings: {
                          ...formData.ratings,
                          engaging: rate,
                        },
                      }) // converts from 0-100 scale to 0–5
                    }
                    initialValue={formData.ratings.engaging}
                    allowFraction
                    size={30}
                    fillColor="#facc15"
                    emptyColor="#e5e7eb"
              />
              <p className="ml-2 inline text-sm text-gray-500">{formData.ratings.engaging} / 5</p>
            </div>

            <div >
              <label className='font-atma mr-2'>TAKE AGAIN?</label>
              <Rating
                    onClick={(rate) =>
                      setFormData({
                        ...formData,
                        ratings: {
                          ...formData.ratings,
                          takeAgain: rate,
                        },
                      }) // converts from 0-100 scale to 0–5
                    }
                    initialValue={formData.ratings.takeAgain}
                    allowFraction
                    size={30}
                    fillColor="#facc15"
                    emptyColor="#e5e7eb"
              />
              <p className="ml-2 inline text-sm text-gray-500">{formData.ratings.takeAgain} / 5</p>
            </div>
            <div className='mt-7 flex items-center gap-4 justify-center'>
              <label className="text-lg whitespace-nowrap">Comments</label>
              <textarea
                name="comment"
                placeholder="ex: Really engaging class!"
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                className="border border-black px-3 py-2 rounded font-atma w-[600px] h-[120px]"
              />
            </div>
          </div>

          <div className='flex justify-center mb-10'>
            <button
                type="submit"
                className="mt-6 px-6 py-2 rounded-lg bg-black text-white font-atma hover:bg-gray-800 transition duration-200"
              >
                Submit Review
            </button>
          </div>
            
        </form>
      </div>
    );
};

export default CreateReview;
