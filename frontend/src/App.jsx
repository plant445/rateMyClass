import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreateReview from './pages/CreateReview.jsx'
import RegisterUser from './pages/RegisterUser.jsx'
import Reviews from './pages/Reviews.jsx'

function App() {

  return (
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path='/create' element = {<CreateReview/>}/>
      <Route path='/register' element = {<RegisterUser/>}/>
      <Route path='/reviews' element = {<Reviews/>}/>
    </Routes>
  )
}

export default App
