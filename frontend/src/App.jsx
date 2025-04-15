import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreateReview from './pages/CreateReview.jsx'
import Reviews from './pages/Reviews.jsx'
import Header from './components/Header.jsx';
import LoginModal from './components/LoginModal.jsx';
import axios from 'axios'

function App() {
  const [username, setUsername] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
          try {
              const res = await axios.get('/api/me', { withCredentials: true })
              setUsername(res.data.username)
          } catch(err) {
              setUsername('')
          }
    }

    fetchUser()
  }, [])

  return (
    <>
      <Header username={username} setUsername={setUsername} onShowModal={() => setShowModal(true)}/>
      {showModal && (
        <LoginModal
          onClose={() => setShowModal(false)}
          onLoginSuccess={(username) => {
            console.log('[onLoginSuccess] got username:', username);
            setUsername(username);
            setShowModal(false);
          }}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateReview />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </>
  )
}

export default App


