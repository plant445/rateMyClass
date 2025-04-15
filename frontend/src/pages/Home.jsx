import React from 'react'
import '../index.css';
import Header from '../components/Header.jsx'

const Home = () => {
    return (
        <div>
            <div class='bg-[url(images/coursestock.jpg)] bg-cover bg-center pt-20 pb-1 mb-15'>
                <div class="flex flex-col text-center mb-8 ">
                    <h1 class="text-6xl font-bold mb-4 font-atma text-gray-200 tracking-wide text-outline">RATE MY CLASS</h1>
                    <p class="text-lg text-white font-atma ">Enter a class to get started</p>
                </div>


                <div class='flex justify-center mb-25'>
                    <form>
                        {/* onSubmit={handleSubmit} */}    
                        <input
                            type="text"
                            // value = {name}
                            placeholder='Your class...'
                            // onChange={(e) => setName(e.target.value)}
                            className='border-2 border-white w-60 h-10 pl-3 font-atma rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-300'
                        />
                        <button
                        type="submit" class='font-atma border-2 bg-gray-200 border-black ml-2 p-1 hover:bg-gray-400 rounded-sm'>
                            Enter
                        </button>
                    </form>
                </div>

            </div>

            <div class='flex flex-col justify-center text-center'>
                <h1 class='font-atma text-5xl mb-7'>Why use RateMyClass?</h1>

                <p className="font-atma max-w-3xl text-center text-xl text-gray-700 mx-auto mb-15">
                    Finding the right class can be stressful — especially when you're not sure what to expect. Rate My Class helps students share honest feedback about their experiences, so others can make smarter decisions when building their schedules. Whether you're looking for a chill elective or want to avoid 3 a.m. study grinds, this site helps you get the inside scoop 
                    before you enroll.
                </p>
            </div>
        </div>
        
        
    )
}

export default Home;